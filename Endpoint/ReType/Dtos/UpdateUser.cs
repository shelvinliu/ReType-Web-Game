using System.ComponentModel.DataAnnotations;

namespace ReType.Dtos
{
    public class UpdateUser
    {
        [Required]
        public string UserName { get; set; }
        public string? Name { get; set; }
        public string? Dataofbirth { get; set; }
        public string? Gerder { get; set; }
    }
}
