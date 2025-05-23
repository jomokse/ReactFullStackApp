using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Data;

var builder = WebApplication.CreateBuilder(args);

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

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=dogfacts.db"));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors();

app.UseHttpsRedirection();

app.MapGet("/dogfacts", async (AppDbContext db) =>
{
    return await db.DogFacts.ToListAsync();
});

// Add new fact to the SQLite DB.
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

// Delete fact from the SQLite DB.
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

// Edit an existing fact in the SQLite DB.
app.MapPut("/dogfacts/{id}", async (AppDbContext db, int id, DogFact updatedFact) =>
{
    var fact = await db.DogFacts.FindAsync(id);
    if (fact is null) return Results.NotFound();

    fact.Text = updatedFact.Text;
    await db.SaveChangesAsync();

    return Results.Ok(fact);
});

app.Run();