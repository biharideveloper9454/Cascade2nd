using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CascadingDropdown.Models.ViewModel
{
    public class UploadFileCreateViewModel
    {
        [Display(Name ="UniqueId")]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Gender { get; set; }
        public IFormFile Image { get; set; }
        public int Country { get; set; }
        public int State { get; set; }
        public int City { get; set; }
    }
}
