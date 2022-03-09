using CascadingDropdown.Models;
using CascadingDropdown.Models.ViewModel;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace CascadingDropdown.Controllers
{
    public class ImageNameController : Controller
    {
        private readonly ApplicationContext context;
        private readonly IWebHostEnvironment hostEnvironment;

        public ImageNameController(ApplicationContext context, IWebHostEnvironment hostEnvironment)
        {
            this.context = context;
            this.hostEnvironment = hostEnvironment;
        }
        public IActionResult Index()
        {
            return View();
        }
        public JsonResult ShowAllData()
        {
            var data = (from e in context.UploadFiles
                        join c in context.Countries
                        on e.Country equals c.Id
                        join s in context.States
                        on e.State equals s.Id
                        join t in context.Cities
                        on e.City equals t.Id
                        select new AllDataViewModel()
                        {
                            Id=e.Id,
                            Name=e.Name,
                            Gender=e.Gender,
                            Country=c.Name,
                            State=s.Name,
                            City=t.Name,
                            Image=e.Image
                        }).ToList();
            return new JsonResult(data);
        }
        public void UploadImage(IFormFile file, string path)
        {
            FileStream stream = new FileStream(path, FileMode.Create);
            file.CopyTo(stream);
        }
        [HttpPost]
        public JsonResult UploadFile([FromForm] UploadFileCreateViewModel model)
        {
            var path = hostEnvironment.WebRootPath;
            var filePath = "Content/Images/" + model.Image.FileName;
            var fullPath = Path.Combine(path, filePath);
            UploadImage(model.Image, fullPath);
            var data = new UploadFile()
            {
                Name = model.Name,
                Gender = model.Gender,
                Country = model.Country,
                State = model.State,
                City = model.City,
                Image = filePath
            };
            context.UploadFiles.Add(data);
            context.SaveChanges();
            return new JsonResult(data);

        }
        public JsonResult Delete(int id)
        {
            var emp = context.UploadFiles.SingleOrDefault(e => e.Id == id);
            context.UploadFiles.Remove(emp);
            context.SaveChanges();
            return new JsonResult(emp);
        }
        [HttpGet]
        public JsonResult Edit(int id)
        {
            var emp = context.UploadFiles.SingleOrDefault(e => e.Id == id);
            return new JsonResult(emp);
        }
        [HttpPost]
        public JsonResult Update([FromForm] UploadFileCreateViewModel model)
        {
            var path = hostEnvironment.WebRootPath;
            var filePath = "Content/Images/" + model.Image.FileName;
            var fullPath = Path.Combine(path, filePath);
            UploadImage(model.Image, fullPath);
            var data = new UploadFile()
            {
                Id = model.Id,
                Name = model.Name,
                Gender = model.Gender,
                Country = model.Country,
                State = model.State,
                City = model.City,
                Image = filePath
            };
            context.UploadFiles.Update(data);
            context.SaveChanges();
            return new JsonResult(model);
        }

        public JsonResult Countries()
        {
            var country = context.Countries.ToList();
            return new JsonResult(country);
        }

        public JsonResult States(int id)
        {
            var st = context.States.Where(e => e.Country.Id == id).ToList();
            return new JsonResult(st);
        }
        public JsonResult Cities(int id)
        {
            var ct = context.Cities.Where(e => e.State.Id == id).ToList();
            return new JsonResult(ct);
        }

    }
}
