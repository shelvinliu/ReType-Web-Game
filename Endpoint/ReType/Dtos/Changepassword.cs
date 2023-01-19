using System.ComponentModel.DataAnnotations;

namespace ReType.Dtos
{
    public class Changepassword
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
