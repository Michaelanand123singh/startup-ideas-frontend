import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Sparkles, Filter, ArrowUpDown, Plus, Search } from 'lucide-react';
import IdeaList from '../components/IdeaDisplay/IdeaList';

interface Category {
  id: string;
  name: string;
  color: string;
}

const HomePage = () => {
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>('newest');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const categories: Category[] = [
    { id: '1', name: 'SaaS', color: 'bg-indigo-500' },
    { id: '2', name: 'Consumer', color: 'bg-pink-500' },
    { id: '3', name: 'B2B', color: 'bg-blue-500' },
    { id: '4', name: 'Fintech', color: 'bg-green-500' },
    { id: '5', name: 'Healthcare', color: 'bg-red-500' },
    { id: '6', name: 'Education', color: 'bg-yellow-500' },
    { id: '7', name: 'E-commerce', color: 'bg-purple-500' }
  ];

  // Add scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // The search will be applied automatically through props to IdeaList
  };

  // Clear all filters and search
  const clearAllFilters = () => {
    setCategoryFilter('');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Premium sticky header */}
      <div 
        className={`sticky top-0 z-10 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md py-3' : 'bg-gray-50 py-5'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center">
              <h1 className={`text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent transition-all duration-300 ${
                isScrolled ? 'scale-90' : ''
              }`}>
                <span className="flex items-center gap-2">
                  <Sparkles size={isScrolled ? 20 : 24} className="text-blue-500" />
                  Discuss your ideas
                </span>
              </h1>
            </div>
            
            <Link 
              to="/submit" 
              className="mt-4 sm:mt-0 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-full font-medium transition-all duration-200 transform hover:scale-105 shadow-md"
            >
              <Plus size={18} />
              Submit Your Idea
            </Link>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 py-6">
        {/* Search bar */}
        <div className="mb-6">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className={`flex items-center overflow-hidden bg-white rounded-full shadow-md transition-all duration-300 border ${
              isSearchFocused ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200'
            }`}>
              <div className="pl-4">
                <Search size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for ideas..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full py-3 px-4 outline-none text-gray-700 placeholder-gray-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="px-4 text-gray-400 hover:text-gray-600"
                >
                  &times;
                </button>
              )}
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 font-medium transition-all duration-200 hover:from-blue-700 hover:to-indigo-700"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        
        {/* Filter and sort section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-8">
          <div className="flex flex-col lg:flex-row justify-between gap-4">
            {/* Mobile filter toggle */}
            <button 
              className="lg:hidden flex items-center justify-between w-full bg-gray-50 p-3 rounded-lg text-gray-700 font-medium"
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            >
              <span className="flex items-center gap-2">
                <Filter size={18} />
                Categories
              </span>
              <ChevronDown 
                size={18} 
                className={`transition-transform duration-200 ${isMobileFilterOpen ? 'rotate-180' : ''}`} 
              />
            </button>
            
            {/* Categories */}
            <div className={`flex-grow ${isMobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setCategoryFilter('')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    categoryFilter === '' 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Categories
                </button>
                
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setCategoryFilter(category.name)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      categoryFilter === category.name
                        ? `${category.color} text-white shadow-md`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Sort dropdown */}
            <div className="flex-shrink-0">
              <div className="relative inline-block">
                <div className="flex items-center">
                  <ArrowUpDown size={16} className="text-gray-500 mr-2" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'newest' | 'popular')}
                    className="appearance-none bg-gray-100 hover:bg-gray-200 rounded-lg pl-3 pr-10 py-2 font-medium text-gray-700 cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="newest">Newest First</option>
                    <option value="popular">Most Popular</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Active filters display (shown only when filter or search is active) */}
        {(categoryFilter || searchQuery) && (
          <div className="flex flex-wrap items-center gap-2 mb-6 animate-fadeIn">
            <span className="text-sm text-gray-500">Active filters:</span>
            
            {categoryFilter && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                Category: {categoryFilter}
                <button 
                  onClick={() => setCategoryFilter('')} 
                  className="ml-2 text-blue-700 hover:text-blue-900"
                >
                  &times;
                </button>
              </span>
            )}
            
            {searchQuery && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                Search: {searchQuery}
                <button 
                  onClick={() => setSearchQuery('')} 
                  className="ml-2 text-blue-700 hover:text-blue-900"
                >
                  &times;
                </button>
              </span>
            )}
            
            {(categoryFilter || searchQuery) && (
              <button 
                onClick={clearAllFilters}
                className="text-sm text-blue-600 hover:text-blue-800 underline ml-2"
              >
                Clear all
              </button>
            )}
          </div>
        )}
        
        {/* Ideas list with animation */}
        <div className="transition-all duration-300">
          <IdeaList 
            filter={categoryFilter || undefined}
            sortBy={sortBy}
            searchQuery={searchQuery || undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;