using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace COMSTU2.Model
{
    public class Accommodation
    {
        public Guid AccommodationId { get; set; }
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public string pictures { get; set; }
        public string pictureRoom1 { get; set; }
        public string pictureRoom2 { get; set; }
        public string pictureRoom3 { get; set; }
        public DateTime date { get; set; }
        public decimal price { get; set; }
        public bool isActive { get; set; }
        public bool isBooked { get; set; }
        public bool hasPaid { get; set; }
        //public DateTime DateCreated { get; set; }
        public DateTime DateExpired { get; set; }
        public string Comment { get; set; }
        public Guid userBookingId { get; set; }
        public DateTime bookingViewDate { get; set; }
        public string ReceiptNo { get; set; }
        public string SID_AMOUNT { get; set; }
        public string SID_CONSISTENT { get; set; }
        public string SID_COUNTRY { get; set; }
        public string SID_CURRENCY { get; set; }
        public string SID_MERCHANT { get; set; }
        public string SID_REFERENCE { get; set; }
        public DateTime DateCreated { get; set; }
        public string transactionId { get; set; }
        public Guid OwnerId { get; set; }
        public string isMakeActiveNow { get; set; }
    }
}
