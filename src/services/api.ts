import axios from 'axios';
import { Idea, Comment } from '../types';

// Using the hosted backend URL
const API_BASE_URL = 'https://startup-ideas-backend.onrender.com';

// Creating an axios instance with the base URL
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-client-id': localStorage.getItem('clientId') || `client-${Date.now()}`
  }
});

// Set a clientId if one doesn't exist
if (!localStorage.getItem('clientId')) {
  const clientId = `client-${Date.now()}`;
  localStorage.setItem('clientId', clientId);
}

const api = {
  // Ideas
  getIdeas: async (): Promise<Idea[]> => {
    const response = await axiosInstance.get('/api/ideas');
    return response.data.ideas || [];
  },
  
  getIdeaById: async (id: string): Promise<Idea | null> => {
    const response = await axiosInstance.get(`/api/ideas/${id}`);
    return response.data;
  },
  
  createIdea: async (idea: Omit<Idea, 'id' | 'createdAt' | 'votes' | 'commentsCount'>): Promise<Idea> => {
    const response = await axiosInstance.post('/api/ideas', idea);
    return response.data;
  },
  
  voteIdea: async (id: string, increment: boolean): Promise<Idea> => {
    // Your backend expects 'type' to be 'upvote' or 'downvote'
    const type = increment ? 'upvote' : 'downvote';
    const response = await axiosInstance.post(`/api/votes/idea/${id}`, { 
      type 
    });
    return response.data;
  },
  
  // Comments
  getComments: async (ideaId: string): Promise<Comment[]> => {
    const response = await axiosInstance.get(`/api/comments/idea/${ideaId}`);
    return response.data;
  },
  
  createComment: async (ideaId: string, text: string): Promise<Comment> => {
    const response = await axiosInstance.post(`/api/comments/idea/${ideaId}`, { 
      content: text 
    });
    return response.data;
  }
};

export default api;