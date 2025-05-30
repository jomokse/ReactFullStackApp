// Program.cs
// Entry point for the ASP.NET Core Web API server.
// Configures services, middleware, and API endpoints for the Dog Facts application.

using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Data;

var builder = WebApplication.CreateBuilder(args);

// Configure CORS (Cross-Origin Resource Sharing) to allow requests from the React frontend (localhost:5173)
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173") // The React address
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// Register the EF Core database context with SQLite as the provider
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=dogfacts.db"));

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Enable CORS middleware
app.UseCors();

// Redirect HTTP requests to HTTPS
app.UseHttpsRedirection();

// Return all dog facts from the database (cRud - Read)
app.MapGet("/dogfacts", async (AppDbContext db) =>
{
    return await db.DogFacts.ToListAsync();
});

// Add new dog fact to the database (Crud - Create)
app.MapPost("/dogfacts", async (AppDbContext db, DogFact newFact) =>
{
    if (string.IsNullOrWhiteSpace(newFact.Text))
    {
        return Results.BadRequest("The fact cannot be empty.");
    }

    db.DogFacts.Add(newFact);
    await db.SaveChangesAsync();
    return Results.Created($"/dogfacts/{newFact.Id}", newFact);
});

// Delete a dog fact by id (cruD - Delete)
app.MapDelete("/dogfacts/{id}", async (AppDbContext db, int id) =>
{
    var fact = await db.DogFacts.FindAsync(id);
    if (fact is null)
    {
        return Results.NotFound();
    }

    db.DogFacts.Remove(fact);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

// Update a dog fact by id (crUd - Update)
app.MapPut("/dogfacts/{id}", async (AppDbContext db, int id, DogFact updatedFact) =>
{
    var fact = await db.DogFacts.FindAsync(id);
    if (fact is null) return Results.NotFound();

    fact.Text = updatedFact.Text;
    await db.SaveChangesAsync();

    return Results.Ok(fact);
});

// Start the web application
app.Run();