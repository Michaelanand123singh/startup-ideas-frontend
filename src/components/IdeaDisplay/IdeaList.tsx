import { useState, useEffect } from 'react';
import { Idea } from '../../types';
import IdeaCard from './IdeaCard';
import api from '../../services/api';

interface IdeaListProps {
  filter?: string;
  sortBy?: 'newest' | 'popular';
}

const IdeaList: React.FC<IdeaListProps> = ({ filter, sortBy = 'newest' }) => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        setLoading(true);
        let fetchedIdeas = await api.getIdeas();
        
        // Filter by category if filter is provided
        if (filter) {
          fetchedIdeas = fetchedIdeas.filter(idea => idea.category === filter);
        }
        
        // Sort ideas
        if (sortBy === 'newest') {
          fetchedIdeas.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        } else if (sortBy === 'popular') {
          fetchedIdeas.sort((a, b) => b.votes - a.votes);
        }
        
        setIdeas(fetchedIdeas);
      } catch (err) {
        console.error('Failed to fetch ideas', err);
        setError('Failed to load ideas. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, [filter, sortBy]);

  const handleVote = async (id: string, increment: boolean) => {
    try {
      await api.voteIdea(id, increment);
      // Update the idea in the list
      setIdeas(prevIdeas => 
        prevIdeas.map(idea => 
          idea.id === id 
            ? { ...idea, votes: idea.votes + (increment ? 1 : -1) } 
            : idea
        )
      );
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

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-md">
        {error}
      </div>
    );
  }

  if (ideas.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          {filter 
            ? `No ideas found in the ${filter} category.` 
            : 'No ideas yet. Be the first to share yours!'}
        </p>
      </div>
    );
  }

  return (
    <div>
      {ideas.map(idea => (
        <IdeaCard 
          key={idea.id} 
          idea={idea} 
          onVote={handleVote} 
        />
      ))}
    </div>
  );
};

export default IdeaList;