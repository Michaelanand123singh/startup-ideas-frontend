import { Idea, Comment, Category } from '../types';

// Initialize localStorage with some sample data if empty
export const initializeLocalStorage = (): void => {
  if (!localStorage.getItem('ideas')) {
    const sampleIdeas: Idea[] = [
      {
        id: '1',
        title: 'AI-powered grocery shopping assistant',
        description: 'An app that helps users plan meals, create shopping lists, and find the best deals at local grocery stores using AI.',
        category: 'Consumer',
        createdAt: '2025-03-10T10:00:00Z',
        votes: 15,
        commentsCount: 3
      },
      {
        id: '2',
        title: 'Sustainable packaging marketplace',
        description: 'A B2B marketplace connecting businesses with suppliers of eco-friendly packaging solutions.',
        category: 'B2B',
        createdAt: '2025-03-12T14:30:00Z',
        votes: 8,
        commentsCount: 1
      },
      {
        id: '3',
        title: 'Remote team culture building platform',
        description: 'A platform offering virtual team building activities designed specifically for remote teams.',
        category: 'SaaS',
        createdAt: '2025-03-15T09:45:00Z',
        votes: 12,
        commentsCount: 2
      }
    ];
    
    localStorage.setItem('ideas', JSON.stringify(sampleIdeas));
    
    // Add sample comments for each idea
    const sampleComments1: Comment[] = [
      {
        id: '101',
        ideaId: '1',
        text: 'This could be really useful for busy parents!',
        createdAt: '2025-03-11T15:20:00Z'
      },
      {
        id: '102',
        ideaId: '1',
        text: 'I wonder how you would handle different dietary restrictions',
        createdAt: '2025-03-12T08:45:00Z'
      },
      {
        id: '103',
        ideaId: '1',
        text: 'Would love to see integration with delivery services',
        createdAt: '2025-03-13T11:10:00Z'
      }
    ];
    
    const sampleComments2: Comment[] = [
      {
        id: '201',
        ideaId: '2',
        text: 'This is more relevant than ever with new packaging regulations',
        createdAt: '2025-03-13T16:30:00Z'
      }
    ];
    
    const sampleComments3: Comment[] = [
      {
        id: '301',
        ideaId: '3',
        text: 'We used something similar at my company and it really helped team bonding',
        createdAt: '2025-03-16T10:15:00Z'
      },
      {
        id: '302',
        ideaId: '3',
        text: 'How would this be different from existing virtual team building tools?',
        createdAt: '2025-03-17T14:00:00Z'
      }
    ];
    
    localStorage.setItem('comments_1', JSON.stringify(sampleComments1));
    localStorage.setItem('comments_2', JSON.stringify(sampleComments2));
    localStorage.setItem('comments_3', JSON.stringify(sampleComments3));
  }
  
  if (!localStorage.getItem('categories')) {
    const sampleCategories: Category[] = [
      { id: '1', name: 'SaaS' },
      { id: '2', name: 'Consumer' },
      { id: '3', name: 'B2B' },
      { id: '4', name: 'Fintech' },
      { id: '5', name: 'Healthcare' },
      { id: '6', name: 'Education' },
      { id: '7', name: 'E-commerce' }
    ];
    
    localStorage.setItem('categories', JSON.stringify(sampleCategories));
  }
};