using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using todolist.Helpers;
using todolist.Models;

namespace todolist.Controllers{
    [Route("api/[controller]")]
    [ApiController]
    public class TodosController : ControllerBase
    {
        private readonly DataContext _dbContext;

        public TodosController(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetTodos()
        {
            return Ok(await _dbContext.Todos.ToListAsync());
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetTodo([FromRoute] int id)
        {
            var selectedTodo = await _dbContext.Todos.FindAsync(id);
            if (selectedTodo != null) return Ok(selectedTodo);
            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> AddTodo(Todo todo)
        {
            _dbContext.Todos.Add(todo);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction("GetTodos", new { id = todo.Id }, todo);
        }
        

        [HttpPut]
        [Route("edit/{id:int}")]
        public async Task<IActionResult> UpdateTodo([FromRoute] int id, Todo todo)
        {
            var selectedTodo = await _dbContext.Todos.FindAsync(id);

            if (selectedTodo != null)
            {
                selectedTodo.Title = todo.Title;
                selectedTodo.IsDone = todo.IsDone;
                
                await _dbContext.SaveChangesAsync();
                return Ok(await _dbContext.Todos.ToListAsync());
            }

            return NotFound();
        }
        [Route("mark/{id:int}")]
        public async Task<IActionResult> MarkTodo([FromRoute] int id, Todo todo)
        {
            var selectedTodo = await _dbContext.Todos.FindAsync(id);

            if (selectedTodo != null)
            {
                
                selectedTodo.IsDone = todo.IsDone;
                
                await _dbContext.SaveChangesAsync();
                return Ok(await _dbContext.Todos.ToListAsync());
            }

            return NotFound();
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteTodo([FromRoute] int id)
        {
            var selectedTodo = await _dbContext.Todos.FindAsync(id);
            if (selectedTodo == null) return NotFound();
            _dbContext.Todos.Remove(selectedTodo);
            await _dbContext.SaveChangesAsync();
            return Ok(await _dbContext.Todos.ToListAsync());

        }
    }
}