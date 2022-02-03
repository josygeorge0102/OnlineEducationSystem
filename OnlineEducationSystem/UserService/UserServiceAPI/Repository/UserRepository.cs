using AutoMapper;
using UserServiceAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.IdentityModel.Tokens.Jwt;

namespace UserServiceAPI.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly UserServiceDBContext _context;
        private readonly IMapper _mapper;

        public UserRepository(UserServiceDBContext context, IMapper mapper)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }
        public bool CreateNewUser(DTOs.DTONewUser user)
        {
            //Add roles here too



            //var temp = _mapper.Map<AspNetUser>(user);
            //mkapping to empty wont work for GUIDs
            _context.AspNetUsers.Add(
                new AspNetUser
                {
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Gender = user.Gender,
                    RollNo = user.RollNo,
                    DateOfBirth = user.DateOfBirth,
                    PhoneNumber = user.PhoneNumber,
                    PasswordHash = user.Password, //hash here using USRMGR
                    UserName = user.UserName,
                    AspNetUserClaims = new[]
                    {
                        new AspNetUserClaim
                        {
                            ClaimType = "role",
                            ClaimValue = user.Role
                        }
                    }
                }
                 );

                    //delete me :
                    //  new AspNetUser { 
                    //         Email = user.Email,
                    //         FirstName = user.FirstName,
                    //         LastName = user.LastName,
                    //         Gender = user.Gender,
                    //         RollNo = user.RollNo,
                    //         DateOfBirth = user.DateOfBirth,
                    //         PhoneNumber = user.PhoneNumber,
                    //     }
            try
            {
                _context.SaveChanges(); 
            }
            catch (DbUpdateException)
            {
                if (!UserExistsByEmail(user.Email))
                {
                    return false;
                }
                else{
                    throw;
                }
            }
            return true;
        }

        public bool SoftDeleteUser(int id)
        {
            var user = GetUserById(id);
            user.IsDeleted = true;

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                _context.SaveChanges();
            }
            catch(DbUpdateConcurrencyException)
            {
                return false;
            }
            return true;

        }

        public bool UpdateUser(DTOs.DTOUser user)
        {
            var newUser = new AspNetUser
            {
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Gender = user.Gender,
                RollNo = user.RollNo,
                DateOfBirth = user.DateOfBirth,
                PhoneNumber = user.PhoneNumber,
                PasswordHash = user.PasswordHash,
                UserName = user.UserName,
                AspNetUserClaims = new[]
                    {
                        new AspNetUserClaim
                        {
                            ClaimType = "role",
                            ClaimValue = user.Role
                        }
                    }
            };
            _context.Entry(newUser).State = EntityState.Modified;

            try
            {
                _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return false;
            }

            return true;
        }
        public IEnumerable<DTOs.DTOUser> GetAllUsersByRole(string role)
        {
            //var userIdList = _context.AspNetUserClaims
            //    .AsEnumerable()
            //    .Where(u => u.ClaimType == "role" && u.ClaimValue == role)
            //    .Select(u => u.UserId)
            //    .ToList();

            //var temp = _context.AspNetUsers
            //    .AsEnumerable()
            //    .ToList();
            //        //.Where(u => !u.IsDeleted).ToList();

            //var temp2 = temp
            //        .Where(u => userIdList.Contains(u.Id))
            //        .ToList();

            //.Join(userIdList, user => user.Id, k => k, (user, k) => user.Id == k)
            //.ToList();

            var users = _context.AspNetUsers.AsEnumerable()
                        .Where(u => u.IsDeleted == false)
                        .ToList();
            var claims = _context.AspNetUserClaims
                        .Where(u => u.ClaimType == "role" && u.ClaimValue == role)
                        .ToList();

            var temp = users.AsEnumerable().Join(claims.AsEnumerable(),
                                    u => u.Id, c => c.UserId,
                                    (u, c) => new DTOs.DTOUser
                                    {
                                        UserName = u.UserName,
                                        Email = u.Email,
                                        FirstName  = u.FirstName,
                                        LastName = u.LastName,
                                        Gender = u.Gender,
                                        Role = c.ClaimValue,
                                        RollNo = u.RollNo,
                                        DateOfBirth = u.DateOfBirth,
                                        PhoneNumber = u.PhoneNumber
                                    })            
                                .ToList();

            return _mapper.Map<IEnumerable<DTOs.DTOUser>>(temp);
        }

        public DTOs.DTOUser GetUserByEmail(string email)
        {
            return _mapper.Map<DTOs.DTOUser>(_context.AspNetUsers
                .Where(u => u.IsDeleted == false)
                .FirstOrDefault(u => u.Email == email, new AspNetUser()));
        }

        public AspNetUser GetUserById(int id)
        {
            var user = _context.AspNetUsers
                .AsEnumerable()
                .Where(u => u.IsDeleted == false)
                .FirstOrDefault(u => u.Id == id, new AspNetUser());
            return user;
        }

        //public string getUserIdFromJwtToken()
        //{
        //    var bearerToken = Request.Headers["Authorization"].ToString();
        //    var token = bearerToken.Split(' ')[1];
        //    var jwtToken = new JwtSecurityToken(token);
        //    var userId = jwtToken.Subject;
        //    return userId;
        //}
        public bool UserExistsByEmail(string email)
        {
            return _context.AspNetUsers
                .Where(u => u.IsDeleted == false)
                .Any(e => e.Email == email);
        }
        public bool UserExistsById(int id)
        {
            return _context.AspNetUsers
                .Where(u => u.IsDeleted == false)
                .Any(e => e.Id == id);
        }
    }
}
