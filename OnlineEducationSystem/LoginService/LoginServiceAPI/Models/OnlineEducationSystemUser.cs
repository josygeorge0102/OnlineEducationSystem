using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel.DataAnnotations;

namespace LoginServiceAPI.Models
{
    // Add profile data for application users by adding properties to the OnlineEducationSystemUser class
    public class OnlineEducationSystemUser : IdentityUser<int>
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Gender { get; set; }
        public int? RollNo { get; set; }
        public DateTimeOffset? DateOfBirth { get; set; }
        [Required]
        public bool IsDeleted { get; set; }
        [Required]
        public bool IsApproved { get; set; }
    }
}
