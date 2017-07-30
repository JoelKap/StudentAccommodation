using COMSTU2.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MimeKit;
using MailKit.Security;

namespace COMSTU2.BLL
{
    public class UserBll
    {
        COMSTUContext db = new COMSTUContext();
        public User login(string email, string password)
        {

            var user = db.TbUser.FirstOrDefault(c => c.Email == email && c.Password == password);
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
        internal bool studentRegisterUser(User user)
        {
            try
            {
                user.userId = Guid.NewGuid();
                var userCore = ConvertToCore(user);

                //Save User
                db.TbUser.Add(userCore);
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
                db.TbstudentRegisterLandlord.Add(stuCore);
                db.SaveChanges();
                return true;

            }
            catch (Exception)
            {

                return false;
            }
        }
        public User UpdateUserInfo(User user)
        {

            TbUser userCore = ConvertToCore(user);
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
        private User ConvertToModel(TbUser user)
        {
            return new User()
            {
                caretakerName = user.CaretakerName,
                cellphone = user.Cellphone,
                email = user.Email,
                Name = user.Name,
                password = user.Password,
                saId = user.Said,
                surname = user.Surname,
                userId = user.UserId,
                userType = user.UserType,
                bankType = user.BankAccountType,
                profilePicture = user.ProfilePicture,
                studentProof = user.StudentProof
            };
        }
        internal UserAccountResponse getUserAccount(Guid userId)
        {
            try
            {
                var returnUserResponse = new UserAccountResponse();
                var userAccObj = new TbstudentRegisterLandlord();
                List<TbstudentRegisterLandlord> userAcc = db.TbstudentRegisterLandlord.Where(c => c.StudentId == userId).ToList();
                decimal userAmount = 0;
                foreach (var amt in userAcc)
                {
                    userAmount += amt.RateToEmployee;
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
                db.TbBookedAccommodation.Add(coreObjBooking);
                db.SaveChanges();

                //Update booked acc table
                var bookAcc = new AccommodationBll();
                var objCore = bookAcc.ConvertToCore2(acc);

                //Get selected object picture
                string picture = GetSelectedOjectPicture(objCore.AccommodationId);
                objCore.Pictures = picture;

                //SAVE OBJ
                objCore.IsBooked = true;
                db.Entry(objCore).State = EntityState.Modified;
                db.SaveChanges();

                SendNotificationToUser(ownerOjb, coreObjBooking.DateToView);
                SendNotificationToStudent(user, coreObjBooking.DateToView);

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
        internal List<User> GetUsersToPay()
        {
            var coreUsers = db.TbstudentRegisterLandlord.AsNoTracking().Where(c => c.IsPaid == false).GroupBy(c => c.StudentId, (key, c) => c.FirstOrDefault()).ToList();

            List<User> newUsers = new List<User>();
            foreach (var user in coreUsers)
            {
                //Get User if they have registered Landlord
                TbUser studentObj = db.TbUser.AsNoTracking().FirstOrDefault(c => c.UserId == user.StudentId);
                var studentLandLords = coreUsers.Where(c => c.StudentId == studentObj.UserId).GroupBy(c => c.StudentId == studentObj.UserId).ToList();
                foreach (var student in studentLandLords)
                {
                    newUsers.Add(new User()
                    {
                        Name = studentObj.Name,
                        surname = studentObj.Surname,
                        cellphone = studentObj.Cellphone,
                        numberOfUserRegistered = db.TbstudentRegisterLandlord.AsNoTracking().Count(c => c.StudentId == studentObj.UserId),
                        balance = 'R' + ' ' + db.TbstudentRegisterLandlord.AsNoTracking().Where(c => c.StudentId == studentObj.UserId).Sum(c => c.RateToEmployee),
                        shouldBePaid = studentLandLords.Count() > 12 ? "Yes" : "No",
                        studentId = studentObj.UserId,
                        studentLandlordRegisterIds = db.TbstudentRegisterLandlord.Where(c => c.StudentId == studentObj.UserId).Select(c => c.StudentLandlordRegisterId).ToList(),
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
                var userCore = db.TbstudentRegisterLandlord.FirstOrDefault(c => c.StudentLandlordRegisterId == item);
                userCore.IsPaid = true;

                db.Entry(userCore).State = EntityState.Modified;
                db.SaveChanges();
            };
            SendNotificationToStudentForPayment(user);
            return true;
        }
        public bool registerUser(User user)
        {
            try
            {
                var coreUser = ConvertToCore(user);

                //Validate if user email and or cellphone already exist

                var userNumberExist = db.TbUser.FirstOrDefault(c => c.Cellphone == user.cellphone);
                if (userNumberExist == null)
                {
                    var isUserEmailExist = db.TbUser.FirstOrDefault(c => c.Email == user.email);
                    if (isUserEmailExist == null)
                    {
                        db.TbUser.Add(coreUser);
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
        private void SendNotificationToStudentForPayment(User user)
        {
            var body = "Hello Mr/Mrs " + user.Name + " " + user.surname + ", " +
           "\nWhose email is: " + " " + user.email + " " + "and Telephone number is " +
           " " + user.cellphone + " " + "Id Number " + user.saId
           + " " + "\n, Your payment is being processed by COMSTU administrator and it will paid into your account soon";


            // Command line argument must the the SMTP host.
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress("COMSTU", "joelkapuku@gmail.com"));
            emailMessage.To.Add(new MailboxAddress("", user.email));
            emailMessage.Subject = "BOOKING REQUESTED";
            emailMessage.Body = new TextPart("plain") { Text = body };

            using (var client = new SmtpClient())
            {
                client.LocalDomain = "donotreply.com";
                client.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.None).ConfigureAwait(false);
                client.SendAsync(emailMessage).ConfigureAwait(false);
                client.DisconnectAsync(true).ConfigureAwait(false);
            }
        }
        public void SendNotificationToStudent(User user, DateTime? dateToView)
        {
            var body = "Hello Mr/Mrs " + user.Name + " " + user.surname + ", " +
                          "\nWhose email is: " + " " + user.email + " " + "and Telephone number is " +
                          " " + user.cellphone + " " + "Id Number " + user.saId
                          + " " + "\n, Has paid to view this house:" + "   " + "on " +
                          " " + dateToView;

            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress("COMSTU", "joelkapuku@gmail.com"));
            emailMessage.To.Add(new MailboxAddress("", user.email));
            emailMessage.Subject = "BOOKING REQUESTED";
            emailMessage.Body = new TextPart("plain") { Text = body };

            using (var client = new SmtpClient())
            {
                client.LocalDomain = "donotreply.com";
                client.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.None).ConfigureAwait(false);
                client.SendAsync(emailMessage).ConfigureAwait(false);
                client.DisconnectAsync(true).ConfigureAwait(false);
            }
        }
        public void SendNotificationToUser(User user, DateTime? dateToView)
        {
            var body = "Hello Mr/Mrs " + user.Name + " " + user.surname + ", " +
            "\nWhose email is: " + " " + user.email + " " + "and Telephone number is " +
            " " + user.cellphone + " " + "Id Number " + user.saId
            + " " + "\n, Has paid to view this house:" + "   " + "on " +
            " " + dateToView;

            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress("COMSTU", "joelkapuku@gmail.com"));
            emailMessage.To.Add(new MailboxAddress("", user.email));
            emailMessage.Subject = "BOOKING REQUESTED";
            emailMessage.Body = new TextPart("plain") { Text = body };

            using (var client = new SmtpClient())
            {
                client.LocalDomain = "donotreply.com";
                client.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.None).ConfigureAwait(false);
                client.SendAsync(emailMessage).ConfigureAwait(false);
                client.DisconnectAsync(true).ConfigureAwait(false);
            }
        }       
        private string GetSelectedOjectPicture(Guid accommodationId)
        {
            return db.TbAccommodation.AsNoTracking().FirstOrDefault(c => c.AccommodationId == accommodationId).Pictures;
        }
        private TbBookedAccommodation ConvertToCoreBookAcc(Guid accommodationId, Guid userBookingId, DateTime bookingViewDate)
        {
            return new TbBookedAccommodation()
            {
                AccommodationId = accommodationId,
                DateBooked = DateTime.Now,
                IsBookedId = Guid.NewGuid(),
                StudentId = userBookingId,
                DateToView = bookingViewDate

            };
        }
        private User GetOwnerInfo(Guid userId)
        {
            User user = new User();
            try
            {
                TbUser userCore = db.TbUser.AsNoTracking().FirstOrDefault(c => c.UserId == userId);
                user = ConvertToModel(userCore);
                return user;
            }
            catch (Exception)
            {

                return user;
            }
        }
        private User GetUserInfo(Guid? userBookingId)
        {
            User user = new User();
            try
            {
                TbUser userCore = db.TbUser.AsNoTracking().FirstOrDefault(c => c.UserId == userBookingId);
                user = ConvertToModel(userCore);
                return user;
            }
            catch (Exception)
            {

                return user;
            }
        }
        private TbUser ConvertToCore(User user)
        {
            // var userCore = db.tbUsers.FirstOrDefault();
            var userCore = new TbUser();
            userCore.Surname = user.surname;
            userCore.CaretakerName = user.caretakerName;
            userCore.Cellphone = user.cellphone;
            userCore.Email = user.email;
            userCore.Name = user.Name;
            userCore.Password = user.password;
            userCore.ProfilePicture = user.profilePicture;
            userCore.Said = user.saId;
            userCore.StudentProof = user.studentProof;
            userCore.UserId = user.userId == Guid.Empty ? Guid.NewGuid() : user.userId;
            userCore.UserType = user.userType;
            userCore.BankAccountType = user.bankType;
            return userCore;
        }
        private TbstudentRegisterLandlord CovertToCoreStudentRegLandl(studentRegisterLandlord stu)
        {
            return new TbstudentRegisterLandlord()
            {
                DateRegistered = stu.dateRegistered,
                LandlordId = stu.landlordId,
                PricePaid = stu.pricePaid,
                RateToEmployee = stu.studentRate,
                StudentId = stu.studentId,
                StudentLandlordRegisterId = stu.studentLandlordRegisterId
            };
        }


    }
}
