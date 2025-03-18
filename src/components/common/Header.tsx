import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Startup Ideas</h1>
            </Link>
            <nav className="ml-6 flex items-center space-x-4">
              <Link to="/" className="px-3 py-2 text-gray-700 hover:text-blue-600">
                Browse Ideas
              </Link>
              <Link to="/submit" className="px-3 py-2 text-gray-700 hover:text-blue-600">
                Submit Idea
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;