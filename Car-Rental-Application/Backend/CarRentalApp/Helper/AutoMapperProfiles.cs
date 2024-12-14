using AutoMapper;
using CarRentalApp.DTOs;
using CoreLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRentalApp.Helper
{
    public class AutoMapperProfiles:Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<UserRegisterDTO, UserModel>();
            CreateMap<UserLoginDTO, UserModel>();
            CreateMap<FilterCarDTO,CarModel>();

            CreateMap<RentCarDTO, RentalModel>();

            CreateMap<DeleteRentalDTO, RentalModel>();

            //CreateMap<GetCarDTO, CarModel>();

        }
    }
}
