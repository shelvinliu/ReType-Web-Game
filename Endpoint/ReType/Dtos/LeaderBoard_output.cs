using System.ComponentModel.DataAnnotations;

namespace ReType.Dtos
{
    public class LeaderBoard_output
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public int Score { get; set; }
        [Required]
        public int Index { get; set; }
    }
}
