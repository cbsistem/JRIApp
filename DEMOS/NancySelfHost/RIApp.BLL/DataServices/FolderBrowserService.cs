﻿using System;
using System.Linq;
using RIAppDemo.BLL.Models;
using System.IO;
using System.Threading.Tasks;
using RIAPP.DataService.DomainService;
using RIAPP.DataService.DomainService.Attributes;
using RIAPP.DataService.DomainService.Interfaces;
using RIAPP.DataService.DomainService.Security;
using RIAPP.DataService.DomainService.Types;

namespace RIAppDemo.BLL.DataServices
{
    public class FolderBrowserService : BaseDomainService
    {
        private readonly string BASE_ROOT = AppDomain.CurrentDomain.BaseDirectory;
        private readonly string CONFIG_ROOT =  System.Configuration.ConfigurationManager.AppSettings["FOLDER_BROWSER_PATH"];

        public FolderBrowserService(IServiceArgs args)
            : base(args)
        {
            this.IsCodeGenEnabled = true;
        }

        protected override Metadata GetMetadata(bool isDraft)
        {
            return Metadata.FromXML(RIAppDemo.BLL.Utils.ResourceHelper.GetResourceString("RIAppDemo.BLL.Metadata.FolderBrowser.xml"));
        }

        private string GetRootPath(string infoType)
        {
            switch (infoType)
            {
                case "BASE_ROOT":
                    return BASE_ROOT;
                case "CONFIG_ROOT":
                    return CONFIG_ROOT;
                default:
                    throw new InvalidOperationException();
            }
        }

        [Authorize()]
        [Query]
        public QueryResult<FolderItem> ReadRoot(bool includeFiles, string infoType)
        {
            return ReadChildren(null, 0, "", includeFiles, infoType);
        }

        [Authorize()]
        [Query]
        public QueryResult<FolderItem> ReadChildren(string parentKey, int level, string path, bool includeFiles, string infoType)
        {
            string fullpath = Path.GetFullPath(Path.Combine(this.GetRootPath(infoType), path));
            DirectoryInfo dinfo = new DirectoryInfo(fullpath);
            if (!includeFiles)
            {
                var dirs = dinfo.EnumerateDirectories();
                var res = dirs.Select(d => new FolderItem { Key = Guid.NewGuid().ToString(), ParentKey = parentKey, HasSubDirs = d.EnumerateDirectories().Any(), Level = level, Name = d.Name, IsFolder = true }).OrderBy(d => d.Name);
                return new QueryResult<FolderItem>(res);
            }
            else
            {
                var fileSyst = dinfo.EnumerateFileSystemInfos();
                var res2 = fileSyst.Select(d => new FolderItem { Key = Guid.NewGuid().ToString(), ParentKey = parentKey, HasSubDirs = (d is DirectoryInfo) ? ((DirectoryInfo)d).EnumerateFileSystemInfos().Any() : false, Level = level, Name = d.Name, IsFolder = (d is DirectoryInfo) }).OrderByDescending(d => d.IsFolder).ThenBy(d => d.Name);
                return new QueryResult<FolderItem>(res2);
            }
        }

        public void DeleteFileSystemObject(FolderItem dummy)
        {
            throw new NotImplementedException();
        }

        protected override Task ExecuteChangeSet()
        {
            throw new NotImplementedException();
        }
    }
}
