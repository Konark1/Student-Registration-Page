using Microsoft.EntityFrameworkCore;

namespace ResgistrationPage.api.Model
{
    public class RegistrationDbContext:DbContext
    {
        public RegistrationDbContext(DbContextOptions<RegistrationDbContext> options) : base(options)
        {
        }
        public DbSet<Registration> Registrations { get; set; }
    }
}
