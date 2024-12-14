using CoreLayer;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.Interfaces
{
    public interface IRentalDataLayer
    {
        public bool RentCar(RentalModel car);
        public bool EditRental(RentalModel val);
        public bool DeleteRental(int id, int userId);
        public bool IsAvailable(int cId);
        public IEnumerable<Object> AllRentalAgreements();
        public Object MySingleRentalAgreements(int id);
        public IEnumerable<Object> MyRentalAgreements(int uId);

    }
}
