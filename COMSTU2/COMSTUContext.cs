using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace COMSTU2
{
    public partial class COMSTUContext : DbContext
    {
        public static string ConnectionString { get; set; }
        public virtual DbSet<TbAccommodation> TbAccommodation { get; set; }
        public virtual DbSet<TbBookedAccommodation> TbBookedAccommodation { get; set; }
        public virtual DbSet<TbUser> TbUser { get; set; }
        public virtual DbSet<TbstudentRegisterLandlord> TbstudentRegisterLandlord { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            #warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
            optionsBuilder.UseSqlServer(@"data source=.;initial catalog=COMSTU;integrated security=True;multipleactiveresultsets=True;application name=EntityFramework");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TbAccommodation>(entity =>
            {
                entity.HasKey(e => e.AccommodationId)
                    .HasName("PK_tbAccommodation");

                entity.ToTable("tbAccommodation");

                entity.Property(e => e.AccommodationId).ValueGeneratedNever();

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Comment).HasMaxLength(250);

                entity.Property(e => e.DateCreated).HasColumnType("datetime");

                entity.Property(e => e.DateExpired).HasColumnType("datetime");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.HasPaid).HasColumnName("hasPaid");

                entity.Property(e => e.IsActive).HasColumnName("isActive");

                entity.Property(e => e.IsBooked).HasColumnName("isBooked");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.PictureRoom1).HasColumnName("pictureRoom1");

                entity.Property(e => e.PictureRoom2).HasColumnName("pictureRoom2");

                entity.Property(e => e.PictureRoom3).HasColumnName("pictureRoom3");

                entity.Property(e => e.Pictures)
                    .IsRequired()
                    .HasColumnName("pictures");

                entity.Property(e => e.Price)
                    .HasColumnName("price")
                    .HasColumnType("decimal");
            });

            modelBuilder.Entity<TbBookedAccommodation>(entity =>
            {
                entity.HasKey(e => e.IsBookedId)
                    .HasName("PK_tbBookedAccommodation_1");

                entity.ToTable("tbBookedAccommodation");

                entity.Property(e => e.IsBookedId)
                    .HasColumnName("isBookedId")
                    .ValueGeneratedNever();

                entity.Property(e => e.AccommodationId).HasColumnName("accommodationId");

                entity.Property(e => e.DateBooked)
                    .HasColumnName("dateBooked")
                    .HasColumnType("datetime");

                entity.Property(e => e.DateToView)
                    .HasColumnName("dateToView")
                    .HasColumnType("datetime");

                entity.Property(e => e.StudentId).HasColumnName("studentId");
            });

            modelBuilder.Entity<TbUser>(entity =>
            {
                entity.HasKey(e => e.UserId)
                    .HasName("PK_tbUser");

                entity.ToTable("tbUser");

                entity.Property(e => e.UserId).ValueGeneratedNever();

                entity.Property(e => e.BankAccountType).HasMaxLength(50);

                entity.Property(e => e.CaretakerName).HasColumnType("varchar(50)");

                entity.Property(e => e.Cellphone)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Said)
                    .IsRequired()
                    .HasColumnName("SAID")
                    .HasMaxLength(50);

                entity.Property(e => e.Surname)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.UserType)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<TbstudentRegisterLandlord>(entity =>
            {
                entity.HasKey(e => e.StudentLandlordRegisterId)
                    .HasName("PK_tbstudentRegisterLandlord");

                entity.ToTable("tbstudentRegisterLandlord");

                entity.Property(e => e.StudentLandlordRegisterId)
                    .HasColumnName("studentLandlordRegisterId")
                    .ValueGeneratedNever();

                entity.Property(e => e.DateRegistered)
                    .HasColumnName("dateRegistered")
                    .HasColumnType("datetime");

                entity.Property(e => e.IsPaid)
                    .HasColumnName("isPaid")
                    .HasDefaultValueSql("0");

                entity.Property(e => e.LandlordId).HasColumnName("landlordId");

                entity.Property(e => e.PricePaid)
                    .HasColumnName("pricePaid")
                    .HasColumnType("decimal");

                entity.Property(e => e.RateToEmployee).HasColumnName("rateToEmployee");

                entity.Property(e => e.StudentId).HasColumnName("studentId");
            });
        }
    }
}