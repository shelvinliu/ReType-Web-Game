using System.ComponentModel.DataAnnotations;

namespace ReType.Dtos
{
    public class UserDetail
    {
        [Required]
        public string Username { get; set; }

        public string? Name { get; set; }

        public string? Dataofbirth { get; set; }

        public string? Gerder { get; set; }

        public string? Google { get; set; }
    }
}
