using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class ApplicationDBContext : DbContext
{
    public ApplicationDBContext(DbContextOptions dbContextOptions)
        : base(dbContextOptions) {}
    
    public DbSet<User> Users { get; set; }
    public DbSet<Cuisine> Cuisines { get; set; }
    public DbSet<Ingredient> Ingredients { get; set; }
    public DbSet<Recipe> Recipes { get; set; }
    public DbSet<Comment> Comments { get; set; }
    public DbSet<RecipeNote> RecipeNotes { get; set; }
    public DbSet<RecipeInstructionStep> RecipeInstructionSteps { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<RecipeInstructionStep>()
            .HasIndex(r => r.Step)
            .IsUnique();
        
        modelBuilder.Entity<User>()
            .HasMany(u => u.Recipes)
            .WithOne(r => r.User)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<User>()
            .HasMany(u => u.Comments)
            .WithOne(c => c.User)
            .OnDelete(DeleteBehavior.Cascade);

        // Настройка каскадного удаления для Ingredients
        modelBuilder.Entity<Ingredient>()
            .HasOne(i => i.Recipe)
            .WithMany(r => r.Ingredients)
            .OnDelete(DeleteBehavior.Cascade);

        // Настройка каскадного удаления для Recipes
        modelBuilder.Entity<Recipe>()
            .HasMany(r => r.Comments)
            .WithOne(c => c.Recipe)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Recipe>()
            .HasMany(r => r.RecipeNotes)
            .WithOne(rn => rn.Recipe)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Recipe>()
            .HasMany(r => r.InstructionSteps)
            .WithOne(ris => ris.Recipe)
            .OnDelete(DeleteBehavior.Cascade);
        
        modelBuilder.Entity<Comment>()
            .HasOne(c => c.User)
            .WithMany(u => u.Comments)
            .HasForeignKey(c => c.UserId)
            .OnDelete(DeleteBehavior.NoAction); // Или DeleteBehavior.Restrict для более строгого контроля
        
    }
}