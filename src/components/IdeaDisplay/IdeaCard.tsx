import { Link } from 'react-router-dom';
import { Idea } from '../../types';
import { formatDate, truncateText } from '../../utils/formatter';
import VotingButtons from '../Interaction/VotingButton';

interface IdeaCardProps {
  idea: Idea;
  onVote: (id: string, increment: boolean) => void;
}

const IdeaCard: React.FC<IdeaCardProps> = ({ idea, onVote }) => {
  return (
    <div className="card mb-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start">
        <VotingButtons 
          id={idea.id} 
          votes={idea.votes} 
          onVote={onVote} 
          className="mr-4"
        />
        
        <div className="flex-1">
          <Link to={`/idea/${idea.id}`}>
            <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600">
              {idea.title}
            </h3>
          </Link>
          
          <div className="flex items-center text-sm text-gray-500 mt-1 mb-2">
            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium">
              {idea.category}
            </span>
            <span className="ml-4">
              {formatDate(idea.createdAt)}
            </span>
          </div>
          
          <p className="text-gray-700 mb-3">
            {truncateText(idea.description, 200)}
          </p>
          
          <div className="flex items-center text-sm">
            <Link 
              to={`/idea/${idea.id}`} 
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {idea.commentCount === 0 
                ? 'Be the first to comment' 
                : `${idea.commentCount} comment${idea.commentCount === 1 ? '' : 's'}`}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaCard;