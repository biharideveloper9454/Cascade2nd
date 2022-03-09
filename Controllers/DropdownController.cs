using CascadingDropdown.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CascadingDropdown.Controllers
{
    public class DropdownController : Controller
    {
        private readonly ApplicationContext context;

        public DropdownController(ApplicationContext context)
        {
            this.context = context;
        }

        public IActionResult Index()
        {
           
            return View();
        }


        public IActionResult GetCountries()
        {
            var countries = this.context.Countries.ToList();
            return Json(countries);
        }


        public IActionResult GetStates(int id)
        {
            var states = this.context.States.Where(e => e.Country.Id == id).ToList();
            return Json(states);
        }

        public IActionResult GetCities(int id)
        {
            var cities = this.context.Cities.Where(e => e.State.Id == id).ToList();
            return Json(cities);
        }
        public IActionResult Validation()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Validation(Employee employee)
        {
            return View();
        }

    }
}
