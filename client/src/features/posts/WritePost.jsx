import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCreatePostMutation } from './postSlice';
import useAuth from '@/hooks/useAuth';
const WritePost = () => {
  const { _id, photoUrl } = useAuth();

  const [post, setPost] = useState('');
  const [createPost] = useCreatePostMutation();

  const onClickHandlerForCreatePost = async () => {
    await createPost({ content: post, userId: _id });
    setPost('');
  };
  return (
    <div className=" p-4 space-y-4">
      <div className="flex space-x-2">
        <Avatar>
          <AvatarImage src={photoUrl} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <textarea
          value={post}
          onChange={(e) => {
            setPost(e.target.value);
          }}
          className="w-full min-h-[100px]  h-auto resize-none focus:border-none border-none focus:outline-none px-0 align-top sm:text-lg"
          rows={4}
          placeholder="Create a post"
        />
      </div>
      <div className="border-t flex justify-end">
        <button
          disabled={post ? false : true}
          className="px-8 mt-2 py-2 rounded-full bg-blue-500 cursor-pointer hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-300 text-white"
          onClick={onClickHandlerForCreatePost}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default WritePost;
