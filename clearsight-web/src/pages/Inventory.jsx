import { useState, useEffect } from 'react';
import api from '../services/api';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // New state to track if we are editing an existing item
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    productId: '',
    storeId: '',
    quantityInStock: ''
  });

  useEffect(() => {
    fetchInventory();
    fetchDropdownData();
  }, []);

  const fetchDropdownData = async () => {
    try {
      const [productsRes, storesRes] = await Promise.all([
        api.get('/Products'),
        api.get('/Stores')
      ]);
      setProducts(productsRes.data);
      setStores(storesRes.data);
    } catch (err) {
      console.error("Error fetching dropdown lists:", err);
    }
  };

  const fetchInventory = async () => {
    try {
      const response = await api.get('/Inventories');
      setInventory(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load inventory data. Is the backend running?");
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Helper to cleanly close modal and wipe data
  const resetForm = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ productId: '', storeId: '', quantityInStock: '' });
  };

  // Opens the modal and populates it with the selected item's data
  const handleEdit = (item) => {
    setEditingId(item.inventoryId);
    setFormData({
      productId: item.productId,
      storeId: item.storeId,
      quantityInStock: item.quantityInStock
    });
    setIsModalOpen(true);
  };

  // Triggers the DELETE endpoint with a safety check
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this inventory record?")) return;
    
    try {
      await api.delete(`/Inventories/${id}`);
      fetchInventory(); // Refresh table after deleting
    } catch (err) {
      console.error("Error deleting item:", err);
      alert("Failed to delete item.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const payload = {
        inventoryId: editingId || 0, // .NET PUT sometimes expects the ID in the body
        productId: parseInt(formData.productId),
        storeId: parseInt(formData.storeId),
        quantityInStock: parseInt(formData.quantityInStock)
      };

      // If we have an editingId, it's an Update (PUT). Otherwise, it's a Create (POST).
      if (editingId) {
        await api.put(`/Inventories/${editingId}`, payload);
      } else {
        await api.post('/Inventories', payload);
      }
      
      resetForm();
      fetchInventory(); 
    } catch (err) {
      console.error("Error saving item:", err);
      alert("Failed to save item. Check your console for details.");
    }
  };

  if (loading) return <p>Loading inventory...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <div style={styles.headerRow}>
        <h2>Inventory Management</h2>
        <button style={styles.primaryButton} onClick={() => setIsModalOpen(true)}>
          + Add New Item
        </button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr style={styles.row}>
            <th style={styles.header}>Product</th>
            <th style={styles.header}>Store Location</th>
            <th style={styles.header}>Quantity in Stock</th>
            <th style={styles.header}>Actions</th> {/* New Actions Header */}
          </tr>
        </thead>
        <tbody>
          {inventory.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ padding: '1rem', textAlign: 'center' }}>No items found in database.</td>
            </tr>
          ) : (
            inventory.map((item) => (
              <tr key={item.inventoryId} style={styles.row}>
                <td style={styles.cell}>{item.product?.name || `ID: ${item.productId}`}</td>
                <td style={styles.cell}>{item.store?.location || `ID: ${item.storeId}`}</td>
                <td style={styles.cell}>{item.quantityInStock}</td>
                <td style={styles.cell}>
                  {/* Edit and Delete Buttons */}
                  <button style={styles.editButton} onClick={() => handleEdit(item)}>Edit</button>
                  <button style={styles.deleteButton} onClick={() => handleDelete(item.inventoryId)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>{editingId ? "Edit Inventory Record" : "Add New Inventory Record"}</h3>
            <form onSubmit={handleSubmit} style={styles.form}>
              
              <div style={styles.inputGroup}>
                <label>Product</label>
                <select name="productId" value={formData.productId} onChange={handleInputChange} required style={styles.input}>
                  <option value="" disabled>-- Select a Product --</option>
                  {products.map((product) => (
                    <option key={product.productId} value={product.productId}>{product.name}</option>
                  ))}
                </select>
              </div>

              <div style={styles.inputGroup}>
                <label>Store Location</label>
                <select name="storeId" value={formData.storeId} onChange={handleInputChange} required style={styles.input}>
                  <option value="" disabled>-- Select a Store --</option>
                  {stores.map((store) => (
                    <option key={store.storeId} value={store.storeId}>{store.location}</option>
                  ))}
                </select>
              </div>

              <div style={styles.inputGroup}>
                <label>Quantity in Stock</label>
                <input type="number" name="quantityInStock" value={formData.quantityInStock} onChange={handleInputChange} required style={styles.input} />
              </div>

              <div style={styles.buttonGroup}>
                <button type="button" style={styles.secondaryButton} onClick={resetForm}>Cancel</button>
                <button type="submit" style={styles.primaryButton}>
                  {editingId ? "Update Item" : "Save Item"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' },
  table: { width: '100%', borderCollapse: 'collapse' },
  header: { textAlign: 'left', padding: '12px', backgroundColor: '#f1f5f9', borderBottom: '2px solid #cbd5e1' },
  row: { borderBottom: '1px solid #e2e8f0' },
  cell: { padding: '12px' },
  primaryButton: { backgroundColor: '#0ea5e9', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  secondaryButton: { backgroundColor: '#e2e8f0', color: '#334155', border: 'none', padding: '10px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  editButton: { backgroundColor: '#f59e0b', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginRight: '8px' },
  deleteButton: { backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: 'white', padding: '2rem', borderRadius: '8px', width: '400px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  input: { padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '1rem' },
  buttonGroup: { display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }
};

export default Inventory;