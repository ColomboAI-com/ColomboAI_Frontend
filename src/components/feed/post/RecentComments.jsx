import CommentItem from "@/components/comment/CommentItem"; // Import the new CommentItem
// Removed Link import as it's handled within CommentItem

// Assuming comments prop is an array of comment objects
// [{ _id, creator: { user_name, profile_picture }, content, createdAt }, ...]
// currentUserId might be needed if RecentComments should show edit/delete, but typically not for this preview.
export default function RecentComments({ comments, currentUserId }) {
  if (!comments?.length) {
    // Optionally, show "No comments yet" or "Be the first to comment" if it's a main view,
    // but for "RecentComments" in a feed card, null is fine if empty.
    return null;
  }

  // Typically, RecentComments shows only a few, e.g., the latest 2-3.
  // The `comments` prop should ideally already be sliced by the parent if so.
  // For this component, we'll just map what's given.

  return (
    <div className="mt-2 space-y-1"> {/* Adjusted margin and added space-y for CommentItem spacing */}
      {comments.map((comment) => (
        <CommentItem
          key={comment._id}
          comment={comment}
          currentUserId={currentUserId} // Pass currentUserId if available and needed by CommentItem
        />
      ))}
      {/* Optionally, add a "View all X comments" link here if not all comments are shown */}
      {/* This would typically trigger opening the full CommentSection modal */}
    </div>
  );
}
