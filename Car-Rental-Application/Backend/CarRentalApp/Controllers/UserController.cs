using AutoMapper;
using BuisnessLayer.Interfaces;
using CarRentalApp.DTOs;
using CarRentalApp.Models;
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
    public class UserController : ControllerBase
    {
        private readonly IUserBuisnessLayer _userBuisnessLayer;

        private readonly IMapper _mapper;

        public UserController(IUserBuisnessLayer userBuisnessLayer, IMapper mapper)
        {
            _userBuisnessLayer = userBuisnessLayer;
            _mapper = mapper;
        }

        [HttpPost]
        [Route("register")]

        public bool Post([FromBody] UserRegisterDTO _userRegisterDTO)
        {
            if(_userRegisterDTO != null)
            {
                UserModel user = _mapper.Map<UserModel>(_userRegisterDTO);
                if (ModelState.IsValid)
                {
                    if (_userBuisnessLayer.AddUser(user))
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
            return false;
        }

        [HttpPost]
        [Route("login")]

        public Object Post(UserLoginDTO _userLoginDTO)
        {
            if (ModelState.IsValid)
            {
                UserModel userModel = _mapper.Map<UserModel>(_userLoginDTO);

                var user = _userBuisnessLayer.UserExists(userModel);
                if (user != null)
                {
                    return user;
                }
                else
                {
                    return new { msg = "No Match" };
                }
            }
            return new { msg = "No Fill" };
        }
    }
}
