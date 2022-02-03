#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using UserServiceAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserServiceAPI.DTOs;

using UserServiceAPI.Repository;
using Microsoft.AspNetCore.Authorization;

namespace UserServiceAPI.Controllers
{
    [Route("api")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public UsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
        }

        // POST: api/AspNetUsers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Route("Register")]
        [HttpPost]
        [AllowAnonymous]
        public ActionResult<DTONewUser> RegisterNewUser(DTONewUser newUser)
        {
            if (!(new[] { "admin", "teacher", "student" }.Contains(newUser.Role.ToLower())))
            {
                return BadRequest();
            }
                
            return _userRepository.CreateNewUser(newUser) ?
                CreatedAtAction("RegisterNewUser", newUser) :
                BadRequest();
        }
    }
}
