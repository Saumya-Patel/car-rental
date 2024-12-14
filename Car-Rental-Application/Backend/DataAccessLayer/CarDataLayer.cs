using CoreLayer;
using DataAccessLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DataAccessLayer
{
    public class CarDataLayer : ICarDataLayer
    {
        private readonly CarRentalDbContext _context;

        public CarDataLayer(CarRentalDbContext context)
        {
            _context = context;
        }

        public IEnumerable<CarModel> GetAllCars()
        {
            IEnumerable<CarModel> carList = _context.Cars.ToList();
            return carList;
        }

        public IEnumerable<CarModel> GetFilteredCars(CarModel carModel)
        {
            IEnumerable<CarModel> carList = _context.Cars.ToList();

            IEnumerable<CarModel> result;

            if (carModel.RentalPrice < 0)
            {
                result = from car in carList
                         where
                                car.Model.Contains(carModel.Model) &&
                                 car.Maker.Contains(carModel.Maker)
                         select car;
            }
            else
            {
                result = from car in carList
                         where
                         car.Model.Contains(carModel.Model) &&
                         car.Maker.Contains(carModel.Maker) &&
                         car.RentalPrice.Equals(carModel.RentalPrice)
                         select car;
            }
            return result;
        }

        public CarModel GetCarById(int id)
        {
            var query = (_context.Cars.FirstOrDefault(car => car.CarId == id));
            return query;
        }

    }
}
