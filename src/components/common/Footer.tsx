const Footer = () => {
    return (
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <p className="text-center text-gray-500 text-sm">
              © {new Date().getFullYear()} Startup Ideas Platform. All rights reserved.
            </p>
            <div className="mt-2 flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                About
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;