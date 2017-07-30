using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using COMSTU2.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace COMSTU2.Controllers
{
    //[Produces("application/json")]
    [Route("api/Accommodation")]
    public class AccommodationController : Controller
    {

        // GET: api/Accommodation
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }


        [HttpGet("GetAccommodation")]
        public List<Accommodation> GetAccommodation()
        {
            var availableAccomodations = new BLL.AccommodationBll();
            var accommodations = availableAccomodations.GetAccommodations();
            return accommodations;
        }

        [Route("[action]")]
        [HttpPost("{saveUserAccommodation}")]
        [HttpPost]
        public bool CreateUserAccommodation([FromBody]Accommodation saveUserAccommodation)
        {
            var bll = new BLL.AccommodationBll();
            return bll.CreateUserAccommodation(saveUserAccommodation);
        }

        // GET: api/Accommodation/5
        [Route("[action]")]
        [HttpGet]
        public List<AdminAccommodationManagement> GetAccommodationForAdmin()
        {
            var acc = new BLL.AccommodationBll();
            return acc.getAdminAccommodations();
        }

        [Route("[action]")]
        [HttpGet]
        public bool Activate(Guid AccommodationId)
        {
            var bll = new BLL.AccommodationBll();
            return bll.activateAccommodation(AccommodationId);
        }

        // POST: api/Accommodation
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }
        
        // PUT: api/Accommodation/5
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
