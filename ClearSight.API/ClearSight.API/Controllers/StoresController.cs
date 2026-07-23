using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ClearSight.API.Models;

[Route("api/[controller]")]
[ApiController]
public class StoresController : ControllerBase
{
    private readonly FreeSqlDb0690774Context _context;
    public StoresController(FreeSqlDb0690774Context context)
    {
        _context = context;
    }

    // GET: api/Store
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Store>>> GetStore()
    {
        return await _context.Stores.ToListAsync();
    }

    // GET: api/Store/5
    [HttpGet("{storeid}")]
    public async Task<ActionResult<Store>> GetStore(int storeid)
    {
        var store = await _context.Stores.FindAsync(storeid);

        if (store == null)
        {
            return NotFound();
        }

        return store;
    }

    // PUT: api/Store/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{storeid}")]
    public async Task<IActionResult> PutStore(int? storeid, Store store)
    {
        if (storeid != store.StoreId)
        {
            return BadRequest();
        }

        _context.Entry(store).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!StoreExists(storeid))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // POST: api/Store
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<Store>> PostStore(Store store)
    {
        _context.Stores.Add(store);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetStore", new { storeid = store.StoreId }, store);
    }

    // DELETE: api/Store/5
    [HttpDelete("{storeid}")]
    public async Task<IActionResult> DeleteStore(int? storeid)
    {
        var store = await _context.Stores.FindAsync(storeid);
        if (store == null)
        {
            return NotFound();
        }

        _context.Stores.Remove(store);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool StoreExists(int? storeid)
    {
        return _context.Stores.Any(e => e.StoreId == storeid);
    }
}
