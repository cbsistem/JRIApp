﻿using System;
using System.Net.Mime;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Web.SessionState;
using RIAPP.DataService.DomainService;
using RIAPP.DataService.DomainService.Interfaces;
using RIAPP.DataService.DomainService.Types;
using RIAPP.DataService.Mvc.Utils;
using RIAPP.DataService.Utils.Interfaces;

namespace RIAPP.DataService.Mvc
{
    [NoCache]
    [SessionState(SessionStateBehavior.Disabled)]
    public abstract class DataServiceController<T> : Controller
        where T : BaseDomainService
    {
        /// <summary>
        ///     I use plain text here so that it was easier to configure compression in IIS
        ///     if i used 'application/json' here i would  need to make changes in IIS application.config
        ///     to  allow compression, but plain text result only needs to enable Dynamic content compression in IIS
        /// </summary>
        private static string ResultContentType = MediaTypeNames.Text.Plain;

        private Lazy<IDomainService> _DomainService;

        public DataServiceController()
        {
            Serializer = new Serializer();
            _DomainService = new Lazy<IDomainService>(() => CreateDomainService(), true);
        }

        protected IDomainService DomainService
        {
            get { return _DomainService.Value; }
        }

        public ISerializer Serializer { get; private set; }

        [ActionName("typescript")]
        [HttpGet]
        public ActionResult GetTypeScript()
        {
            var comment =
                string.Format(
                    "\tGenerated from: {0} on {1:yyyy-MM-dd} at {1:HH:mm}\r\n\tDon't make manual changes here, because they will be lost when this db interface will be regenerated!",
                    ControllerContext.HttpContext.Request.RawUrl, DateTime.Now);
            var info = DomainService.ServiceCodeGen(new CodeGenArgs("ts") { comment = comment });
            var res = new ContentResult();
            res.ContentEncoding = Encoding.UTF8;
            res.ContentType = MediaTypeNames.Text.Plain;
            res.Content = info;
            return res;
        }

        [ActionName("xaml")]
        [HttpGet]
        public ActionResult GetXAML(bool isDraft = true)
        {
            var info = DomainService.ServiceCodeGen(new CodeGenArgs("xaml") { isDraft = isDraft });
            var res = new ContentResult();
            res.ContentEncoding = Encoding.UTF8;
            res.ContentType = MediaTypeNames.Text.Plain;
            res.Content = info;
            return res;
        }

        [ActionName("csharp")]
        [HttpGet]
        public ActionResult GetCSharp()
        {
            var info = DomainService.ServiceCodeGen(new CodeGenArgs("csharp"));
            var res = new ContentResult();
            res.ContentEncoding = Encoding.UTF8;
            res.ContentType = MediaTypeNames.Text.Plain;
            res.Content = info;
            return res;
        }

        protected virtual IDomainService CreateDomainService()
        {
            var args = new ServiceArgs(Serializer, User);
            var service = (IDomainService) Activator.CreateInstance(typeof(T), args);
            return service;
        }

        [ChildActionOnly]
        public string PermissionsInfo()
        {
            var info = DomainService.ServiceGetPermissions();
            return Serializer.Serialize(info);
        }

        [ActionName("code")]
        [HttpGet]
        public ActionResult GetCode(string lang)
        {
            if (lang != null)
            {
                switch (lang.ToLowerInvariant())
                {
                    case "ts":
                    case "typescript":
                        return GetTypeScript();
                    case "xaml":
                        return GetXAML();
                    case "csharp":
                        return GetCSharp();
                    default:
                        throw new Exception(string.Format("Unknown lang argument: {0}", lang));
                }
            }
            return GetTypeScript();
        }

        [ActionName("permissions")]
        [HttpGet]
        public ActionResult GetPermissions()
        {
            var res = DomainService.ServiceGetPermissions();
            return new ChunkedResult<Permissions>(res, Serializer);
        }

        [ActionName("query")]
        [HttpPost]
        public async Task<ActionResult> PerformQuery([SericeParamsBinder] QueryRequest request)
        {
            var res = await DomainService.ServiceGetData(request).ConfigureAwait(false);
            return new ChunkedResult<QueryResponse>(res, Serializer);
        }

        [ActionName("save")]
        [HttpPost]
        public async Task<ActionResult> Save([SericeParamsBinder] ChangeSet changeSet)
        {
            var res = await DomainService.ServiceApplyChangeSet(changeSet).ConfigureAwait(false);
            return new ChunkedResult<ChangeSet>(res, Serializer);
        }

        [ActionName("refresh")]
        [HttpPost]
        public async Task<ActionResult> Refresh([SericeParamsBinder] RefreshInfo refreshInfo)
        {
            var res = await DomainService.ServiceRefreshRow(refreshInfo).ConfigureAwait(false);
            return new ChunkedResult<RefreshInfo>(res, Serializer);
        }

        [ActionName("invoke")]
        [HttpPost]
        public async Task<ActionResult> Invoke([SericeParamsBinder] InvokeRequest invokeInfo)
        {
            var res = await DomainService.ServiceInvokeMethod(invokeInfo).ConfigureAwait(false);
            return new ChunkedResult<InvokeResponse>(res, Serializer);
        }

        protected T GetDomainService()
        {
            return (T) DomainService;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing && _DomainService.IsValueCreated)
            {
                _DomainService.Value.Dispose();
            }
            _DomainService = null;
            Serializer = null;
            base.Dispose(disposing);
        }
    }
}