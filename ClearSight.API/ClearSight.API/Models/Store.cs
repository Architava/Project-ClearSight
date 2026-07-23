using System;
using System.Collections.Generic;

namespace ClearSight.API.Models;

public partial class Store
{
    public int StoreId { get; set; }

    public string Location { get; set; } = null!;

    public string ManagerName { get; set; } = null!;

    public virtual ICollection<Inventory> Inventories { get; set; } = new List<Inventory>();

    public virtual ICollection<Sale> Sales { get; set; } = new List<Sale>();
}
