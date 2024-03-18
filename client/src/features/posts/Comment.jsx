import React, { useRef, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FaRegComment, FaRegHeart, FaVolumeMute } from 'react-icons/fa';
import { formatCommentDate } from '@/src/utils/formatDate';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import EditPopover from '@/src/comp/EditPopover';
import DeletePopover from '@/src/comp/DeletePopover';

const Comment = ({ postId, comment, currentUserId, postUserId }) => {
  const popOverRef = useRef(null);
  const updatedAt = comment.updatedAt;
  const timeAgo = formatCommentDate(updatedAt);

  return (
    <div className="p-4 flex max-w-full cursor-pointer space-x-2 hover:bg-slate-100 border-t whitespace-normal text-wrap">
      <div>
        <Avatar>
          <AvatarImage src={comment.userInfo.photoUrl} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      {/* if needed i can treat comment as a post aswell */}
      <div to={`/profile/posts/${postId}`} className="space-y-1">
        <div className="space-x-1 flex items-center">
          <p className="font-semibold text-lg">{comment.userInfo.username}</p>
          <p className="text-sm text-slate-500">{comment.userInfo.email}</p>
          <p className="text-sm text-slate-500">· {timeAgo}</p>
        </div>

        <div className="whitespace-normal max-w-full">{comment.content}</div>
        <div className="flex space-x-2">
          <div className="text-slate-500 flex space-x-1 items-center">
            <FaRegHeart />
            <p>22k</p>
          </div>
          <div className="text-slate-500 flex space-x-1 items-center">
            <FaRegComment />
            <p>44</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex justify-end items-start">
        <Popover>
          <PopoverTrigger
            className="p-4 hover:bg-[#1D9BF0] rounded-full hover:text-[#1D9BF0] hover:bg-opacity-20"
            ref={popOverRef}
          >
            <HiOutlineDotsHorizontal className="text-lg" />
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <ul className="font-semibold">
              <DeletePopover
                comment={comment}
                postId={postId}
                postUserId={postUserId}
                currentUserId={currentUserId}
                popOverRef={popOverRef}
              />
              <EditPopover
                currentUserId={currentUserId}
                comment={comment}
                postId={postId}
                popOverRef={popOverRef}
              />
              <li className="space-x-2 cursor-pointer hover:bg-slate-100 flex p-4 items-center">
                <FaVolumeMute />
                <p>Mute</p>
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Comment;
