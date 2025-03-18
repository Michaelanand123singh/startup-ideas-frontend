import SubmissionForm from '../components/IdeaSubmission/SubmissionForm';

const SubmitIdeaPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Submit a Startup Idea</h1>
      <p className="text-gray-600 mb-6">
        Have a great startup idea? Share it with the community! No login required - just fill out the form below.
      </p>
      
      <SubmissionForm />
    </div>
  );
};

export default SubmitIdeaPage;