namespace COMSTU
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("tbAccommodation")]
    public partial class tbAccommodation
    {
        [Key]
        public Guid AccommodationId { get; set; }

        public Guid UserId { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [Required]
        [StringLength(50)]
        public string Description { get; set; }

        [Required]
        [StringLength(50)]
        public string Address { get; set; }

        [Required]
        public string pictures { get; set; }

        public decimal price { get; set; }

        public bool isActive { get; set; }

        public bool isBooked { get; set; }

        public bool hasPaid { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateExpired { get; set; }

        [StringLength(250)]
        public string Comment { get; set; }
    }
}
