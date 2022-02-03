#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
    public class StudentController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public StudentController(IUserRepository userRepository)
        {
            _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
        }

        // GET: api/Students
        [HttpGet("students")]
        [Authorize(Policy = "IsAdmin")]
        public ActionResult<IEnumerable<DTOs.DTOUser>> GetAllStudents()
        {
            return Ok(_userRepository.GetAllUsersByRole("student"));
        }


        // GET: api/Student/5
        [HttpGet("students/{id}")]
        [Authorize(Policy = "IsAdmin")]
        public ActionResult<AspNetUser> GetStudentByIdForAdmin(int id)
        {

            if (!UserExistsById(id))
            {
                return NotFound();
            }

            return Ok(_userRepository.GetUserById(id));
        }

        // GET: api/Student/5
        [HttpGet("students/{id}/profile")]
        [Authorize(Policy = "IsStudent")]
        public ActionResult<AspNetUser> GetStudentByIdForStudent(int id)
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


        // PUT: api/Student/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("students/{id}")]
        [Authorize(Policy = "IsAdmin")]
        public IActionResult UpdateStudentDetailsForAdmin(int id, DTOs.DTOUser user)
        {

            if (!UserExistsById(id))
            {
                return NotFound();
            }

            return _userRepository.UpdateUser(user) ? 
                NoContent() :
                StatusCode(500);
        }

        // PUT: api/Student/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("students/{id}/profile")]
        [Authorize(Policy = "IsStudent")]
        public IActionResult UpdateStudentDetailsForStudent(int id, DTOs.DTOUser user)
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

        // DELETE: api/Student/5
        [HttpDelete("students/{id}")]
        [Authorize(Policy = "IsAdmin")]
        public IActionResult SoftDeleteStudent(int id)
        {
            if (!_userRepository.UserExistsById(id))
            {
                return NotFound();
            }

            return _userRepository.SoftDeleteUser(id) ?
                NoContent():
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
