using AutoMapper;
using UserServiceAPI.DTOs;
using UserServiceAPI.Models;

namespace UserServiceAPI.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<DTOUser, AspNetUser>().ReverseMap();
            CreateMap<DTONewUser, AspNetUser>().ReverseMap();

        }
    }
}
