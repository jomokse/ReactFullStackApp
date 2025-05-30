// AppDbContext.cs
// This class defines the Entity Framework Core database context for the application.
// It manages the connection to the database and provides access to the DogFacts table.

using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Data
{
    // The application's database context, derived from EF Core's DbContext
    public class AppDbContext : DbContext
    {
        // Constructor: receives options (like connection string) from dependency injection
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        // DbSet representing the DogFacts table in the database
        // Allows querying and saving DogFact entities
        public DbSet<DogFact> DogFacts => Set<DogFact>();
    }
}
