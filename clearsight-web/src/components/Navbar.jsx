import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>
        <h2>ClearSight</h2>
      </div>
      <ul style={styles.navLinks}>
        <li><Link to="/" style={styles.link}>Dashboard</Link></li>
        <li><Link to="/inventory" style={styles.link}>Inventory</Link></li>
        <li><Link to="/sales" style={styles.link}>Sales</Link></li>
      </ul>
    </nav>
  );
};

// A simple inline style object to keep things clean before we add Tailwind or CSS modules
const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#1e293b',
    color: 'white',
    fontFamily: 'sans-serif'
  },
  brand: {
    margin: 0
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '1.5rem',
    margin: 0,
    padding: 0
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold'
  }
};

export default Navbar;