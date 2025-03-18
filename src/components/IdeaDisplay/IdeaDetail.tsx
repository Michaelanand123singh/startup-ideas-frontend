import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Idea } from '../../types';
import { formatDate } from '../../utils/formatter';
import VotingButtons from '../Interaction/VotingButton';
import CommentSection from '../Interaction/CommentSection';
import api from '../../services/api';

const IdeaDetail = () => {
  const { ideaId } = useParams<{ ideaId: string }>();
  const [idea, setIdea] = useState<Idea | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIdea = async () => {
      if (!ideaId) return;
      
      try {
        setLoading(true);
        const fetchedIdea = await api.getIdeaById(ideaId);
        
        if (!fetchedIdea) {
          setError('Idea not found');
          return;
        }
        
        setIdea(fetchedIdea);
      } catch (err) {
        console.error('Failed to fetch idea', err);
        setError('Failed to load idea. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchIdea();
  }, [ideaId]);

  const handleVote = async (id: string, increment: boolean) => {
    try {
      const updatedIdea = await api.voteIdea(id, increment);
      setIdea(updatedIdea);
    } catch (err) {
      console.error('Failed to vote', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !idea) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-md">
        {error || 'Failed to load idea'}
      </div>
    );
  }

  return (
    <div>
      <Link to="/" className="text-blue-600 hover:text-blue-800 mb-6 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to all ideas
      </Link>
      
      <div className="card mb-6">
        <div className="flex items-start">
          <VotingButtons 
            id={idea.id} 
            votes={idea.votes} 
            onVote={handleVote} 
            className="mr-4"
          />
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {idea.title}
            </h1>
            
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium">
                {idea.category}
              </span>
              <span className="ml-4">
                {formatDate(idea.createdAt)}
              </span>
            </div>
            
            <div className="prose prose-blue max-w-none">
              <p className="text-gray-700 whitespace-pre-line">
                {idea.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <CommentSection ideaId={idea.id} />
    </div>
  );
};

export default IdeaDetail;