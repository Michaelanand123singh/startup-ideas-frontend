import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategorySelector from './CategorySelector';
import { validateIdeaSubmission } from '../../utils/validators';
import api from '../../services/api';

const SubmissionForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateIdeaSubmission(title, description, category);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    
    setErrors({});
    setIsSubmitting(true);
    
    try {
      await api.createIdea({
        title,
        description,
        category
      });
      
      // Redirect to home page after successful submission
      navigate('/');
    } catch (error) {
      console.error('Failed to submit idea', error);
      setErrors({ submit: 'Failed to submit idea. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2 className="text-2xl font-bold mb-6">Submit Your Startup Idea</h2>
      
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`input ${errors.title ? 'border-red-500' : ''}`}
          placeholder="Give your idea a clear, concise title"
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
      </div>
      
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`textarea h-32 ${errors.description ? 'border-red-500' : ''}`}
          placeholder="Describe your idea in detail. What problem does it solve? Who is it for? How would it work?"
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        <p className="mt-1 text-sm text-gray-500">{description.length}/1000 characters</p>
      </div>
      
      <CategorySelector
        selectedCategory={category}
        onChange={setCategory}
        error={errors.category}
      />
      
      {errors.submit && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {errors.submit}
        </div>
      )}
      
      <div className="flex justify-end">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Idea'}
        </button>
      </div>
    </form>
  );
};

export default SubmissionForm;