using System.ComponentModel.DataAnnotations;

namespace ReType.Model
{// Store all information about the user
    public class Verificationcode
    {
        [Key]
        public string Email { get; set; } //Username
        [Required]
        public string code { get; set; } //Password
        [Required]
        public DateTime Date { get; set; } //User score
    }
}
