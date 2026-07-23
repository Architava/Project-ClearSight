using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ClearSight.API.Models;

[Route("api/[controller]")]
[ApiController]
public class SalesController : ControllerBase
{
    private readonly FreeSqlDb0690774Context _context;
    public SalesController(FreeSqlDb0690774Context context)
    {
        _context = context;
    }

    // GET: api/Sale
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Sale>>> GetSale()
    {
        return await _context.Sales.ToListAsync();
    }

    // GET: api/Sale/5
    [HttpGet("{saleid}")]
    public async Task<ActionResult<Sale>> GetSale(int saleid)
    {
        var sale = await _context.Sales.FindAsync(saleid);

        if (sale == null)
        {
            return NotFound();
        }

        return sale;
    }

    // PUT: api/Sale/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{saleid}")]
    public async Task<IActionResult> PutSale(int? saleid, Sale sale)
    {
        if (saleid != sale.SaleId)
        {
            return BadRequest();
        }

        _context.Entry(sale).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!SaleExists(saleid))
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

    // POST: api/Sale
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<Sale>> PostSale(Sale sale)
    {
        _context.Sales.Add(sale);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetSale", new { saleid = sale.SaleId }, sale);
    }

    // DELETE: api/Sale/5
    [HttpDelete("{saleid}")]
    public async Task<IActionResult> DeleteSale(int? saleid)
    {
        var sale = await _context.Sales.FindAsync(saleid);
        if (sale == null)
        {
            return NotFound();
        }

        _context.Sales.Remove(sale);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool SaleExists(int? saleid)
    {
        return _context.Sales.Any(e => e.SaleId == saleid);
    }
}
