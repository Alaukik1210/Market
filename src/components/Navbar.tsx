import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-500';

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Market</h1>
        <div className="space-x-4 flex items-center">
          <Link to="/" className={`text-md transition-colors ${isActive('/')}`}>
            Home
          </Link>
          <Link
            to="/add"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg shadow transition-colors duration-200"
          >
            Post Item
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
