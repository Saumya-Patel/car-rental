using Microsoft.EntityFrameworkCore;
using CoreLayer;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer
{
    public class CarRentalDbContext : DbContext
    {
        public CarRentalDbContext(DbContextOptions<CarRentalDbContext> options)
            : base(options)
        {

        }

        public DbSet<UserModel> Users { get; set; }
        public DbSet<CarModel> Cars { get; set; }

        public DbSet<RentalModel> Rentals { get; set; }

    }
}
