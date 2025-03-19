export interface Idea {
  id: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
  votes: {
    upvotes: number;
    downvotes: number;
  };
  commentCount: number; // Backend uses commentCount instead of commentsCount
}

export interface Comment {
  id: string;
  ideaId: string;
  content: string; // Backend uses content instead of text
  createdAt: string;
  clientId: string;
}

export interface Category {
  id: string;
  name: string;
}