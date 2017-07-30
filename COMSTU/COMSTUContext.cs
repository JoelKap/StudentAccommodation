namespace COMSTU
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class COMSTUContext : DbContext
    {
        public COMSTUContext()
            : base("name=COMSTUContext")
        {
        }

        public virtual DbSet<sysdiagram> sysdiagrams { get; set; }
        public virtual DbSet<tbAccommodation> tbAccommodations { get; set; }
        public virtual DbSet<tbBookedAccommodation> tbBookedAccommodations { get; set; }
        public virtual DbSet<tbstudentRegisterLandlord> tbstudentRegisterLandlords { get; set; }
        public virtual DbSet<tbUser> tbUsers { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<tbAccommodation>()
                .Property(e => e.price)
                .HasPrecision(18, 0);

            modelBuilder.Entity<tbUser>()
                .Property(e => e.CaretakerName)
                .IsUnicode(false);
        }
    }
}
