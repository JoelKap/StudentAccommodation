using COMSTU2.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace COMSTU2.BLL
{
    public class AccommodationBll
    {
        COMSTUContext db = new COMSTUContext();

        public List<Accommodation> GetAccommodations()
        {         
            List<Accommodation> accommodations = new List<Accommodation>();
            var dateRange = DateTime.Now;
            DateTime newDate = dateRange.AddDays(30);
            var accObjs = db.TbAccommodation.ToList().Where(c => c.DateCreated <= newDate && c.IsActive == true).Take(15).ToList();

            foreach (var item in accObjs)
            {
                accommodations.Add(new Accommodation()
                {
                    AccommodationId = item.AccommodationId,
                    Address = item.Address,
                    Comment = item.Comment,
                    date = item.DateCreated,
                    DateExpired = item.DateExpired,
                    Description = item.Description,
                    hasPaid = item.HasPaid,
                    isActive = item.IsActive,
                    isBooked = item.IsBooked,
                    Name = item.Name,
                    pictures = item.Pictures,
                    price = item.Price,
                    UserId = item.UserId
                });
            }
            return accommodations;
        }
        public bool CreateUserAccommodation(Accommodation userAcc)
        {
            try
            {

                //ConvertToCore OBJ
                var accObj = ConvertToCore(userAcc);

                //Save
                db.TbAccommodation.Add(accObj);
                db.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {

                return false;
            }
        }

        internal bool activateAccommodation(Guid accId)
        {
            try
            {
                TbAccommodation acc = db.TbAccommodation.FirstOrDefault(c => c.AccommodationId == accId);
                acc.IsActive = true;
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
                var accs = db.TbAccommodation.AsNoTracking().Where(c => c.IsActive == false).ToList();
                List<AdminAccommodationManagement> administratorAccs = new List<AdminAccommodationManagement>();
                foreach (var acc in accs)
                {
                    administratorAccs.Add(new AdminAccommodationManagement()
                    {
                        AccommodationId = acc.AccommodationId,
                        caretakerName = db.TbUser.AsNoTracking().FirstOrDefault(c => c.UserId == acc.UserId).CaretakerName.ToString(),
                        cellphone = db.TbUser.AsNoTracking().FirstOrDefault(c => c.UserId == acc.UserId).Cellphone.ToString(),
                        CreatedDate = acc.DateCreated,
                        DateExpired = acc.DateExpired,
                        email = db.TbUser.AsNoTracking().FirstOrDefault(c => c.UserId == acc.UserId).Email.ToString(),
                        isActive = acc.IsActive,
                        Location = acc.Name,
                        Name = db.TbUser.AsNoTracking().FirstOrDefault(c => c.UserId == acc.UserId).Name.ToString(),
                        surname = db.TbUser.AsNoTracking().FirstOrDefault(c => c.UserId == acc.UserId).Surname.ToString(),
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
        public TbAccommodation ConvertToCore2(Accommodation userAcc)
        {

            return new TbAccommodation()
            {
                AccommodationId = userAcc.AccommodationId,
                Address = userAcc.Address,
                Comment = userAcc.Comment,
                DateCreated = userAcc.DateCreated,
                DateExpired = userAcc.DateExpired,
                Description = userAcc.Description,
                HasPaid = userAcc.hasPaid,
                IsActive = userAcc.isActive,
                IsBooked = userAcc.isBooked,
                Name = userAcc.Name,
                Pictures = userAcc.pictures,
                Price = userAcc.price,
                UserId = userAcc.UserId

            };
        }
        public TbAccommodation ConvertToCore(Accommodation userAcc)
        {
            var x = DateTime.Now;
            DateTime expiryDate = x.AddDays(30);
            return new TbAccommodation()
            {
                AccommodationId = Guid.NewGuid(),
                Address = userAcc.Address,
                Comment = userAcc.Comment,
                DateCreated = DateTime.Now,
                DateExpired = expiryDate,
                Description = userAcc.Description,
                HasPaid = userAcc.hasPaid,
                IsActive = userAcc.isMakeActiveNow == "Yes" ? true : false,
                IsBooked = userAcc.isBooked,
                Name = userAcc.Name,
                Pictures = userAcc.pictures,
                Price = userAcc.price,
                UserId = userAcc.UserId

            };
        }
    }
}
