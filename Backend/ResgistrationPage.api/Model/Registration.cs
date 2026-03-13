using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ResgistrationPage.api.Model
{
    [Table("studentMaster")]
    public class Registration
    {
        [Key]
        public int studentId { get; set; }

        [Required, MaxLength(50)]
        public string studName { get; set; } = string.Empty;

        [Required, MaxLength(10)]
        public string mobileNo { get; set; } = string.Empty;

        [Required, MaxLength(50)]
        public string email { get; set; } = string.Empty;
        
        [MaxLength(50)]
        public string city { get; set; } = string.Empty;

        [MaxLength(50)]
        public string state { get; set; } = string.Empty;

        [MaxLength(6)]
        public string pincode { get; set; } = string.Empty;

        [MaxLength(2000)]
        public string addressLine1 { get; set; } = string.Empty;

        [MaxLength(2000)]
        public string addressLine2 { get; set; } = string.Empty;
    }

}
    