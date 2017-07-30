using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using COMSTU.Models;

namespace COMSTU.Controllers
{
    public class AccommodationController : ApiController
    {
        // GET: api/Accommodation
      
        public List<Accommodation> GetAccommodation()
        {
            var availableAccomodations = new BLL.AccommodationBll();
            return availableAccomodations.GetAccommodations();
        }

        public List<AdminAccommodationManagement> GetAccommodationForAdmin()
        {
            var acc = new BLL.AccommodationBll();
            return acc.getAdminAccommodations();
        }

        [HttpPost]
        public bool CreateUserAccommodation(Accommodation saveUserAccommodation)
        {
            var bll = new BLL.AccommodationBll();
            return bll.CreateUserAccommodation(saveUserAccommodation);
        }

        [HttpGet]
        public bool Activate(Guid AccommodationId)
        {
            var bll = new BLL.AccommodationBll();
            return bll.activateAccommodation(AccommodationId);
        }

        // GET: api/Accommodation/5
        public string GetById(int id)
        {
            return "value";
        }

        // POST: api/Accommodation
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Accommodation/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Accommodation/5
        public void Delete(int id)
        {
        }
    }
}
