using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class DogFact
    {
        public int Id { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(50)]
        public string Text { get; set; } = string.Empty;
    }
}