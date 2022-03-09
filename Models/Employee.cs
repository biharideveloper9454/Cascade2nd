using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CascadingDropdown.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        [Required(ErrorMessage = "State is required.")]
        public string State { get; set; }
        public string City { get; set; }
    }
}
