﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace COMSTU.Models
{
    public class studentRegisterLandlord
    {
        public Guid studentLandlordRegisterId { get; set; }
        public Guid studentId { get; set; }
        public Guid landlordId { get; set; }
        public DateTime dateRegistered { get; set; }
        public Decimal pricePaid { get; set; }
        public int studentRate { get; set; }

    }
}