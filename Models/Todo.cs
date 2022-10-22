using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace todolist.Models;

public class Todo
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int Id { get; set; }
    
    public string? Title { get; set; }
    public bool IsDone { get; set; }
    public DateTime DueDate { get; set; }
    
}