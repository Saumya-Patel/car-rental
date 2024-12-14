using BuisnessLayer.Interfaces;
using CoreLayer;
using DataAccessLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace BuisnessLayer
{
    public class RentalBuisnessLayer: IRentalBuisnessLayer
    {
        private readonly IRentalDataLayer _rentalDataLayer;

        public RentalBuisnessLayer(IRentalDataLayer rentalDataLayer)
        {
            _rentalDataLayer = rentalDataLayer;
        }
        

        public bool DeleteRental(int id, int userId)
        {
            var val = _rentalDataLayer.DeleteRental(id, userId);
            return val;
        }

        public bool EditRental(RentalModel rentalModel)
        {
            var value = _rentalDataLayer.EditRental(rentalModel);
            return value;
        }

        public bool RentCar(RentalModel car)
        {
            return _rentalDataLayer.RentCar(car);
        }

        public bool IsAvailable(int cId)
        {
            return _rentalDataLayer.IsAvailable(cId);
        }

        public IEnumerable<object> MyRentalAgreements(int id)
        {
            var uId = id;
            return _rentalDataLayer.MyRentalAgreements(uId);
        }

        public Object MySingleRentalAgreements(int id)
        {
            var rId=id;
            return _rentalDataLayer.MySingleRentalAgreements(rId);
        }
        public IEnumerable<object> AllRentalAgreements()
        {
            return _rentalDataLayer.AllRentalAgreements();
        }
        
    }
}
