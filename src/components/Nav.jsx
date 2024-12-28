// Placeholder for imports
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/meal-plans">Meal Plans</Link></li>
        <li><Link to="/subscriptions">Subscriptions</Link></li>
        <li><Link to="/deliveries">Deliveries</Link></li>
        <li><Link to="/auth/login">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;
