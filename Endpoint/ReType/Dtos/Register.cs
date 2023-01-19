using System.ComponentModel.DataAnnotations;

namespace ReType.Dtos
{
    public class Register
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Code { get; set; }
    }
}
