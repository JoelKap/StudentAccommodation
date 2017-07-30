using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace COMSTU2.Model
{
    public class User
    {
        public Guid userId { get; set; }
        public string Name { get; set; }
        public string surname { get; set; }
        public string cellphone { get; set; }
        public string saId { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string caretakerName { get; set; }
        public string userType { get; set; }
        public string bankType { get; set; }
        public string profilePicture { get; set; }
        public string studentProof { get; set; }
        public Guid studentId { get; set; }
        public int numberOfUserRegistered { get; set; }
        public int balance { get; set; }
        public string shouldBePaid { get; set; }
        public List<Guid> studentLandlordRegisterIds { get; set; }
    }
}
