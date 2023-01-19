using System.ComponentModel.DataAnnotations;

namespace ReType.Dtos
{
    public class Verifycode
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Code { get; set; }
    }
}
