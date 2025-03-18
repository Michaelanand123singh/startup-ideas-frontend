export interface Idea {
    id: string;
    title: string;
    description: string;
    category: string;
    createdAt: string;
    votes: number;
    commentsCount: number;
  }
  
  export interface Comment {
    id: string;
    ideaId: string;
    text: string;
    createdAt: string;
  }
  
  export interface Category {
    id: string;
    name: string;
  }