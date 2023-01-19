using Microsoft.EntityFrameworkCore;
using ReType.Model;

namespace ReType.Data
{
    public class WebAPIDBContext : DbContext
    {
        public WebAPIDBContext(DbContextOptions<WebAPIDBContext> options) : base(options) { }
        public DbSet<Article> Article { get; set; }

        public DbSet<User> User { get; set; }

        public DbSet<Verificationcode> Verificationcode { get; set; }



        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseSqlite("Data Source=MyDatabase.sqlite");
        //}
    }
}
