using System.ComponentModel.DataAnnotations;

namespace ReType.Dtos
{
    public class VaildGoogle
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string ID { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
