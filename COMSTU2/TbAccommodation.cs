using System;
using System.Collections.Generic;

namespace COMSTU2
{
    public partial class TbAccommodation
    {
        public Guid AccommodationId { get; set; }
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public string Pictures { get; set; }
        public decimal Price { get; set; }
        public bool IsActive { get; set; }
        public bool IsBooked { get; set; }
        public bool HasPaid { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateExpired { get; set; }
        public string Comment { get; set; }
        public string PictureRoom1 { get; set; }
        public string PictureRoom2 { get; set; }
        public string PictureRoom3 { get; set; }
    }
}
