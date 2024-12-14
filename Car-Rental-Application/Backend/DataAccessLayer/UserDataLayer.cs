using CoreLayer;
using DataAccessLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DataAccessLayer
{
    public class UserDataLayer: IUserDataLayer
    {
        private readonly CarRentalDbContext _context;

        public UserDataLayer(CarRentalDbContext dbContext)
        {
            _context = dbContext;
        }

        public IEnumerable<UserModel> GetUsers()
        {
            IEnumerable<UserModel> userModels = _context.Users.ToList();
            return userModels;
        }

        public UserModel UserExists(UserModel userModel)
        {
            var query = (_context.Users.FirstOrDefault(user => user.EmailId == userModel.EmailId && user.Password == userModel.Password));

            if (query != null)
            {
                return query;
            }
            return null;
        }

        public bool AddUser(UserModel userModel)
        {
            IEnumerable<UserModel> userModels = GetUsers();

            int count = (from user in userModels where (user.EmailId == userModel.EmailId) select user).ToList().Count();

            if (count == 0)
            {
                userModel.IsAdmin = false;
                _context.Users.Add(userModel);
                _context.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
