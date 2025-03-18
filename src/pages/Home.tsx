import { useState } from 'react';
import { Link } from 'react-router-dom';
import IdeaList from '../components/IdeaDisplay/IdeaList';

const HomePage = () => {
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>('newest');
  const [categoryFilter, setCategoryFilter] = useState<string>('');

  const categories = [
    { id: '1', name: 'SaaS' },
    { id: '2', name: 'Consumer' },
    { id: '3', name: 'B2B' },
    { id: '4', name: 'Fintech' },
    { id: '5', name: 'Healthcare' },
    { id: '6', name: 'Education' },
    { id: '7', name: 'E-commerce' }
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Startup Ideas</h1>
        
        <Link to="/submit" className="btn btn-primary mt-4 sm:mt-0">
          Submit Your Idea
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="mb-4 sm:mb-0">
            <span className="text-sm font-medium text-gray-700 mr-2">Filter:</span>
            <div className="inline-flex flex-wrap gap-2">
              <button
                onClick={() => setCategoryFilter('')}
                className={`px-3 py-1 rounded-full text-sm ${
                  categoryFilter === '' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All
              </button>
              
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setCategoryFilter(category.name)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    categoryFilter === category.name ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <span className="text-sm font-medium text-gray-700 mr-2">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'popular')}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm"
            >
              <option value="newest">Newest</option>
              <option value="popular">Most Votes</option>
            </select>
          </div>
        </div>
      </div>
      
      <IdeaList filter={categoryFilter} sortBy={sortBy} />
    </div>
  );
};

export default HomePage;