using AutoMapper;
using BuisnessLayer.Interfaces;
using CarRentalApp.DTOs;
using CoreLayer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRentalApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly ICarBuisnessLayer _carBuisnessLayer;

        private readonly IMapper _mapper;

        public CarController(ICarBuisnessLayer carBuisnessLayer, IMapper mapper)
        {
            _carBuisnessLayer = carBuisnessLayer;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("allcars")]

        public IEnumerable<CarModel> GetAllCars()
        {
            return _carBuisnessLayer.GetAllCars();
        }

        [HttpGet]
        [Route("filteredcars")]

        public IEnumerable<CarModel> GetFilteredCars(FilterCarDTO _filterCarDTO)
        {
            CarModel car = _mapper.Map<CarModel>(_filterCarDTO);

            return _carBuisnessLayer.GetFilteredCars(car);

        }

        [HttpGet]
        [HttpGet("{id}")]
        [Route("detail/{id}")]

        public CarModel GetCarById(int id)
        {
            return _carBuisnessLayer.GetCarById(id);
        }
    }
}
