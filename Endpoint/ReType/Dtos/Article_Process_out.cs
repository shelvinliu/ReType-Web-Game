using System.ComponentModel.DataAnnotations;

namespace ReType.Dtos
{
    public class Article_Process_out
    {
        [Required]
        public int ArticleID { get; set; }
        [Required]
        public string Article { get; set; }
        [Required]
        public string Correct { get; set; }
        [Required]
        public string ArticleDisp { get; set; }
        [Required]
        public int ErrorRemain { get; set; }
        public string? AlreadyCorrect { get; set; }
        public int? Score { get; set; }
        public string hint { get; set; }
        public int ScoreChange { get; set; }
    }
}
