using System;
using System.Collections.Generic;

namespace COMSTU2
{
    public partial class TbBookedAccommodation
    {
        public Guid IsBookedId { get; set; }
        public Guid StudentId { get; set; }
        public Guid AccommodationId { get; set; }
        public DateTime DateBooked { get; set; }
        public DateTime? DateToView { get; set; }
    }
}
