using System.ComponentModel.DataAnnotations;

namespace ReType.Model
// Storing article information
{
    public class Article
    {
        [Key]
        public int Id { get; set; }
        public string WholeArticle { get; set; } //The whole article
        [Required]
        public string CorrectList { get; set; } //A list of correct words in the article
        [Required]
        public string WrongList { get; set; } //A list of wrong words in the article
        public string Difficulty { get; set; } //The difficulty of the article
        public string Type { get; set; } // Type of article
    }
}
