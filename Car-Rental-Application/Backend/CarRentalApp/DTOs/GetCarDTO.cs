using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRentalApp.DTOs
{
    public class GetCarDTO
    {
        public int CarId { get; set; }
        public string Maker { get; set; }
        public string Model { get; set; }
        public float RentalPrice { get; set; }
        public bool Status { get; set; }
        public string ImgUrl { get; set; }
    }
}
