namespace COMSTU
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("tbstudentRegisterLandlord")]
    public partial class tbstudentRegisterLandlord
    {
        [Key]
        public Guid studentLandlordRegisterId { get; set; }

        public Guid studentId { get; set; }

        public Guid landlordId { get; set; }

        public DateTime dateRegistered { get; set; }

        public decimal pricePaid { get; set; }

        public int rateToEmployee { get; set; }

        public bool isPaid { get; set; }
    }
}
