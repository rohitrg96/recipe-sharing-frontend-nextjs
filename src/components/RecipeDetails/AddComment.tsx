// Add Comment Component
export const AddComment: React.FC<{
  newComment: string;
  setNewComment: React.Dispatch<React.SetStateAction<string>>;
  handleSubmitComment: () => void;
}> = ({ newComment, setNewComment, handleSubmitComment }) => (
  <div className="mt-12">
    <h2 className="text-2xl font-semibold mb-4">Add Your Comment</h2>
    <textarea
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
      placeholder="Write your comment here..."
      className="w-full h-24 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <button
      onClick={handleSubmitComment}
      className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
    >
      Submit Comment
    </button>
  </div>
);
