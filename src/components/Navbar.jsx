
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-between text-white">
        <li>
          <Link to="/todos" className="hover:text-gray-400">
            To-do List
          </Link>
        </li>
        <li>
          <Link to="/contacts" className="hover:text-gray-400">
            Contacts
          </Link>
        </li>
        <li>
          <Link to="/login" className="hover:text-gray-400">
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
