using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class ApplicationDBContext : DbContext
{
    public ApplicationDBContext(DbContextOptions dbContextOptions)
        : base(dbContextOptions) {}

    public DbSet<User> Users { get; set; }
    public DbSet<Comment> Comments { get; set; }
}