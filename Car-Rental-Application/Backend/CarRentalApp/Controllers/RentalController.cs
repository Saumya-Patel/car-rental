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
    public class RentalController : ControllerBase
    {
        private readonly IRentalBuisnessLayer _rentBuisnessLayer;

        private readonly IMapper _mapper;

        public RentalController(IRentalBuisnessLayer rentalBuisnessLayer, IMapper mapper)
        {
            _rentBuisnessLayer = rentalBuisnessLayer;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("allRentalAgreements")]
        public IEnumerable<Object> AllRentalAgreements()
        {
            return _rentBuisnessLayer.AllRentalAgreements();
        }

        [HttpGet]
        [HttpGet("{id}")]
        [Route("singleRentalAgreements/{id}")]
        public Object MySingleRentalAgreements(int id)
        {
            var rId = id;
            return _rentBuisnessLayer.MySingleRentalAgreements(rId);
        }

        [HttpGet]
        [HttpGet("{id}")]
        [Route("rentalAgreements/{id}")]
        public IEnumerable<Object> MyRentalAgreements(int id)
        {
            var uId = id;
            return _rentBuisnessLayer.MyRentalAgreements(uId);
        }

        [HttpGet]
        [HttpGet("{id}")]
        [Route("isavailable/{id}")]
        public bool IsAvailable(int id)
        {
            return _rentBuisnessLayer.IsAvailable(id);
        }

        [HttpPost]
        [Route("rent")]
        public bool RentCar([FromBody] RentCarDTO _rentCarDTO)
        {
            RentalModel car = _mapper.Map<RentalModel>(_rentCarDTO);

            return _rentBuisnessLayer.RentCar(car);
        }

        [HttpPut]
        [HttpPut("{id}")]
        [Route("editrental/{id}")]
        public bool EditRental(int id, [FromBody] RentalModel rentalModel)
        {
            if (rentalModel != null)
            {
                rentalModel.RentId = id;
                if (_rentBuisnessLayer.EditRental(rentalModel))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            return false;
        }

        [HttpDelete]
        [HttpDelete("{id}/{uId}")]
        [Route("deleterental/{id}/{uId}")]
        public bool DeleteRental(int id, DeleteRentalDTO _deleteRentalDTO)
        {
            int uId = _deleteRentalDTO.UserId;
            return _rentBuisnessLayer.DeleteRental(id, uId);
        }
    }
}
