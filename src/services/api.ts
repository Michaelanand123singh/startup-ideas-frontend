import axios from 'axios';
import { Idea, Comment } from '../types';

// In a real app, this would be an environment variable
const API_BASE_URL = 'https://api.startupideas.com';

// Since we're building a frontend prototype without a real backend yet,
// we'll simulate API calls with localStorage
const api = {
  // Ideas
  getIdeas: async (): Promise<Idea[]> => {
    // Simulated API call
    const ideas = localStorage.getItem('ideas');
    return ideas ? JSON.parse(ideas) : [];
  },
  
  getIdeaById: async (id: string): Promise<Idea | null> => {
    const ideas = await api.getIdeas();
    return ideas.find(idea => idea.id === id) || null;
  },
  
  createIdea: async (idea: Omit<Idea, 'id' | 'createdAt' | 'votes' | 'commentsCount'>): Promise<Idea> => {
    const ideas = await api.getIdeas();
    
    const newIdea: Idea = {
      ...idea,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      votes: 0,
      commentsCount: 0
    };
    
    const updatedIdeas = [...ideas, newIdea];
    localStorage.setItem('ideas', JSON.stringify(updatedIdeas));
    
    return newIdea;
  },
  
  voteIdea: async (id: string, increment: boolean): Promise<Idea> => {
    const ideas = await api.getIdeas();
    const updatedIdeas = ideas.map(idea => {
      if (idea.id === id) {
        return {
          ...idea,
          votes: idea.votes + (increment ? 1 : -1)
        };
      }
      return idea;
    });
    
    localStorage.setItem('ideas', JSON.stringify(updatedIdeas));
    const updatedIdea = updatedIdeas.find(idea => idea.id === id)!;
    return updatedIdea;
  },
  
  // Comments
  getComments: async (ideaId: string): Promise<Comment[]> => {
    const comments = localStorage.getItem(`comments_${ideaId}`);
    return comments ? JSON.parse(comments) : [];
  },
  
  createComment: async (ideaId: string, text: string): Promise<Comment> => {
    const comments = await api.getComments(ideaId);
    
    const newComment: Comment = {
      id: Date.now().toString(),
      ideaId,
      text,
      createdAt: new Date().toISOString()
    };
    
    const updatedComments = [...comments, newComment];
    localStorage.setItem(`comments_${ideaId}`, JSON.stringify(updatedComments));
    
    // Update comment count
    const ideas = await api.getIdeas();
    const updatedIdeas = ideas.map(idea => {
      if (idea.id === ideaId) {
        return {
          ...idea,
          commentsCount: idea.commentsCount + 1
        };
      }
      return idea;
    });
    
    localStorage.setItem('ideas', JSON.stringify(updatedIdeas));
    
    return newComment;
  }
};

export default api;