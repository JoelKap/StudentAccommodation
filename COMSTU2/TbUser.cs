using System;
using System.Collections.Generic;

namespace COMSTU2
{
    public partial class TbUser
    {
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Cellphone { get; set; }
        public string Said { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ProfilePicture { get; set; }
        public string StudentProof { get; set; }
        public string UserType { get; set; }
        public string BankAccountType { get; set; }
        public string CaretakerName { get; set; }
    }
}
