using BuisnessLayer.Interfaces;
using CoreLayer;
using DataAccessLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace BuisnessLayer
{
    public class UserBuisnessLayer :
        IUserBuisnessLayer
    {
        private readonly IUserDataLayer _userDataLayer;

        public UserBuisnessLayer(IUserDataLayer userDataLayer) 
        {
            _userDataLayer = userDataLayer;
        }
        public bool AddUser(UserModel user)
        {
            if (_userDataLayer.AddUser(user))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public UserModel UserExists(UserModel user)
        {
            var exist = _userDataLayer.UserExists(user);
            if (exist != null)
                return exist;
            else
                return null;
        }
    }
}
