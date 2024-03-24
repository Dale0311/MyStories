import React, { useRef } from 'react';
import { useGetPostQuery, useInteractToPostMutation } from './postSlice';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  FaArrowLeft,
  FaRegComment,
  FaRegHeart,
  FaHeart,
  FaVolumeMute,
} from 'react-icons/fa';

import _404 from '@/src/pages/_404';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { formatDateTime } from '@/src/utils/formatDate';
import Comment from './Comment';
import PostComment from './PostComment';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import EditPopover from '@/src/comp/EditPopover';
import DeletePopover from '@/src/comp/DeletePopover';
import useAuth from '@/hooks/useAuth';

const Post = () => {
  const { postId } = useParams();
  const { _id: userId, photoUrl, username, email } = useAuth();
  const [interactToPost] = useInteractToPostMutation();
  const nav = useNavigate();
  const popOverRef = useRef(null);
  // this is coming from userSlice

  // validation for postID
  if (!postId) return nav('/');

  // query the post
  const { isError, isLoading, isSuccess, data: post } = useGetPostQuery(postId);

  // if post doesn't exist
  if (isError) return <_404 />;

  // if exist, create a heartExcerpt
  let heartReact;
  let commentsCount;
  let commentsOnPost;
  if (isSuccess) {
    const likeCounts = post.likes.length;
    commentsCount = post.comments.length;

    commentsOnPost = post.comments.map((comment) => (
      <Comment
        key={comment._id}
        comment={comment}
        currentUserId={userId}
        postId={postId}
        postUserId={post.userId}
      />
    ));
    const userLikeThePost = post.likes.includes(userId);
    if (!userLikeThePost) {
      heartReact = (
        <>
          <div className="group-hover:bg-opacity-20 p-3 cursor-pointer rounded-full group-hover:bg-[#F91880]">
            <FaRegHeart className="group-hover:text-[#F91880]" />
          </div>
          <p className="group-hover:text-[#F91880]">{likeCounts}</p>
        </>
      );
    } else {
      heartReact = (
        <>
          <div className="group-hover:bg-opacity-20 p-3 cursor-pointer rounded-full group-hover:bg-[#F91880]">
            <FaHeart className="text-[#F91880]" />
          </div>
          <p className="text-[#F91880]">{likeCounts}</p>
        </>
      );
    }
  }

  // handleLikeClick fn
  const handleClickLike = async () => {
    await interactToPost({ postId, userId });
  };

  // render ui
  return (
    <div>
      <div className="flex">
        <Link
          className="rounded-full flex items-center space-x-2 p-4 hover:underline"
          to={'/'}
        >
          <FaArrowLeft />
          <p className="font-semibold text-lg">Post</p>
        </Link>
      </div>
      <div className="p-4 flex justify-between border-t">
        <div className="flex space-x-2">
          <div>
            <Avatar>
              <AvatarImage src={post.userInfo.photoUrl} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="space-y-2">
            <div className="space-x-1 flex items-center">
              <Link
                className="font-semibold text-lg"
                to={`/${post.userInfo.email}`}
              >
                {post.userInfo.username}
              </Link>
              <Link
                className="text-sm text-slate-500"
                to={`/${post.userInfo.email}`}
              >
                {post.userInfo.email}
              </Link>
            </div>
            {post?.content ? <p className="text-lg">{post.content}</p> : null}
            {post?.createdAt ? (
              <p className="text-slate-500 text-sm">
                {formatDateTime(post.createdAt)}
              </p>
            ) : null}
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
                  postId={postId}
                  currentUserId={userId}
                  postUserId={post?.userId}
                  popOverRef={popOverRef}
                />
                <EditPopover
                  currentUserId={userId}
                  postId={postId}
                  post={post ?? null}
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
      <div className="flex space-x-2 p-4 border-y text-xl justify-between">
        <div className="flex space-x-4">
          <div
            className="text-slate-500 flex items-center group cursor-pointer"
            onClick={handleClickLike}
          >
            {heartReact}
          </div>

          {/* comments count */}
          <div className="text-slate-500 flex space-x-1 items-center group cursor-pointer">
            <div className="group-hover:bg-opacity-20 p-3 cursor-pointer rounded-full group-hover:bg-[#1D9BF0]">
              <FaRegComment className="group-hover:text-[#1D9BF0]" />
            </div>
            <p className="group-hover:text-[#1D9BF0]">{commentsCount}</p>
          </div>
        </div>
      </div>

      {/* post your reply */}
      <PostComment postId={postId} userId={userId} photoUrl={photoUrl} />

      {/* comments */}
      {commentsOnPost}
    </div>
  );
};
export default Post;
