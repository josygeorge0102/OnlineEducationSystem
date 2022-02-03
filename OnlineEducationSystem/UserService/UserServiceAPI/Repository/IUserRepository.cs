

using UserServiceAPI.Models;

namespace UserServiceAPI.Repository
{
    public interface IUserRepository
    {
        AspNetUser GetUserById(int id);
        DTOs.DTOUser GetUserByEmail(string email);
        bool UpdateUser(DTOs.DTOUser user);
        bool SoftDeleteUser(int id);
        bool CreateNewUser(DTOs.DTONewUser user);
        bool UserExistsByEmail(string email);
        bool UserExistsById(int id);
        IEnumerable<DTOs.DTOUser> GetAllUsersByRole(string role);
    }
}
