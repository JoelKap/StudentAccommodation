using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using COMSTU.Models;
using System.Data.Entity;

namespace COMSTU.BLL
{
    public class AccommodationBll
    {
        private COMSTUContext db = new COMSTUContext();
        public List<Accommodation> GetAccommodations()
        {
            List<Accommodation> accommodations = new List<Accommodation>();
            var dateRange = DateTime.Now;
            DateTime newDate = dateRange.AddDays(30);
            var accObjs = db.tbAccommodations.ToList()
                                            .Where(c => c.DateCreated <= newDate && c.isActive == true)
                                            .Take(15).ToList();

            foreach (var item in accObjs)
            {
                accommodations.Add(new Accommodation()
                {
                    AccommodationId = item.AccommodationId,
                    Address = item.Address,
                    Comment = item.Comment,
                    DateCreated = item.DateCreated,
                    DateExpired = item.DateExpired,
                    Description = item.Description,
                    hasPaid = item.hasPaid,
                    isActive = item.isActive,
                    isBooked = item.isBooked,
                    Name = item.Name,
                    pictures = item.pictures,
                    price = item.price,
                    UserId = item.UserId
                });
            }
            return accommodations;
        }

        internal bool activateAccommodation(Guid accId)
        {
            try
            {
                tbAccommodation acc = db.tbAccommodations.FirstOrDefault(c => c.AccommodationId == accId);
                acc.isActive = true;
                db.Entry(acc).State = EntityState.Modified;
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {

                return false;
            }

        }

        internal List<AdminAccommodationManagement> getAdminAccommodations()
        {
            try
            {
                var accs = db.tbAccommodations.AsNoTracking().Where(c => c.isActive == false).ToList();
                List<AdminAccommodationManagement> administratorAccs = new List<AdminAccommodationManagement>();
                foreach (var acc in accs)
                {
                    administratorAccs.Add(new AdminAccommodationManagement()
                    {
                        AccommodationId = acc.AccommodationId,
                        caretakerName = db.tbUsers.FirstOrDefault(c => c.UserId == acc.UserId).CaretakerName.ToString(),
                        cellphone = db.tbUsers.FirstOrDefault(c => c.UserId == acc.UserId).Cellphone.ToString(),
                        DateCreated = acc.DateCreated,
                        DateExpired = acc.DateExpired,
                        email = db.tbUsers.FirstOrDefault(c => c.UserId == acc.UserId).Email.ToString(),
                        isActive = acc.isActive,
                        Location = acc.Name,
                        Name = db.tbUsers.FirstOrDefault(c => c.UserId == acc.UserId).Name.ToString(),
                        surname = db.tbUsers.FirstOrDefault(c => c.UserId == acc.UserId).Surname.ToString(),
                        houseType = acc.Description

                    });
                }

                return administratorAccs;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public bool CreateUserAccommodation(Accommodation userAcc)
        {
            try
            {
                
                //ConvertToCore OBJ
                var accObj = ConvertToCore(userAcc);
                
                //Save
                db.tbAccommodations.Add(accObj);
                db.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {

                return false;
            }
        }

        public tbAccommodation ConvertToCore(Accommodation userAcc)
        {
            var x = DateTime.Now;
            DateTime expiryDate = x.AddDays(30);
            return new tbAccommodation()
            {
                AccommodationId = Guid.NewGuid(),
                Address = userAcc.Address,
                Comment = userAcc.Comment,
                DateCreated = DateTime.Now,
                DateExpired = expiryDate,
                Description = userAcc.Description,
                hasPaid = userAcc.hasPaid,
                isActive = userAcc.isMakeActiveNow == "Yes" ? true : false,
                isBooked = userAcc.isBooked,
                Name = userAcc.Name,
                pictures = userAcc.pictures,
                price = userAcc.price,
                UserId = userAcc.UserId

            };
        }

        public tbAccommodation ConvertToCore2(Accommodation userAcc)
        {

            return new tbAccommodation()
            {
                AccommodationId = userAcc.AccommodationId,
                Address = userAcc.Address,
                Comment = userAcc.Comment,
                DateCreated = userAcc.DateCreated,
                DateExpired = userAcc.DateExpired,
                Description = userAcc.Description,
                hasPaid = userAcc.hasPaid,
                isActive = userAcc.isActive,
                isBooked = userAcc.isBooked,
                Name = userAcc.Name,
                pictures = userAcc.pictures,
                price = userAcc.price,
                UserId = userAcc.UserId

            };
        }
    }
}