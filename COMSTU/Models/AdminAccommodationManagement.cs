using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace COMSTU.Models
{
    public class AdminAccommodationManagement
    {
        public Guid AccommodationId { get; set; }
        public Guid UserId { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
        public bool isActive { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateExpired { get; set; }
        public Guid userId { get; set; }
        public string Name { get; set; } 
        public string surname { get; set; }
        public string cellphone { get; set; }
        public string email { get; set; }
        public string caretakerName { get; set; }
        public string houseType { get; set; }
    }
}