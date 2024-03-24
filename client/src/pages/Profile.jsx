import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MdDateRange } from 'react-icons/md';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import PostExcerpt from '../features/posts/PostExcerpt';
import { useGetPostsQuery } from '../features/posts/postSlice';
import {
  useGetUserQuery,
  useSetNewPasswordMutation,
  useSetNewUsernameMutation,
  useSignoutMutation,
} from '../features/auth/authApiSlice';
import { formatJoinedDateTime } from '../utils/formatDate';
import { useDispatch } from 'react-redux';
import { logout, setCredentials } from '../features/auth/authSlice';

const Profile = () => {
  const { email: profileEmail } = useParams();
  const { isSuccess, isLoading, data: postsData } = useGetPostsQuery();
  const { data: userData } = useGetUserQuery(profileEmail);
  const [setNewUsername] = useSetNewUsernameMutation();
  const [setNewPassword] = useSetNewPasswordMutation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [errorUsername, setErrorUsername] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const nav = useNavigate();
  const dispatch = useDispatch();

  let content;
  let postsCount;
  let joinedDate;
  if (isLoading) return (content = <p>Loading...</p>);
  if (isSuccess) {
    joinedDate = formatJoinedDateTime(userData?.createdAt);
    const { entities, ids } = postsData;
    const userPostsIds = ids.filter(
      (postId) => entities[postId].userId === userData?._id
    );
    postsCount = userPostsIds.length;
    content = userPostsIds.map((postId) => (
      <PostExcerpt key={postId} postId={postId} />
    ));
  }

  const handleClickSaveUsername = async () => {
    if (!username) {
      return setErrorUsername('new username is required');
    }
    try {
      const accessToken = await setNewUsername({
        email: profileEmail,
        username,
      }).unwrap();
      dispatch(setCredentials({ accessToken }));
      nav('/');
    } catch (error) {
      setErrorUsername(error);
    }
  };

  const handleClickSavePassword = async () => {
    if (!password || !currentPassword) {
      return setErrorPassword('new password is required');
    }
    try {
      await setNewPassword({
        email: profileEmail,
        newPassword: password,
        currentPassword,
      }).unwrap();
      dispatch(logout());
    } catch (error) {
      setErrorPassword(error);
    }
  };

  return (
    <div>
      <div className="flex">
        <Link
          className=" rounded-full flex items-center space-x-2 p-4 hover:underline"
          to={'/'}
        >
          <FaArrowLeft />
          <p className="font-semibold text-lg">Go back</p>
        </Link>
      </div>

      {/* profile */}
      <div>
        <div className="flex items-center space-x-2 p-4">
          <Avatar className="h-28 w-28">
            <AvatarImage src={userData?.photoUrl} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="scroll-m-20 text-3xl font-bold tracking-tight first:mt-0">
              {userData?.username}
            </h2>
            <p className="text-slate-500">{userData?.email}</p>
          </div>
          {userData?.isOwner && (
            <div className="flex-1 flex justify-end">
              <Dialog>
                <DialogTrigger className="py-2 px-4 border border-slate-200 rounded-full font-semibold hover:bg-slate-200">
                  Edit Profile
                </DialogTrigger>
                <DialogContent>
                  <Tabs defaultValue="account" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="account">Username</TabsTrigger>
                      <TabsTrigger value="password">Password</TabsTrigger>
                    </TabsList>

                    {/* username */}
                    <TabsContent value="account">
                      <Card>
                        <CardHeader>
                          <CardTitle>Username</CardTitle>
                          <CardDescription>
                            Make changes to your Username here. Click save when
                            you're done.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="space-y-1">
                            <Label htmlFor="name">Current Username</Label>
                            <input
                              id="name"
                              readOnly
                              className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 read-only:outline-none hover:cursor-not-allowed"
                              defaultValue={userData?.username}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="username">Username</Label>
                            <Input
                              id="username"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                            />
                            {errorUsername && (
                              <p className="text-xs text-red-500">
                                {errorUsername}
                              </p>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button onClick={handleClickSaveUsername}>
                            Save changes
                          </Button>
                        </CardFooter>
                      </Card>
                    </TabsContent>

                    {/* password */}
                    <TabsContent value="password">
                      <Card>
                        <CardHeader>
                          <CardTitle>Password</CardTitle>
                          <CardDescription>
                            Make changes to your Password here. You will be
                            logged out after you successfully change your
                            password
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="space-y-1">
                            <Label htmlFor="current">Current password</Label>
                            <Input
                              id="current"
                              type="password"
                              value={currentPassword}
                              onChange={(e) =>
                                setCurrentPassword(e.target.value)
                              }
                            />
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="new">New password</Label>
                            <Input
                              id="new"
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            {errorPassword && (
                              <p className="text-xs text-red-500">
                                {errorPassword}
                              </p>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button onClick={handleClickSavePassword}>
                            Save password
                          </Button>
                        </CardFooter>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
        <div className="border-y p-4">
          <div className="flex items-center space-x-1">
            <MdDateRange />
            <p>Joined {joinedDate}</p>
          </div>
          <div>
            {postsCount} {postsCount > 1 ? 'posts' : 'post'}
          </div>
        </div>
      </div>

      {/* posts */}
      <div>{content ?? <p>No post yet</p>}</div>
    </div>
  );
};

export default Profile;
