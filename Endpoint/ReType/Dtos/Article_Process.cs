using System.ComponentModel.DataAnnotations;

namespace ReType.Dtos
{
    public class Article_Process
    {
        [Required]
        public int ArticleID { get; set; }
        [Required]
        public string Article { get; set; }
        [Required]
        public string Input { get; set; }
        public string? AlreadyCorrect { get; set; }
        public int Enter { get; set; }
        public int hint { get; set; }

    }
}
