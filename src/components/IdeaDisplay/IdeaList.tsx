import { useState, useEffect } from 'react';
import { Idea } from '../../types';
import IdeaCard from './IdeaCard';
import api from '../../services/api';

interface IdeaListProps {
  filter?: string;
  sortBy?: 'newest' | 'popular';
  searchQuery?: string;
}

const IdeaList: React.FC<IdeaListProps> = ({ filter, sortBy = 'newest', searchQuery = '' }) => {
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
        
        // Filter by search query if provided
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          fetchedIdeas = fetchedIdeas.filter(idea => 
            idea.title.toLowerCase().includes(query) || 
            idea.description.toLowerCase().includes(query)
          );
        }
        
        // Sort ideas based on the votes structure
        if (sortBy === 'newest') {
          fetchedIdeas.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        } else if (sortBy === 'popular') {
          fetchedIdeas.sort((a, b) => {
            // Calculate net votes for each idea
            const votesA = typeof a.votes === 'object' ? a.votes.upvotes - a.votes.downvotes : a.votes;
            const votesB = typeof b.votes === 'object' ? b.votes.upvotes - b.votes.downvotes : b.votes;
            return votesB - votesA;
          });
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
  }, [filter, sortBy, searchQuery]);

  const handleVote = async (id: string, increment: boolean) => {
    try {
      const updatedIdea = await api.voteIdea(id, increment);
      
      // Update the idea in the list with the response from the server
      setIdeas(prevIdeas => 
        prevIdeas.map(idea => {
          if (idea.id === id) {
            return updatedIdea;
          }
          return idea;
        })
      );
    } catch (err) {
      console.error('Failed to vote', err);
      // Show an error message to the user
      setError('Failed to register your vote. Please try again.');
      // Clear the error after 3 seconds
      setTimeout(() => setError(null), 3000);
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
          {searchQuery 
            ? `No ideas found matching "${searchQuery}"${filter ? ` in the ${filter} category` : ''}.`
            : filter 
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