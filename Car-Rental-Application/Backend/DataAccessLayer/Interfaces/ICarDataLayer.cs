using CoreLayer;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.Interfaces
{
    public interface ICarDataLayer
    {
        public IEnumerable<CarModel> GetAllCars();
        public IEnumerable<CarModel> GetFilteredCars(CarModel carModel);

        public CarModel GetCarById(int id);
    }
}
