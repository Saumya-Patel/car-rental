using CoreLayer;
using DataAccessLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace DataAccessLayer
{
    public class RentalDataLayer : IRentalDataLayer
    {
        private readonly CarRentalDbContext _context;

        public RentalDataLayer(CarRentalDbContext context)
        {
            _context = context;
        }

        

        public bool DeleteRental(int id,int userId)
        {
            var rentals = from rental in _context.Rentals
                          where rental.RentId == id
                          select rental;

            var rents = rentals.ToList().FirstOrDefault();

            var user = (from u in _context.Users
                         where u.UserId == userId select u).ToList().FirstOrDefault();


            if(rents != null && (user.IsAdmin == true || rents.IsAccepted== false))
            {
                _context.Rentals.Remove(rents);
                _context.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool EditRental(RentalModel val)
        {
            try
            {
                _context.Rentals.Update(val);
                _context.SaveChanges();
                return true;
            }
            catch
            {
                
            }
            return false;

        }

        public bool RentCar(RentalModel car)
        {
            try
            {
                var rentals = from rent in _context.Rentals
                              where rent.CarId == car.CarId
                              select rent;

                foreach (var r in rentals)
                {
                    if (r.IsAccepted == true && r.IsReturned == false)
                    {
                        return false;
                    }
                }

                car.IsAccepted = false;
                car.IsReturned = false;
                car.ReturnReq = false;
                _context.Rentals.Add(car);
                _context.SaveChanges();
                return true;
            }
            catch
            {

            }
            return false;
        }

        public bool IsAvailable(int cId)
        {
            var query = from rentals in _context.Rentals
                        where rentals.CarId == cId
                        select rentals;

            foreach(var rent in query)
            {
                if(rent.IsAccepted==true && rent.IsReturned == false)
                {
                    return false;
                }
            }
            return true;
        }

        public IEnumerable<object> MyRentalAgreements(int uId)
        {
            var agreements = (from r in _context.Rentals
                              join c in _context.Cars
                              on r.CarId equals c.CarId
                              where r.UserId == uId
                              select new { c.CarId, c.Maker, c.Model, c.RentalPrice, c.ImgUrl, r.RentId, r.StartDate, r.EndDate, r.RentedPrice, r.ReturnReq, r.IsReturned, r.IsAccepted }).ToList();

            return agreements;
        }

        public object MySingleRentalAgreements(int id)
        {
            var agreement = (from r in _context.Rentals
                             join c in _context.Cars
                             on r.CarId equals c.CarId
                             where r.RentId == id
                             select new { c.CarId, c.Maker, c.Model, c.RentalPrice, c.ImgUrl, r.RentId, r.StartDate, r.EndDate, r.RentedPrice, r.ReturnReq, r.IsReturned, r.IsAccepted }).FirstOrDefault();

            return agreement;
        }

        public IEnumerable<object> AllRentalAgreements()
        {
            var allAgreements = (from r in _context.Rentals
                                 join c in _context.Cars
                                 on r.CarId equals c.CarId
                                 join u in _context.Users
                                 on r.UserId equals u.UserId
                                 select new { c.CarId, c.Model, c.RentalPrice, c.ImgUrl, r.RentId, r.StartDate, r.EndDate, r.ReturnReq, r.IsReturned, r.IsAccepted, u.UserId, u.Name, u.Mobile }).ToList();

            return allAgreements;
        }
    }
}
