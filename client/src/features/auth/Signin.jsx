import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSigninMutation } from './authApiSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const nav = useNavigate();
  const [signin] = useSigninMutation();

  const dispatch = useDispatch();

  // check if all of the required states have value
  const canSubmit = [email, password].every(Boolean);

  const handleSubmit = async () => {
    if (!canSubmit) {
      setError('all fields are required');
      return;
    }
    setError('');
    try {
      const accessToken = await signin({ email, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      nav('/');
    } catch (error) {
      setError(error);
    }
  };
  console.log(error);
  return (
    <div className="min-h-[100vh] flex justify-center items-center bg-[#F2F2F2]">
      <div className="bg-white p-4 rounded w-1/4 space-y-2">
        <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Sign in to your account
        </h1>
        <div className="space-y-4">
          <Input
            type="email"
            required
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <div>
            <Input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button
            onClick={handleSubmit}
            className="mt-6 bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md transition duration-300"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
