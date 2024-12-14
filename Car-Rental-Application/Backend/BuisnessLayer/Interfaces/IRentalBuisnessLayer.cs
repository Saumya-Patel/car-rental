using CoreLayer;
using System;
using System.Collections.Generic;
using System.Text;

namespace BuisnessLayer.Interfaces
{
    public interface IRentalBuisnessLayer
    {
        public bool RentCar(RentalModel car);

        public bool EditRental(RentalModel rentalModel);

        public bool DeleteRental(int id,int userId);

        public bool IsAvailable(int cId);
        public IEnumerable<Object> AllRentalAgreements();

        public Object MySingleRentalAgreements(int id);

        public IEnumerable<Object> MyRentalAgreements(int id);


    }
}
