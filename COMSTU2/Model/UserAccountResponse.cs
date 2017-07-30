using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace COMSTU2.Model
{
    public class UserAccountResponse
    {
        public int numberOfUsersRegistered { get; set; }
        public int remainingUsersToRegister { get; set; }
        public int numberOfPaymentMade { get; set; }
        public decimal amountofAmountOutstanding { get; set; }
    }
}
