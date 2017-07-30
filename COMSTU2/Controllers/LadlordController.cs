using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using COMSTU2.Model;

namespace COMSTU2.Controllers
{
    [Produces("application/json")]
    [Route("api/Ladlord")]
    public class LadlordController : Controller
    {
        // GET: api/Ladlord
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Ladlord/5
        [HttpGet("{id}", Name = "GetByAccommodationId")]
        public string Get(int id)
        {
            return "value";
        }

        [HttpPost("{user}")]
        public bool StudentRegisterll([FromBody]User user)
        {
            var bll = new BLL.UserBll();
            return bll.studentRegisterUser(user);
        }

        // PUT: api/Ladlord/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
