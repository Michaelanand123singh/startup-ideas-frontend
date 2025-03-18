export const validateIdeaSubmission = (
    title: string,
    description: string,
    category: string
  ): { isValid: boolean; errors: Record<string, string> } => {
    const errors: Record<string, string> = {};
    
    if (!title.trim()) {
      errors.title = 'Title is required';
    } else if (title.length < 5) {
      errors.title = 'Title must be at least 5 characters';
    } else if (title.length > 100) {
      errors.title = 'Title must be less than 100 characters';
    }
    
    if (!description.trim()) {
      errors.description = 'Description is required';
    } else if (description.length < 20) {
      errors.description = 'Description must be at least 20 characters';
    } else if (description.length > 1000) {
      errors.description = 'Description must be less than 1000 characters';
    }
    
    if (!category) {
      errors.category = 'Category is required';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };
  
  export const validateComment = (
    text: string
  ): { isValid: boolean; error: string | null } => {
    if (!text.trim()) {
      return { isValid: false, error: 'Comment cannot be empty' };
    }
    
    if (text.length > 500) {
      return { isValid: false, error: 'Comment must be less than 500 characters' };
    }
    
    return { isValid: true, error: null };
  };