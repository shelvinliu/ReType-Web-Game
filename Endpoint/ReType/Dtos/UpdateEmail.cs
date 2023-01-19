using System.ComponentModel.DataAnnotations;

namespace ReType.Dtos
{
    public class UpdateEmail
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Email { get; set; }
        public string Code { get; set; }
    }
}
