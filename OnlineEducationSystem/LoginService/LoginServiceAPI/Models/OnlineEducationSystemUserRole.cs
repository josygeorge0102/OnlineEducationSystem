using Microsoft.AspNetCore.Identity;

namespace LoginServiceAPI.Models
{
    public class OnlineEducationSystemUserRole : IdentityRole<int>
    {
        public OnlineEducationSystemUserRole() { }
        public OnlineEducationSystemUserRole(string name) : this()
        {
            this.Name = name;
        }
    }
}
