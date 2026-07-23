using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ClearSight.API.Models;

[Route("api/[controller]")]
[ApiController]
public class InventoriesController : ControllerBase
{
    private readonly FreeSqlDb0690774Context _context;
    public InventoriesController(FreeSqlDb0690774Context context)
    {
        _context = context;
    }

    // GET: api/Inventory
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Inventory>>> GetInventory()
    {
        return await _context.Inventories.ToListAsync();
    }

    // GET: api/Inventory/5
    [HttpGet("{inventoryid}")]
    public async Task<ActionResult<Inventory>> GetInventory(int inventoryid)
    {
        var inventory = await _context.Inventories.FindAsync(inventoryid);

        if (inventory == null)
        {
            return NotFound();
        }

        return inventory;
    }

    // PUT: api/Inventory/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{inventoryid}")]
    public async Task<IActionResult> PutInventory(int? inventoryid, Inventory inventory)
    {
        if (inventoryid != inventory.InventoryId)
        {
            return BadRequest();
        }

        _context.Entry(inventory).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!InventoryExists(inventoryid))
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

    // POST: api/Inventory
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<Inventory>> PostInventory(Inventory inventory)
    {
        _context.Inventories.Add(inventory);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetInventory", new { inventoryid = inventory.InventoryId }, inventory);
    }

    // DELETE: api/Inventory/5
    [HttpDelete("{inventoryid}")]
    public async Task<IActionResult> DeleteInventory(int? inventoryid)
    {
        var inventory = await _context.Inventories.FindAsync(inventoryid);
        if (inventory == null)
        {
            return NotFound();
        }

        _context.Inventories.Remove(inventory);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool InventoryExists(int? inventoryid)
    {
        return _context.Inventories.Any(e => e.InventoryId == inventoryid);
    }
}
