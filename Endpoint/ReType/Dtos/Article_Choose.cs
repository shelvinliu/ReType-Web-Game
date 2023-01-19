using System.ComponentModel.DataAnnotations;

namespace ReType.Dtos
{
    public class Article_Choose
    {
        [Required]
        public string Difficulty { get; set; }
        [Required]
        public string Type { get; set; }
    }
}
