using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace CoreLayer
{
    public class CarModel
    {
        [Key]
        public int CarId { get; set; }
        public string Maker { get; set; }
        public string Model { get; set; }
        public float RentalPrice { get; set; }
        public bool Status { get; set; }
        public string ImgUrl { get; set; }

        [ForeignKey("CardId")]

        public ICollection<RentalModel> RentalModels { get; set; }
    }
}
