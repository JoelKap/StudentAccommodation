namespace COMSTU
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("tbBookedAccommodation")]
    public partial class tbBookedAccommodation
    {
        [Key]
        public Guid isBookedId { get; set; }

        public Guid studentId { get; set; }

        public Guid accommodationId { get; set; }

        public DateTime dateBooked { get; set; }

        public DateTime? dateToView { get; set; }
    }
}
