namespace COMSTU
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("tbUser")]
    public partial class tbUser
    {
        [Key]
        public Guid UserId { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [Required]
        [StringLength(50)]
        public string Surname { get; set; }

        [Required]
        [StringLength(50)]
        public string Cellphone { get; set; }

        [Required]
        [StringLength(50)]
        public string SAID { get; set; }

        [Required]
        [StringLength(50)]
        public string Email { get; set; }

        [Required]
        [StringLength(50)]
        public string Password { get; set; }

        public string ProfilePicture { get; set; }

        public string StudentProof { get; set; }

        [Required]
        [StringLength(50)]
        public string UserType { get; set; }

        [StringLength(50)]
        public string BankAccountType { get; set; }

        [StringLength(50)]
        public string CaretakerName { get; set; }
    }
}
