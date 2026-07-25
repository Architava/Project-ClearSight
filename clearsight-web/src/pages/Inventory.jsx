import { useState, useEffect } from 'react';
import api from '../services/api';

const Inventory = () => {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // New state for the Modal and Form Data
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        productId: '',
        storeId: '',
        quantityInStock: ''
    });

    useEffect(() => {
        fetchInventory();
    }, []);

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

    // Handle typing in the input fields
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the page from refreshing
        try {
            // .NET expects numbers, so we convert the string inputs to integers
            const payload = {
                productId: parseInt(formData.productId),
                storeId: parseInt(formData.storeId),
                quantityInStock: parseInt(formData.quantityInStock)
            };

            // Send the POST request to create the new record
            await api.post('/Inventories', payload);

            // Close the modal, reset the form, and refresh the table
            setIsModalOpen(false);
            setFormData({ productId: '', storeId: '', quantityInStock: '' });
            fetchInventory();
        } catch (err) {
            console.error("Error adding item:", err);
            alert("Failed to add item. Check your console for details.");
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
                        <th style={styles.header}>Inventory ID</th>
                        <th style={styles.header}>Product ID</th>
                        <th style={styles.header}>Store ID</th>
                        <th style={styles.header}>Quantity in Stock</th>
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
                                <td style={styles.cell}>{item.inventoryId}</td>
                                <td style={styles.cell}>{item.productId}</td>
                                <td style={styles.cell}>{item.storeId}</td>
                                <td style={styles.cell}>{item.quantityInStock}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* The Modal Overlay */}
            {isModalOpen && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <h3>Add New Inventory Record</h3>
                        <form onSubmit={handleSubmit} style={styles.form}>

                            <div style={styles.inputGroup}>
                                <label>Product ID</label>
                                <input
                                    type="number"
                                    name="productId"
                                    value={formData.productId}
                                    onChange={handleInputChange}
                                    required
                                    style={styles.input}
                                />
                            </div>

                            <div style={styles.inputGroup}>
                                <label>Store ID</label>
                                <input
                                    type="number"
                                    name="storeId"
                                    value={formData.storeId}
                                    onChange={handleInputChange}
                                    required
                                    style={styles.input}
                                />
                            </div>

                            <div style={styles.inputGroup}>
                                <label>Quantity in Stock</label>
                                <input
                                    type="number"
                                    name="quantityInStock"
                                    value={formData.quantityInStock}
                                    onChange={handleInputChange}
                                    required
                                    style={styles.input}
                                />
                            </div>

                            <div style={styles.buttonGroup}>
                                <button
                                    type="button"
                                    style={styles.secondaryButton}
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setFormData({ productId: '', storeId: '', quantityInStock: '' }); // Clears the form
                                    }}
                                >
                                    Cancel
                                </button>
                                <button type="submit" style={styles.primaryButton}>
                                    Save Item
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

// Clean styling for the table and the new modal
const styles = {
    headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' },
    table: { width: '100%', borderCollapse: 'collapse' },
    header: { textAlign: 'left', padding: '12px', backgroundColor: '#f1f5f9', borderBottom: '2px solid #cbd5e1' },
    row: { borderBottom: '1px solid #e2e8f0' },
    cell: { padding: '12px' },
    primaryButton: { backgroundColor: '#0ea5e9', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
    secondaryButton: { backgroundColor: '#e2e8f0', color: '#334155', border: 'none', padding: '10px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
    modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' },
    modalContent: { backgroundColor: 'white', padding: '2rem', borderRadius: '8px', width: '400px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
    form: { display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    input: { padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '1rem' },
    buttonGroup: { display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }
};

export default Inventory;