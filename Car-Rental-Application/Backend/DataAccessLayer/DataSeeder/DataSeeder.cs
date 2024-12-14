using CoreLayer;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DataAccessLayer.DataSeeder
{
    public class DataSeeder
    {
        public static void SeedData(IApplicationBuilder applicationBuilder)
        {
            using var seerviceScope = applicationBuilder.ApplicationServices.CreateScope();
            var context = seerviceScope.ServiceProvider.GetService<CarRentalDbContext>();

            if (!context.Users.Any())
            {

                var users = new List<UserModel>
                {
                new UserModel {Name="admin1", EmailId = "admin1@gmail.com",Mobile="9895783421", Password = "Admin@123", IsAdmin=true },
                new UserModel {Name="admin2", EmailId = "admin2@gmail.com",Mobile="7839823732", Password = "Admin@789", IsAdmin=true},
                new UserModel {Name="Ram", EmailId = "Test123@gmail.com",Mobile="8982198222", Password = "Test1@123", IsAdmin=false},
                new UserModel {Name="Ramesh", EmailId = "Test246@gmail.com",Mobile="8937983222", Password = "Test2@123", IsAdmin=false},
                new UserModel {Name="Suresh", EmailId = "Test3@gmail.com",Mobile="9223721234", Password = "Test3@123", IsAdmin=false}

                };

                context.Users.AddRange(users);
                context.SaveChanges();
            }
            if (!context.Cars.Any())
            {

                var cars = new List<CarModel>
                {
                new CarModel {Maker="Toyota", Model = "Fortuner",RentalPrice= 3000,ImgUrl = "https://live.staticflickr.com/7034/6476255913_a1dccd4ab2_z.jpg", Status =true },
                new CarModel {Maker="Hyundai", Model = "Venue",RentalPrice= 2000, ImgUrl = "https://live.staticflickr.com/1659/24854118276_760e5ab45d_z.jpg", Status =true },
                new CarModel {Maker="Mahindra", Model = "Thar",RentalPrice= 1200,ImgUrl = "https://live.staticflickr.com/2291/2069760138_c6a9e8b518_z.jpg", Status =true },
                new CarModel {Maker="Ambassador", Model = "Oxford",RentalPrice= 2500,ImgUrl = "https://live.staticflickr.com/5763/20512956212_39fb3f1648_z.jpg", Status =true },
                new CarModel {Maker="Tata", Model = "Indica",RentalPrice= 1800,ImgUrl = "https://live.staticflickr.com/8598/16786976481_913e96c5d3.jpg", Status =true },
                new CarModel {Maker="Swift", Model = "Dzire",RentalPrice= 3500,ImgUrl = "https://live.staticflickr.com/8437/7978947826_8a410afea5.jpg", Status =true },
                new CarModel {Maker="Honda", Model = "Civic",RentalPrice= 3800,ImgUrl = "https://live.staticflickr.com/7347/12065754875_cdb520c5ac.jpg", Status =true },
                new CarModel {Maker="Audi", Model = "Y3",RentalPrice= 1000,ImgUrl = "https://live.staticflickr.com/924/42669622444_1233fe22a7.jpg", Status =true },
                new CarModel {Maker="Tata", Model = "Innova",RentalPrice= 2000, ImgUrl = "https://live.staticflickr.com/8053/8124480813_a1fa3e40ae.jpg", Status =true },
                new CarModel {Maker="BMW", Model = "X3",RentalPrice= 1200,ImgUrl = "https://live.staticflickr.com/1881/30974313498_5dcaaae82c.jpg", Status =true },
                new CarModel {Maker="Mercedes", Model = "Benz",RentalPrice= 2500,ImgUrl = "https://live.staticflickr.com/7148/6697257767_fe345da572.jpg", Status =true },
                new CarModel {Maker="Audi", Model = "Q3",RentalPrice= 3500,ImgUrl = "https://live.staticflickr.com/2860/33457017023_b93733acbf.jpg", Status =true },
                new CarModel {Maker="Lamborgini", Model = "Urus",RentalPrice= 3800,ImgUrl = "https://live.staticflickr.com/65535/50494466233_2e6fcc8462.jpg", Status =true },

                };

                context.Cars.AddRange(cars);
                context.SaveChanges();
            }
        }
    }
}
