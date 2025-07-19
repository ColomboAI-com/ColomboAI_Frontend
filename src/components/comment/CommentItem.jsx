import Link from 'next/link';
import ProfilePicture from '@/components/elements/ProfilePicture';
import { formatTimeAgo } from '@/utlils/commonFunctions';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import { useState, useRef, useEffect } from 'react';
import ConfirmActionModal from '@/components/modals/ConfirmActionModal';
import { motion } from 'framer-motion'; // Import motion

// Props:
// comment: { _id, creator: { _id, user_name, profile_picture }, content, createdAt }
// currentUserId: string (optional, for showing edit/delete options later)
// onEdit: function (commentId, newContent) => Promise (optional, for edit action)
// onDelete: function (commentId) => Promise (optional, for delete action)
const CommentItem = ({ comment, currentUserId, onEdit, onDelete }) => {
  if (!comment || !comment.creator) {
    return null;
  }

  const isOwnComment = currentUserId && comment.creator._id === currentUserId;
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const optionsMenuRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); // For loading state of delete button

  // Close options menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsMenuRef.current && !optionsMenuRef.current.contains(event.target) && !isEditing) { // Don't close if editing
        setShowOptionsMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [optionsMenuRef, isEditing]);

  const handleEditClick = () => {
    setEditedContent(comment.content);
    setIsEditing(true);
    setShowOptionsMenu(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(comment.content); // Reset to original content
  };

  const handleSaveEdit = async () => {
    if (!onEdit || editedContent.trim() === comment.content.trim()) {
      setIsEditing(false);
      return;
    }
    setIsSavingEdit(true);
    try {
      await onEdit(comment._id, editedContent.trim());
      setIsEditing(false);
      // No need to update local comment.content, parent (CommentSection) should get updated comment list
    } catch (error) {
      console.error("Failed to save comment edit:", error);
      // Optionally show error to user
    } finally {
      setIsSavingEdit(false);
    }
  };


  const handleDeleteClick = () => {
    setShowOptionsMenu(false); // Close a_ellipsis menu
    setShowDeleteConfirmModal(true); // Open confirmation modal
  };

  const confirmDelete = async () => {
    if (!onDelete) return;
    setIsDeleting(true);
    try {
      await onDelete(comment._id); // This is actually calling handleDeleteComment in CommentSection
      // CommentSection will handle optimistic UI removal.
      setShowDeleteConfirmModal(false); // Close confirm modal on success
    } catch (error) {
      console.error("Failed to delete comment from CommentItem:", error);
      // Error message can be shown if CommentSection doesn't show one based on context error
    } finally {
      setIsDeleting(false);
    }
  };


  return (
    <> {/* Wrap in Fragment to allow modal to be a sibling */}
    <motion.div
      className="flex items-start space-x-2 py-2.5 px-1 group relative"
      layout // Enables layout animations if order changes, etc.
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Avatar */}
      <Link href={`/profile/${comment.creator.user_name}`}>
        <a className="flex-shrink-0 cursor-pointer">
          <ProfilePicture image={comment.creator.profile_picture} size="w-8 h-8" /> {/* 32px */}
        </a>
      </Link>

      <div className="flex-grow">
        {/* Username and Comment Text */}
        {isEditing ? (
          <div className="w-full">
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full text-sm p-2 border border-gray-300 dark:border-gray-600 rounded-md resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-brandprimary focus:border-brandprimary"
              rows={3} // Adjust as needed, can implement auto-grow
              autoFocus
            />
            <div className="flex items-center justify-end space-x-2 mt-1.5">
              <button
                onClick={handleCancelEdit}
                className="px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={isSavingEdit || editedContent.trim() === ''}
                className={`px-3 py-1 text-xs font-medium text-white rounded-md transition-colors ${
                  editedContent.trim() === '' || isSavingEdit
                    ? 'bg-blue-300 dark:bg-blue-700 opacity-60 cursor-not-allowed'
                    : 'bg-brandprimary hover:bg-blue-700'
                }`}
              >
                {isSavingEdit ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Username and Comment Text */}
            <div className="text-sm bg-gray-100 dark:bg-gray-800 rounded-xl px-3 py-2">
              <Link href={`/profile/${comment.creator.user_name}`}>
                <a className="font-semibold text-gray-900 dark:text-white hover:underline cursor-pointer">
                  {comment.creator.user_name}
                </a>
              </Link>
              {' '}
              <span className="text-gray-800 dark:text-gray-200" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {comment.content} {/* Display original comment.content, it will update when parent list re-renders */}
              </span>
            </div>

            {/* Timestamp and other actions */}
            <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400 mt-1 pl-3">
              <span>{formatTimeAgo(comment.createdAt)}</span>
              {/* {comment.isEdited && <span className="italic">(edited)</span>} Placeholder for edited indicator */}
            </div>
          </>
        )}
      </div>

      {/* More Options Button for own comment - only show if not editing */}
      {isOwnComment && !isEditing && (
        <div className="flex-shrink-0 relative" ref={optionsMenuRef}>
          <button
            onClick={() => setShowOptionsMenu(!showOptionsMenu)}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
            aria-label="Comment options"
          >
            <EllipsisHorizontalIcon className="w-5 h-5" />
          </button>
          {showOptionsMenu && (
            <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10 py-1">
              <button
                onClick={handleEditClick}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Edit
              </button>
              <button
                onClick={handleDeleteClick}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </motion.div>

    {showDeleteConfirmModal && (
      <ConfirmActionModal
        isOpen={showDeleteConfirmModal}
        onClose={() => setShowDeleteConfirmModal(false)}
        onConfirm={confirmDelete}
        title="Delete Comment"
        message="Are you sure you want to delete this comment? This action cannot be undone."
        confirmButtonText="Delete"
        isConfirming={isDeleting}
      />
    )}
    </>
  );
};

export default CommentItem;
