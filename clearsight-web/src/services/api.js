import axios from 'axios';

// Create a custom instance of axios
const api = axios.create({
    // This must perfectly match your .NET backend port
    baseURL: 'https://localhost:7165/api', 
    headers: {
        'Content-Type': 'application/json'
    }
});

// We can add interceptors here later for security/tokens
export default api;