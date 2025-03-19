import { useState, useEffect } from 'react';
import { Comment } from '../../types';
import { formatDate } from '../../utils/formatter';
import CommentForm from './CommentForm';
import api from '../../services/api';

interface CommentSectionProps {
  ideaId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ ideaId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const fetchedComments = await api.getComments(ideaId);
        // Sort comments by date (newest first)
        fetchedComments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setComments(fetchedComments);
      } catch (err) {
        console.error('Failed to fetch comments', err);
        setError('Failed to load comments. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [ideaId]);

  const handleSubmitComment = async (text: string) => {
    const newComment = await api.createComment(ideaId, text);
    setComments([newComment, ...comments]);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>
      
      <CommentForm onSubmit={handleSubmitComment} />
      
      {loading ? (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-gray-500">No comments yet. Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map(comment => (
            <div key={comment.id} className="border-b border-gray-200 pb-4 last:border-b-0">
              <p className="text-gray-800 mb-2">{comment.content}</p>
              <p className="text-sm text-gray-500">{formatDate(comment.createdAt)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;