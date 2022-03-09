using CascadingDropdown.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CascadingDropdown.Controllers
{
    public class CascadeController : Controller
    {
        private readonly ApplicationContext context;

        public CascadeController(ApplicationContext context)
        {
            this.context = context;
        }   

        public IActionResult Index()
        {
            ViewBag.countries = context.Countries.ToList();
            return View();
        }
        public JsonResult getStateById(int id)
        {
            List<State> list =new List<State>();
            list = context.States.Where(e => e.Country.Id == id).ToList();
            list.Insert(0, new State { Id = 0, Name = "Please Select State" });
            return Json(new SelectList(list,"Id","Name"));
        }
    }
}
