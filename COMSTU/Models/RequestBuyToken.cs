using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace COMSTU.Models
{
    public class RequestBuyToken
    {
        public string MERCHANT { get; set; }
        public string CURRENCY { get; set; }
        public string COUNTRY { get; set; }
        public string REFERENCE { get; set; }
        public string AMOUNT { get; set; }
        public string PRIVATEKEY { get; set; }
        public string FinalKey { get; set; }

    }
}