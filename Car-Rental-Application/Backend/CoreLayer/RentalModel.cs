using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace CoreLayer
{
    public class RentalModel
    {   
        [Key]
        public int RentId { get; set; }

        [ForeignKey("Car")]
        public int CarId { get; set; }
        public CarModel CarObj { get; set; }
        public int UserId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public float RentedPrice { get; set; }
        public bool ReturnReq { get; set; }
        public bool IsReturned { get; set; }
        public bool IsAccepted { get; set; }
    }
}
