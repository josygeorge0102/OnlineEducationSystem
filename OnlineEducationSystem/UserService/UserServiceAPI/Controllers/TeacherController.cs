#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserServiceAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using UserServiceAPI.Repository;
using Microsoft.AspNetCore.Authorization;

namespace UserServiceAPI.Controllers
{
    [Route("api")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public TeacherController(IUserRepository userRepository)
        {
            _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
        }

        // GET: api/Teacher
        [HttpGet("teachers")]
        [Authorize(Policy = "IsAdmin")] 
        public ActionResult<IEnumerable<DTOs.DTOUser>> GetAllTeachers()
        {
            return Ok(_userRepository.GetAllUsersByRole("teacher"));
        }

        // GET: api/Teacher/5
        [HttpGet("teachers/{id}")]
        [Authorize(Policy = "IsAdmin")]
        public ActionResult<AspNetUser> GetTeacherByIdForAdmin(int id)
        {
            if (!UserExistsById(id))
            {
                return NotFound();
            }

            return Ok(_userRepository.GetUserById(id));
        }

        // GET: api/Teacher/5
        [HttpGet("teachers/{id}/profile")]
        [Authorize(Policy = "IsTeacher")]
        public ActionResult<AspNetUser> GetTeacherByIdForTeacher(int id)
        {
            if (id != int.Parse(User.FindFirst("sub")?.Value))
            {
                return BadRequest();
            }
            if (!UserExistsById(id))
            {
                return NotFound();
            }

            return Ok(_userRepository.GetUserById(id));
        }

        // PUT: api/Teacher/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("teachers/{id}")]
        [Authorize(Policy = "IsAdmin")]
        public IActionResult UpdateTeacherDetailsForAdmin(int id, DTOs.DTOUser user)
        {

            if (!UserExistsById(id))
            {
                return NotFound();
            }

            return _userRepository.UpdateUser(user) ?
                NoContent() :
                StatusCode(500);
        }

        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("teachers/{id}/profile")]
        [Authorize(Policy = "IsTeacher")]
        public IActionResult UpdateTeacherDetailsForTeacher(int id, DTOs.DTOUser user)
        {
            if (id != int.Parse(User.FindFirst("sub")?.Value))
            {
                return BadRequest();
            }

            if (!UserExistsById(id))
            {
                return NotFound();
            }

            return _userRepository.UpdateUser(user) ?
                NoContent() :
                StatusCode(500);
        }


        //// POST: api/Teacher
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost]
        //public async Task<ActionResult<AspNetUser>> PostAspNetUser(AspNetUser aspNetUser)
        //{
        //    _context.AspNetUsers.Add(aspNetUser);
        //    try
        //    {
        //        await _context.SaveChanges();
        //    }
        //    catch (DbUpdateException)
        //    {
        //        if (AspNetUserExists(aspNetUser.Id))
        //        {
        //            return Conflict();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return CreatedAtAction("GetAspNetUser", new { id = aspNetUser.Id }, aspNetUser);
        //}

        // DELETE: api/Teacher/5
        [HttpDelete("teachers/{id}")]
        [Authorize(Policy = "IsAdmin")]
        public IActionResult SoftDeleteTeacher(int id)
        {
            if (!_userRepository.UserExistsById(id))
            {
                return NotFound();
            }

            return _userRepository.SoftDeleteUser(id) ?
                NoContent() :
                StatusCode(500);
        }

        private bool UserExistsByEmail(string email)
        {
            return _userRepository.UserExistsByEmail(email);
        }
        private bool UserExistsById(int id)
        {
            return _userRepository.UserExistsById(id);
        }
    }
}
