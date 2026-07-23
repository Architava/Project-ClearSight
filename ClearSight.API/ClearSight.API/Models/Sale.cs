using System;
using System.Collections.Generic;

namespace ClearSight.API.Models;

public partial class Sale
{
    public int SaleId { get; set; }

    public int StoreId { get; set; }

    public int ProductId { get; set; }

    public int QuantitySold { get; set; }

    public DateTime? SaleDate { get; set; }

    public virtual Product Product { get; set; } = null!;

    public virtual Store Store { get; set; } = null!;
}
