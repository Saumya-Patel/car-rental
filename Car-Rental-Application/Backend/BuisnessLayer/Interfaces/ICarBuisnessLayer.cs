using CoreLayer;
using System;
using System.Collections.Generic;
using System.Text;

namespace BuisnessLayer.Interfaces
{
    public interface ICarBuisnessLayer
    {
        public IEnumerable<CarModel> GetAllCars();

        public IEnumerable<CarModel> GetFilteredCars(CarModel car);

        public CarModel GetCarById(int id);
    }
}
