using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace COMSTU.Models
{
    public class PayModel
    {
        public string ReceiptNo { get; set; }
        public string SID_AMOUNT { get; set; }
        public string SID_CONSISTENT { get; set; }
        public string SID_COUNTRY { get; set; }
        public string SID_CURRENCY { get; set; }
        public string SID_MERCHANT { get; set; }
        public string SID_REFERENCE { get; set; }
        public string dateCreated { get; set; }
        public string transactionId { get; set; }
        public Guid OwnerId { get; set; }
        public Guid userBookingId { get; set; }
        public Guid AccommodationId { get; set; }


    }
}