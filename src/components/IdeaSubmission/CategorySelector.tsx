import { useState, useEffect } from 'react';
import { Category } from '../../types';

interface CategorySelectorProps {
  selectedCategory: string;
  onChange: (category: string) => void;
  error?: string;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ 
  selectedCategory, 
  onChange,
  error
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  
  useEffect(() => {
    // In a real app, we would fetch this from an API
    const storedCategories = localStorage.getItem('categories');
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);

  return (
    <div className="mb-4">
      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
        Category
      </label>
      <select
        id="category"
        value={selectedCategory}
        onChange={(e) => onChange(e.target.value)}
        className={`input ${error ? 'border-red-500' : ''}`}
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default CategorySelector;