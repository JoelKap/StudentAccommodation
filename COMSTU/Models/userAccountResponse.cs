using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace COMSTU.Models
{
    public class userAccountResponse
    {
        public int numberOfUsersRegistered { get; set; }
        public int remainingUsersToRegister { get; set; }
        public int numberOfPaymentMade { get; set; }
        public decimal amountofAmountOutstanding { get; set; }
    }
}