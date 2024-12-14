using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRentalApp.DTOs
{
    public class FilterCarDTO
    {
        public string Maker { get; set; }
        public string Model { get; set; }
        public float RentalPrice { get; set; }
    }
}
