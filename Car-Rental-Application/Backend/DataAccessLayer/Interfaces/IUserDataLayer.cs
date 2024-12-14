using CoreLayer;
namespace DataAccessLayer.Interfaces
{
    public interface IUserDataLayer
    {
        public UserModel UserExists(UserModel user);
        public bool AddUser(UserModel user);
    }
}
