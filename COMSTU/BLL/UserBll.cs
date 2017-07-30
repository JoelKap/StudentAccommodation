using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using COMSTU.Controllers;
using COMSTU.Models;
using System.Data.Entity;
using System.Net.Mail;
using System.Text;
using Microsoft.Ajax.Utilities;

namespace COMSTU.BLL
{
    public class UserBll
    {
        private COMSTUContext db = new COMSTUContext();
        public bool registerUser(User user)
        {
            try
            {
                var coreUser = ConvertToCore(user);

                //Validate if user email and or cellphone already exist

                var userNumberExist = db.tbUsers.FirstOrDefault(c => c.Cellphone == user.cellphone);
                if (userNumberExist == null)
                {
                    var isUserEmailExist = db.tbUsers.FirstOrDefault(c => c.Email == user.email);
                    if (isUserEmailExist == null)
                    {
                        db.tbUsers.Add(coreUser);
                        db.SaveChanges();
                        return true;
                    }
                    else
                    {
                        return false;
                    }

                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {

                return false;
            }
        }

        internal List<User> GetUsersToPay()
        {
            var coreUsers = db.tbstudentRegisterLandlords.AsNoTracking().Where(c => c.isPaid == false).GroupBy(c => c.studentId, (key, c) => c.FirstOrDefault()).ToList();

            List<User> newUsers = new List<User>();
            foreach (var user in coreUsers)
            {
                //Get User if they have registered Landlord
                tbUser studentObj = db.tbUsers.AsNoTracking().FirstOrDefault(c => c.UserId == user.studentId);
                var studentLandLords = coreUsers.Where(c => c.studentId == studentObj.UserId).GroupBy(c => c.studentId == studentObj.UserId).ToList();
                foreach (var student in studentLandLords)
                {
                    newUsers.Add(new User()
                    {
                        Name = studentObj.Name,
                        surname = studentObj.Surname,
                        cellphone = studentObj.Cellphone,
                        numberOfUserRegistered = db.tbstudentRegisterLandlords.AsNoTracking().Count(c => c.studentId == studentObj.UserId),
                        balance = 'R' + ' ' + db.tbstudentRegisterLandlords.AsNoTracking().Where(c => c.studentId == studentObj.UserId).Sum(c => c.rateToEmployee),
                        shouldBePaid = studentLandLords.Count() > 12 ? "Yes" : "No",
                        studentId = studentObj.UserId,
                        studentLandlordRegisterIds = db.tbstudentRegisterLandlords.Where(c => c.studentId == studentObj.UserId).Select(c => c.studentLandlordRegisterId).ToList(),
                        email = studentObj.Email
                    });
                }
            }
            return newUsers;
        }

        internal bool payUser(User user)
        {

            foreach (var item in user.studentLandlordRegisterIds)
            {
                var userCore = db.tbstudentRegisterLandlords.FirstOrDefault(c => c.studentLandlordRegisterId == item);
                userCore.isPaid = true;

                db.Entry(userCore).State = EntityState.Modified;
                db.SaveChanges();
            };
            SendNotificationToStudentForPayment(user);
            return true;
        }
        private void SendNotificationToStudentForPayment(User user)
        {
            var body = "Hello Mr/Mrs " + user.Name + " " + user.surname + ", " +
           "\nWhose email is: " + " " + user.email + " " + "and Telephone number is " +
           " " + user.cellphone + " " + "Id Number " + user.saId
           + " " + "\n, Your payment is being processed by COMSTU administrator and it will paid into your account soon";


            // Command line argument must the the SMTP host.
            SmtpClient client = new SmtpClient();
            client.Port = 587;
            client.Host = "smtp.gmail.com";
            client.EnableSsl = true; //false;
            client.Timeout = 10000;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = false;
            client.Credentials = new System.Net.NetworkCredential("joelkapuku@gmail.com", "kaspersky12");
            MailMessage mm = new MailMessage("donotreply@domain.com", user.email, "Payment being processed", body);
            mm.BodyEncoding = UTF8Encoding.UTF8;
            mm.DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure;
            client.Send(mm);
        }

        internal userAccountResponse getUserAccount(Guid userId)
        {
            try
            {
                var returnUserResponse = new userAccountResponse();
                var userAccObj = new tbstudentRegisterLandlord();
                List<tbstudentRegisterLandlord> userAcc = db.tbstudentRegisterLandlords.Where(c => c.studentId == userId).ToList();
                decimal userAmount = 0;
                foreach (var amt in userAcc)
                {
                    userAmount += amt.rateToEmployee;
                }

                //chck if had been paid off already to reset it count
                //Get backoffice payment details for this user

                returnUserResponse.numberOfUsersRegistered = userAcc.Count();
                returnUserResponse.amountofAmountOutstanding = userAmount;

                return returnUserResponse;

            }
            catch (Exception)
            {

                return null;
            }
        }

        internal bool studentRegisterUser(User user)
        {
            try
            {
                user.userId = Guid.NewGuid();
                var userCore = ConvertToCore(user);

                //Save User
                db.tbUsers.Add(userCore);
                db.SaveChanges();

                //Save student Credentials
                var stu = new studentRegisterLandlord()
                {
                    dateRegistered = DateTime.Now,
                    landlordId = user.userId,
                    pricePaid = 250,
                    studentId = user.studentId,
                    studentLandlordRegisterId = Guid.NewGuid(),
                    studentRate = 35
                };

                var stuCore = CovertToCoreStudentRegLandl(stu);
                db.tbstudentRegisterLandlords.Add(stuCore);
                db.SaveChanges();
                return true;

            }
            catch (Exception)
            {

                return false;
            }
        }

        private tbstudentRegisterLandlord CovertToCoreStudentRegLandl(studentRegisterLandlord stu)
        {
            return new tbstudentRegisterLandlord()
            {
                dateRegistered = stu.dateRegistered,
                landlordId = stu.landlordId,
                pricePaid = stu.pricePaid,
                rateToEmployee = stu.studentRate,
                studentId = stu.studentId,
                studentLandlordRegisterId = stu.studentLandlordRegisterId
            };
        }

        private tbUser ConvertToCore(User user)
        {
            // var userCore = db.tbUsers.FirstOrDefault();
            var userCore = new tbUser();
            userCore.Surname = user.surname;
            userCore.CaretakerName = user.caretakerName;
            userCore.Cellphone = user.cellphone;
            userCore.Email = user.email;
            userCore.Name = user.Name;
            userCore.Password = user.password;
            userCore.ProfilePicture = user.profilePicture;
            userCore.SAID = user.saId;
            userCore.StudentProof = user.studentProof;
            userCore.UserId = user.userId == Guid.Empty ? Guid.NewGuid() : user.userId;
            userCore.UserType = user.userType;
            userCore.BankAccountType = user.bankType;
            return userCore;
        }

        public User login(string email, string password)
        {
            var user = db.tbUsers.FirstOrDefault(c => c.Email == email && c.Password == password);
            var userModel = new User();
            if (user != null)
            {
                userModel = ConvertToModel(user);
            }
            else
            {
                return null;
            }
            return userModel;
        }

        private User ConvertToModel(tbUser user)
        {
            return new User()
            {
                caretakerName = user.CaretakerName,
                cellphone = user.Cellphone,
                email = user.Email,
                Name = user.Name,
                password = user.Password,
                saId = user.SAID,
                surname = user.Surname,
                userId = user.UserId,
                userType = user.UserType,
                bankType = user.BankAccountType,
                profilePicture = user.ProfilePicture,
                studentProof = user.StudentProof
            };
        }

        public User UpdateUserInfo(User user)
        {

            tbUser userCore = ConvertToCore(user);
            db.Entry(userCore).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
                return ConvertToModel(userCore);
            }
            catch (Exception ex)
            {
                return new User();
            }
        }

        public bool BookThisAcc(Accommodation acc)
        {
            try
            {
                //Get user details who is booking this;
                User user = GetUserInfo(acc.userBookingId);
                User ownerOjb = GetOwnerInfo(acc.UserId);

                var newDate = DateTime.Parse("2017/06/20");

                //Save person whos booking
                var coreObjBooking = ConvertToCoreBookAcc(acc.AccommodationId, acc.userBookingId, newDate);
                db.tbBookedAccommodations.Add(coreObjBooking);
                db.SaveChanges();

                //Update booked acc table
                var bookAcc = new AccommodationBll();
                var objCore = bookAcc.ConvertToCore2(acc);

                //Get selected object picture
                string picture = GetSelectedOjectPicture(objCore.AccommodationId);
                objCore.pictures = picture;

                //SAVE OBJ
                objCore.isBooked = true;
                db.Entry(objCore).State = EntityState.Modified;
                db.SaveChanges();

                SendNotificationToUser(ownerOjb, coreObjBooking.dateToView);
                SendNotificationToStudent(user, coreObjBooking.dateToView);

                return true;

            }
            catch (Exception ex)
            {
                if (ex.Message == "Failure sending mail.")
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        private string GetSelectedOjectPicture(Guid accommodationId)
        {
            return db.tbAccommodations.AsNoTracking().FirstOrDefault(c => c.AccommodationId == accommodationId).pictures;
        }

        private void SendNotificationToStudent(User user, DateTime? dateToView)
        {
            var body = "Hello Mr/Mrs " + user.Name + " " + user.surname + ", " +
           "\nWhose email is: " + " " + user.email + " " + "and Telephone number is " +
           " " + user.cellphone + " " + "Id Number " + user.saId
           + " " + "\n, Has paid to view this house:" + "   " + "on " +
           " " + dateToView;


            // Command line argument must the the SMTP host.
            SmtpClient client = new SmtpClient();
            client.Port = 587;
            client.Host = "smtp.gmail.com";
            client.EnableSsl = true; //false;
            client.Timeout = 10000;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = false;
            client.Credentials = new System.Net.NetworkCredential("joelkapuku@gmail.com", "kaspersky12");
            MailMessage mm = new MailMessage("donotreply@domain.com", user.email, "BOOKING REQUESTED", body);
            mm.BodyEncoding = UTF8Encoding.UTF8;
            mm.DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure;
            client.Send(mm);
        }

        private void SendNotificationToUser(User user, DateTime? dateToView)
        {
            var body = "Hello Mr/Mrs " + user.Name + " " + user.surname + ", " +
            "\nWhose email is: " + " " + user.email + " " + "and Telephone number is " +
            " " + user.cellphone + " " + "Id Number " + user.saId
            + " " + "\n, Has paid to view this house:" + "   " + "on " +
            " " + dateToView;


            // Command line argument must the the SMTP host.
            SmtpClient client = new SmtpClient();
            client.Port = 587; //Incoming:  mail.cruztrading.co.za imap: port 143
            client.Host = "smtp.gmail.com";
            client.EnableSsl = true; //false;
            client.Timeout = 10000;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = false;
            client.Credentials = new System.Net.NetworkCredential("joelkapuku@gmail.com", "kaspersky12");
            MailMessage mm = new MailMessage("donotreply@domain.com", user.email, "BOOKING REQUESTED", body);
            mm.BodyEncoding = UTF8Encoding.UTF8;
            mm.DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure;
            client.Send(mm);

        }

        private User GetOwnerInfo(Guid userId)
        {
            User user = new User();
            try
            {
                tbUser userCore = db.tbUsers.AsNoTracking().FirstOrDefault(c => c.UserId == userId);
                user = ConvertToModel(userCore);
                return user;
            }
            catch (Exception)
            {

                return user;
            }
        }

        private tbBookedAccommodation ConvertToCoreBookAcc(Guid accommodationId, Guid userBookingId, DateTime bookingViewDate)
        {
            return new tbBookedAccommodation()
            {
                accommodationId = accommodationId,
                dateBooked = DateTime.Now,
                isBookedId = Guid.NewGuid(),
                studentId = userBookingId,
                dateToView = bookingViewDate

            };
        }

        private User GetUserInfo(Guid? userBookingId)
        {
            User user = new User();
            try
            {
                tbUser userCore = db.tbUsers.AsNoTracking().FirstOrDefault(c => c.UserId == userBookingId);
                user = ConvertToModel(userCore);
                return user;
            }
            catch (Exception)
            {

                return user;
            }
        }
    }
}