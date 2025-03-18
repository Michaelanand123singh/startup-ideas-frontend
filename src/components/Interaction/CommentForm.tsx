import { useState } from 'react';
import { validateComment } from '../../utils/validators';

interface CommentFormProps {
  onSubmit: (text: string) => Promise<void>;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateComment(text);
    
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }
    
    setError(null);
    setIsSubmitting(true);
    
    try {
      await onSubmit(text);
      setText(''); // Clear form after successful submission
    } catch (err) {
      console.error('Failed to submit comment', err);
      setError('Failed to submit comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-2">
        <textarea
          placeholder="Share your thoughts on this idea..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={`textarea h-24 ${error ? 'border-red-500' : ''}`}
          disabled={isSubmitting}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        <p className="mt-1 text-sm text-gray-500">{text.length}/500 characters</p>
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;