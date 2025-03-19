interface VotingButtonsProps {
  id: string;
  votes: number | { upvotes: number; downvotes: number };
  onVote: (id: string, increment: boolean) => void;
  className?: string;
}

const VotingButtons: React.FC<VotingButtonsProps> = ({ id, votes, onVote, className = '' }) => {
  // Calculate the total votes depending on the structure
  const voteCount = typeof votes === 'object' 
    ? votes.upvotes - votes.downvotes 
    : votes;
  
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <button
        onClick={() => onVote(id, true)}
        className="p-1 rounded-md hover:bg-gray-100"
        aria-label="Upvote"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
      
      <span className="text-xl font-semibold my-1">{voteCount}</span>
      
      <button
        onClick={() => onVote(id, false)}
        className="p-1 rounded-md hover:bg-gray-100"
        aria-label="Downvote"
        disabled={voteCount <= 0}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${voteCount <= 0 ? 'text-gray-300' : 'text-gray-500 hover:text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
};

export default VotingButtons;