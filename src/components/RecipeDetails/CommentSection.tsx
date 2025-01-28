import React, { useState } from 'react';
import { Comment, UserComment } from '@/types/recipes';

// const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
const CommentSection: React.FC<{
  comment: Comment;
  userComment: UserComment | null;
  newComment: string;
  setNewComment: React.Dispatch<React.SetStateAction<string>>;
  handleSubmitComment: () => void;
}> = ({
  comment,
  userComment,
  newComment,
  setNewComment,
  handleSubmitComment,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open the modal and pre-fill the textarea with the current comment
  const handleEditClick = () => {
    setIsModalOpen(true);
    setNewComment(comment.comment); // Fill the textarea with the existing comment
  };

  // Close the modal without saving the changes
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Save the changes and close the modal
  const handleSave = () => {
    handleSubmitComment();
    setIsModalOpen(false); // Close the modal after saving
  };

  return (
    <div
      key={comment._id}
      className="p-4 border border-gray-200 rounded-lg shadow-sm"
    >
      <div className="flex justify-between">
        <p className="font-semibold text-xl text-gray-900">
          {comment.user.firstName} {comment.user.lastName}
        </p>
        {/* Edit Button */}
        {comment._id === userComment?._id && (
          <button
            onClick={handleEditClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Edit
          </button>
        )}
      </div>
      <p className="text-gray-700 mt-1 text-lg">{comment.comment}</p>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg mx-4 sm:mx-6 md:mx-0">
            <h3 className="text-xl font-semibold mb-4">Edit Your Comment</h3>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              rows={4}
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCloseModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
