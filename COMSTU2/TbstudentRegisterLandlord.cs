using System;
using System.Collections.Generic;

namespace COMSTU2
{
    public partial class TbstudentRegisterLandlord
    {
        public Guid StudentLandlordRegisterId { get; set; }
        public Guid StudentId { get; set; }
        public Guid LandlordId { get; set; }
        public DateTime DateRegistered { get; set; }
        public decimal PricePaid { get; set; }
        public int RateToEmployee { get; set; }
        public bool IsPaid { get; set; }
    }
}
