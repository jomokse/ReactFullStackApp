// DogFact.cs
// This class represents very simple single dog fact entity for the database.
// It is used by Entity Framework Core to map to the DogFacts table.

using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    // DogFact entity: represents a row in the DogFacts table
    public class DogFact
    {
        // Primary key for the dog fact (auto-incremented by the database)
        public int Id { get; set; }

        // The text of the dog fact
        // [Required]: must not be null
        // [MinLength(1)]: must have at least 1 character
        // [MaxLength(50)]: must have at most 50 characters
        [Required]
        [MinLength(1)]
        [MaxLength(50)]
        public string Text { get; set; } = string.Empty;
    }
}