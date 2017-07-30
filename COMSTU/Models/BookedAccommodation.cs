using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace COMSTU.Models
{
    public class BookedAccommodation
    {
        public Guid isBookedId { get; set; }
        public Guid studentId { get; set; }
        public Guid accommodationId { get; set; }
        public DateTime dateBooked { get; set; }
        public DateTime dateToView { get; set; }

    }
}