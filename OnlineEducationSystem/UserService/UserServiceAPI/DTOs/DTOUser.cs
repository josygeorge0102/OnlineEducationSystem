namespace UserServiceAPI.DTOs
{
    public class DTOUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public int? RollNo { get; set; }
        public DateTimeOffset? DateOfBirth { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public bool IsDeleted { get; internal set; }
        public string PasswordHash { get; set; }
        public string? UserName { get; set; }
    }
}
