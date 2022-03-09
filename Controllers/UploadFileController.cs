using CascadingDropdown.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CascadingDropdown.Controllers
{
    public class UploadFileController : Controller
    {
        private readonly ApplicationContext context;

        public UploadFileController(ApplicationContext context,IWebHostEnvironment webHostEnvironment)
        {
            this.context = context;
        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult ShowData()
        {
            var data = context.UploadFiles.ToList();
            return new JsonResult(data);
        }

        public JsonResult Delete(int id)
        {
            var emp = context.UploadFiles.SingleOrDefault(e => e.Id == id);
            context.UploadFiles.Remove(emp);
            context.SaveChanges();
            return new JsonResult(emp);
        }

        [HttpPost]
        public IActionResult Create([FromBody] UploadFile file)
        {
            var data = new UploadFile()
            {
                Name=file.Name,
                Gender=file.Gender,
                Country=file.Country,
                State=file.State,
                City=file.City,
                Image=file.Image
            };
            context.UploadFiles.Add(data);
            context.SaveChanges();
            return new JsonResult(data);
        }


    }
}
