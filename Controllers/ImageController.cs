using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace CascadingDropdown.Controllers
{
    public class ImageController : Controller
    {
        private readonly IWebHostEnvironment webHostEnvironment;

        public ImageController(IWebHostEnvironment webHostEnvironment)
        {
            this.webHostEnvironment = webHostEnvironment;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]

        public JsonResult Upload_File()
        {
            string result = string.Empty;
            try
            {
                //long size = 0;
                var file = Request.Form.Files;
                var filename = ContentDispositionHeaderValue
                                .Parse(file[0].ContentDisposition)
                                .FileName
                                .Trim('"');

                string FilePath = webHostEnvironment.WebRootPath + "/Content"+ $@"\{ filename}";
                //size += file[0].Length;
                using (FileStream fs = System.IO.File.Create(FilePath))
                {
                    file[0].CopyTo(fs);
                    fs.Flush();
                }
                result = FilePath;
            }
            catch (Exception ex)
            {
                result = ex.Message;
            }
            return new JsonResult(result);
        }







    }
}
