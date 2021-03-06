﻿using System;
using System.IO;
using System.Net.Mime;
using System.Web.Mvc;
using System.Web.SessionState;
using RIAppDemo.BLL.DataServices;

namespace RIAppDemo.Controllers
{
    [SessionState(SessionStateBehavior.Disabled)]
    public class DownloadController : Controller
    {
        public ActionResult Index()
        {
            return new EmptyResult();
        }

        public ActionResult ThumbnailDownload(int id)
        {
            try
            {
                var svc = ThumbnailServiceFactory.Create(User);
                using (svc)
                {
                    var stream = new MemoryStream();
                    var fileName = svc.GetThumbnail(id, stream);
                    if (string.IsNullOrEmpty(fileName))
                        return new HttpStatusCodeResult(400);
                    stream.Position = 0;
                    var res = new FileStreamResult(stream, MediaTypeNames.Image.Jpeg);
                    res.FileDownloadName = fileName;
                    return res;
                }
            }
            catch (Exception)
            {
                return new HttpStatusCodeResult(404);
            }
        }

        public ActionResult DownloadTemplate(string name)
        {
            var baseDir = AppDomain.CurrentDomain.BaseDirectory;
            var path1 = Path.Combine(baseDir, "Templates");
            var path2 = Path.GetFullPath(Path.Combine(path1, string.Format("{0}.html", name)));
            if (!path2.StartsWith(path1))
                throw new Exception("template name is invalid");
            return new FilePathResult(path2, MediaTypeNames.Text.Plain);
        }
    }
}