using CoreLayer;
using System;
using System.Collections.Generic;
using System.Text;

namespace BuisnessLayer.Interfaces
{
    public interface IUserBuisnessLayer
    {
        public UserModel UserExists(UserModel user);
        public bool AddUser(UserModel user);
    }
}
