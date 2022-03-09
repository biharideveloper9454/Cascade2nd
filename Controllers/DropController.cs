using CascadingDropdown.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CascadingDropdown.Controllers
{
    public class DropController : Controller
    {
        private readonly ApplicationContext context;

        public DropController(ApplicationContext context)
        {
            this.context = context;
        }

        public IActionResult Index()
        {
            var emp = context.Employees.ToList();
            return View(emp);
        }
        public IActionResult Create()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Create(Employee employee)
        {
            context.Employees.Add(employee);
            context.SaveChanges();
            return View("Index");
        }
        public IActionResult GetState()
        {
            var State = context.DropStates.ToList();
            return Json(State);
        }
        public IActionResult GetCity(int id)
        {
            var City = context.DropCities.Where(e => e.State.Id == id).ToList();
            return Json(City);
        }

    }
}
