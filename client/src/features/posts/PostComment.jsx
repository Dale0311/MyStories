import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCommentOnPostMutation } from '../comments/commentSlice';

const PostComment = ({ postId, userId, photoUrl }) => {
  const [comment, setComment] = useState('');
  const [commentOnPostMutation] = useCommentOnPostMutation();
  const canSave = Boolean(comment);

  const handleClickPost = async () => {
    await commentOnPostMutation({ postId, userId, content: comment });
    setComment('');
  };
  return (
    <div className="p-4 flex space-x-4">
      <Avatar>
        <AvatarImage src={photoUrl} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className="flex-1 text-xl">
        <div>
          <label htmlFor="comment" className="sr-only">
            comment
          </label>

          <div className="overflow-hidden">
            <textarea
              id="comment"
              className="w-full min-h-[100px]  h-auto resize-none focus:border-none border-none focus:outline-none px-0 align-top sm:text-lg"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              placeholder="Post your reply"
            />

            <div className="flex items-center justify-end gap-2 py-3">
              <button
                disabled={!canSave}
                className="px-8 mt-2 py-2 rounded-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white disabled:cursor-not-allowed"
                onClick={handleClickPost}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComment;
