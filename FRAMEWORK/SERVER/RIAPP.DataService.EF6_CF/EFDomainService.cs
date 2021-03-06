﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using RIAPP.DataService.DomainService;
using RIAPP.DataService.DomainService.Exceptions;
using RIAPP.DataService.DomainService.Interfaces;
using RIAPP.DataService.DomainService.Types;
using RIAPP.DataService.EF6_CF.Utils;
using RIAPP.DataService.Utils;
using DataType = RIAPP.DataService.DomainService.Types.DataType;

namespace RIAPP.DataService.EF6_CF
{
    public abstract class EFDomainService<TDB> : BaseDomainService
        where TDB : DbContext
    {
        private TDB _db;
        private bool _ownsDb;
        
        public EFDomainService(TDB db, IServiceArgs args)
            : base(args)
        {
            _db = db;
        }

        public EFDomainService(IServiceArgs args)
            : this(null, args)
        {
        }

        public TDB DB
        {
            get
            {
                if (_db == null)
                {
                    _db = CreateDataContext();
                    if (_db != null)
                    {
                        _ownsDb = true;
                    }
                }
                return _db;
            }
        }

        protected override void Dispose(bool isDisposing)
        {
            if (_db != null && _ownsDb)
            {
                _db.Dispose();
                _db = null;
                _ownsDb = false;
            }
        }

        #region Overridable Methods
        protected override void ConfigureCodeGen()
        {
            base.ConfigureCodeGen();
            this.AddOrReplaceCodeGen("csharp", () => new CsharpProvider<TDB>(this));
        }

        protected virtual TDB CreateDataContext()
        {
            return Activator.CreateInstance<TDB>();
        }

        protected override async Task ExecuteChangeSet()
        {
            try
            {
                using (var transScope = new TransactionScope(TransactionScopeOption.RequiresNew,
                    new TransactionOptions
                    {
                        IsolationLevel = IsolationLevel.ReadCommitted,
                        Timeout = TimeSpan.FromMinutes(1.0)
                    }, TransactionScopeAsyncFlowOption.Enabled))
                {
                    await DB.SaveChangesAsync().ConfigureAwait(false);

                    transScope.Complete();
                }
            }
            catch (DbEntityValidationException e)
            {
                var sb = new StringBuilder();
                foreach (var eve in e.EntityValidationErrors)
                {
                    sb.AppendFormat("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                        eve.Entry.Entity.GetType().Name, eve.Entry.State);
                    sb.AppendLine();
                    foreach (var ve in eve.ValidationErrors)
                    {
                        sb.AppendFormat("- Property: \"{0}\", Error: \"{1}\"",
                            ve.PropertyName, ve.ErrorMessage);
                    }
                }
                throw new Exception(sb.ToString());
            }
            await AfterExecuteChangeSet();
        }

        private void GenerateAssociation(Metadata metadata, DbSetInfo dbSetInfo, PropertyInfo edmProp)
        {
            var assoc_name = string.Format("{0}_{1}", dbSetInfo.dbSetName, edmProp.PropertyType.Name);
            var ass = metadata.Associations.Where(a => a.name == assoc_name).FirstOrDefault();
            if (ass == null)
            {
                ass = new Association();
                ass.name = assoc_name;
                ass.parentDbSetName = edmProp.PropertyType.Name;
                ass.childDbSetName = dbSetInfo.dbSetName;
                ass.childToParentName = edmProp.Name;
                metadata.Associations.Add(ass);
            }
        }

        private void UpdateFieldInfo(Field fieldInfo, PropertyInfo edmProp)
        {
            var colAttr = edmProp.GetCustomAttributes<ColumnAttribute>().FirstOrDefault();
            if (colAttr != null && !string.IsNullOrEmpty(colAttr.TypeName))
            {
                if (colAttr.TypeName.ToLower() == "date")
                {
                    fieldInfo.dataType = DataType.Date;
                }
                else if (colAttr.TypeName.ToLower() == "timestamp")
                {
                    fieldInfo.fieldType = FieldType.RowTimeStamp;
                }
            }

            var isComputed = this.isComputed(edmProp);
            fieldInfo.isAutoGenerated = isAutoGenerated(edmProp);
            fieldInfo.isNullable = ServiceContainer.ValueConverter.IsNullableType(edmProp.PropertyType) ||
                                   (edmProp.PropertyType == typeof(string) &&
                                    !edmProp.GetCustomAttributes<RequiredAttribute>().Any());
            fieldInfo.isReadOnly = fieldInfo.isAutoGenerated || edmProp.GetSetMethod() == null;


            var strLenAttr = edmProp.GetCustomAttributes<StringLengthAttribute>().FirstOrDefault();
            if (strLenAttr != null && strLenAttr.MaximumLength > 0)
            {
                fieldInfo.maxLength = strLenAttr.MaximumLength;
            }
            else
            {
                var maxLenAttr = edmProp.GetCustomAttributes<MaxLengthAttribute>().FirstOrDefault();
                if (maxLenAttr != null && maxLenAttr.Length > 0)
                {
                    fieldInfo.maxLength = maxLenAttr.Length;
                }
            }

            var timeStampAttr = edmProp.GetCustomAttributes<TimestampAttribute>().FirstOrDefault();
            if (timeStampAttr != null)
            {
                fieldInfo.fieldType = FieldType.RowTimeStamp;
            }
            else
                fieldInfo.fieldType = FieldType.None;

            var notmappedAttr = edmProp.GetCustomAttributes<NotMappedAttribute>().FirstOrDefault();
            if (notmappedAttr != null)
            {
                fieldInfo.fieldType = FieldType.ServerCalculated;
            }
        }

        private void GenerateNestedFieldInfos(Field parentField, Type nestedType)
        {
            var fieldsProps =
                nestedType.GetProperties(BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly)
                    .Where(
                        p =>
                            !(p.PropertyType.IsGenericType &&
                              p.PropertyType.GetGenericTypeDefinition() == typeof(ICollection<>)))
                    .ToArray();
            Array.ForEach(fieldsProps, edmProp =>
            {
                var fieldInfo = new Field {fieldName = edmProp.Name};
                var isArray = false;
                try
                {
                    fieldInfo.dataType = ValueConverter.DataTypeFromTypeCore(edmProp.PropertyType, out isArray);
                }
                catch (UnsupportedTypeException)
                {
                    //Complex Type field
                    GenerateNestedFieldInfos(fieldInfo, edmProp.PropertyType);
                }
                if (fieldInfo.fieldType != FieldType.Object)
                {
                    UpdateFieldInfo(fieldInfo, edmProp);
                }
                parentField.fieldType = FieldType.Object;
                parentField.nested.Add(fieldInfo);
            });
        }

        private void GenerateFieldInfos(Metadata metadata, Type[] dbSetTypes, DbSetInfo dbSetInfo, string[] keys,
            PropertyInfo[] edmProps)
        {
            short pkNum = 0;
            Array.ForEach(edmProps, edmProp =>
            {
                var fieldInfo = new Field {fieldName = edmProp.Name};
                var isArray = false;
                try
                {
                    fieldInfo.dataType = ValueConverter.DataTypeFromTypeCore(edmProp.PropertyType, out isArray);
                }
                catch (UnsupportedTypeException)
                {
                    //if it is a relational property - child entity references parent entity
                    if (dbSetTypes.Contains(edmProp.PropertyType))
                    {
                        GenerateAssociation(metadata, dbSetInfo, edmProp);
                        return;
                    }

                    //if it is a relational property - parent entity references child entities (most  often a collection)
                    if (edmProp.PropertyType.IsGenericType &&
                        dbSetTypes.Contains(edmProp.PropertyType.GetGenericArguments().First()))
                        return;

                    //Complex Type field
                    GenerateNestedFieldInfos(fieldInfo, edmProp.PropertyType);
                }

                if (fieldInfo.fieldType != FieldType.Object)
                {
                    if (keys.Contains(fieldInfo.fieldName))
                    {
                        ++pkNum;
                        fieldInfo.isPrimaryKey = pkNum;
                        fieldInfo.isReadOnly = true;
                    }

                    UpdateFieldInfo(fieldInfo, edmProp);
                }
                dbSetInfo.fieldInfos.Add(fieldInfo);
            });
        }

        protected override Metadata GetMetadata(bool isDraft)
        {
            var metadata = new Metadata();
            var dbSetProps =
                typeof(TDB).GetProperties(BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly)
                    .Where(
                        p =>
                            p.PropertyType.IsGenericType && p.PropertyType.GetGenericTypeDefinition() == typeof(DbSet<>));
            var dbSetTypes = dbSetProps.Select(p => p.PropertyType.GetGenericArguments().First()).ToArray();


            Array.ForEach(dbSetTypes, dbSetType =>
            {
                var entityTypeName = dbSetType.Name;
                var name = entityTypeName;
                var fieldsProps =
                    dbSetType.GetProperties(BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly)
                        .Where(
                            p =>
                                !(p.PropertyType.IsGenericType &&
                                  p.PropertyType.GetGenericTypeDefinition() == typeof(ICollection<>)))
                        .ToArray();
                var keys = new string[0];
                var keyProps = fieldsProps.Where(p => p.GetCustomAttributes<KeyAttribute>().Any()).ToArray();
                if (keyProps.Length > 0)
                {
                    var keyProps2 =
                        fieldsProps.Where(p => p.GetCustomAttributes<KeyAttribute>().Any())
                            .Select(
                                p => new {p.Name, corder = p.GetCustomAttributes<ColumnAttribute>().FirstOrDefault()})
                            .OrderBy(p => p.corder == null ? p.Name : p.corder.Order.ToString().PadLeft(4, '0'))
                            .ToArray();
                    keys = keyProps2.Select(p => p.Name).ToArray();
                }
                else
                {
                    keyProps =
                        fieldsProps.Where(
                            p =>
                                p.Name.EndsWith("ID", StringComparison.OrdinalIgnoreCase) &&
                                !p.Name.EndsWith("guid", StringComparison.OrdinalIgnoreCase)).ToArray();
                    keys = keyProps.Select(p => p.Name).ToArray();
                }
                var entityType = dbSetType;
                var dbSetInfo = new DbSetInfo
                {
                    dbSetName = entityTypeName,
                    EntityType = entityType
                };
                metadata.DbSets.Add(dbSetInfo);
                GenerateFieldInfos(metadata, dbSetTypes, dbSetInfo, keys, fieldsProps);
            });

            metadata.Associations.ForEach(assoc =>
            {
                var parentDB = metadata.DbSets.Where(d => d.dbSetName == assoc.parentDbSetName).FirstOrDefault();
                var childDB = metadata.DbSets.Where(d => d.dbSetName == assoc.childDbSetName).FirstOrDefault();
                var pkFields = parentDB.GetPKFields();
                foreach (var pkfield in pkFields)
                {
                    var fld =
                        childDB.fieldInfos.Where(f => f.fieldName == pkfield.fieldName && f.dataType == pkfield.dataType)
                            .FirstOrDefault();
                    if (fld != null)
                    {
                        var frel = new FieldRel();
                        frel.childField = fld.fieldName;
                        frel.parentField = pkfield.fieldName;
                        assoc.fieldRels.Add(frel);
                    }
                }
            });

            return metadata;
        }
        #endregion

        #region helper methods

        private Type GetEntityType(string entitySetName)
        {
            var entityType = DB.GetType().GetProperty(entitySetName).PropertyType.GetGenericArguments().First();
            return entityType;
        }

        private Type GetEntityType2(string entityTypeName)
        {
            var assembly = DB.GetType().Assembly;
            var entityType = assembly.GetTypes().Where(t => t.Name == entityTypeName).First();
            return entityType;
        }

        private bool isAutoGenerated(PropertyInfo prop)
        {
            var attr = prop.GetCustomAttributes<DatabaseGeneratedAttribute>().FirstOrDefault();
            if (attr == null)
                return false;
            if (attr.DatabaseGeneratedOption == DatabaseGeneratedOption.None)
                return false;
            if (attr.DatabaseGeneratedOption == DatabaseGeneratedOption.Identity ||
                attr.DatabaseGeneratedOption == DatabaseGeneratedOption.Computed)
                return true;
            return false;
        }

        private bool isComputed(PropertyInfo prop)
        {
            var attr = prop.GetCustomAttributes<DatabaseGeneratedAttribute>().FirstOrDefault();
            if (attr == null)
                return false;
            if (attr.DatabaseGeneratedOption == DatabaseGeneratedOption.None)
                return false;
            if (attr.DatabaseGeneratedOption == DatabaseGeneratedOption.Computed)
                return true;
            return false;
        }

        #endregion
    }
}