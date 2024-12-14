using BuisnessLayer.Interfaces;
using CoreLayer;
using DataAccessLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace BuisnessLayer
{
    public class CarBuisnessLayer : ICarBuisnessLayer
    {
        private readonly ICarDataLayer _carDataLayer;

        public CarBuisnessLayer(ICarDataLayer carDataLayer)
        {
            _carDataLayer = carDataLayer;
        }

        public IEnumerable<CarModel> GetAllCars()
        {
            var carList = _carDataLayer.GetAllCars();
            if (carList != null)
            {
                return carList;
            }
            else
            {
                return null;
            }
        }

        public CarModel GetCarById(int id)
        {
            var car = _carDataLayer.GetCarById(id);
            return car;
        }

        public IEnumerable<CarModel> GetFilteredCars(CarModel car)
        {
            var cars = _carDataLayer.GetFilteredCars(car);

            return cars;
        }

        
    }
}
