import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useDropzone } from 'react-dropzone';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { X } from 'lucide-react';
import { useSignupMutation } from './authApiSlice';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  // states
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState({
    previewImage: null,
    picture: null,
  });
  const [error, setError] = useState([]);
  const nav = useNavigate();
  const [signup] = useSignupMutation();

  // check if all of the required states have value
  const canSubmit = [username, email, password].every(Boolean);

  // using react-dropzone
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      accept: {
        'image/jpeg': ['.jpeg', '.jpg', '.png'],
      },
      maxFiles: 1,
      maxSize: 2097152,
      onDropRejected: (acceptedFiles) => {
        const fileErrors = acceptedFiles[0].errors;
        // get the first error that occur in this conditional if
        if (acceptedFiles.length > 1) {
          setError((existingError) => {
            const fieldsRequired = existingError.find(
              (e) => e.code === 'fields-required'
            );
            const err = fieldsRequired
              ? [
                  fieldsRequired,
                  { code: 'too-many-files', message: 'Too many files' },
                ]
              : [{ code: 'too-many-files', message: 'Too many files' }];
            return err;
          });
        }

        if (acceptedFiles.length === 1 && fileErrors) {
          setError((existingError) => {
            const fieldsRequired = existingError.find(
              (e) => e.code === 'fields-required'
            );
            const toAddErrors =
              fileErrors.length > 1
                ? fileErrors.map((e) => e)
                : [fileErrors[0]];
            return fieldsRequired
              ? [fieldsRequired, ...toAddErrors]
              : [...toAddErrors];
          });
        }
        setFile({
          previewImage: null,
          picture: null,
        });
      },
      onDropAccepted: (acceptedFiles) => {
        const file = acceptedFiles[0];
        const preview = URL.createObjectURL(file);

        // we want the fieldsRequired error to persist if it exist because we are modifying the drag n drop and not the inputs`
        setError((existingError) => {
          const fieldsRequired = existingError.find(
            (e) => e.code === 'fields-required'
          );

          return fieldsRequired ? [fieldsRequired] : [];
        });
        setFile({ picture: file, previewImage: preview });
      },
    });

  // handle click for removing picture
  const handleRemoveInputPicture = () => {
    setError([]);
    setFile({
      previewImage: null,
      picture: null,
    });
  };

  // handle submit the data to specific endpoint
  const handleSubmit = async () => {
    // if all or one of the fields doesn't have any value.
    if (!canSubmit) {
      return setError((existingError) => {
        // find the fieldsRequire error if existing
        const fieldsRequiredError = existingError.find(
          (e) => e.code === 'fields-required'
        );

        // if fieldsRequire exist then return the current error state, else append the fieldsRequire error.
        return fieldsRequiredError
          ? [...existingError]
          : [
              ...existingError,
              {
                code: 'fields-required',
                message: 'Username, email and password are required',
              },
            ];
      });
    }
    const formData = new FormData();
    formData.append('file', file.picture);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    try {
      await signup(formData).unwrap();
      nav('/signin');
    } catch (error) {
      // handle error
      setError([{ code: 'email-exist', message: 'email already exist' }]);
    }
  };

  return (
    <div className="min-h-[100vh] flex justify-center items-center bg-[#F2F2F2]">
      <div className="bg-white p-4 rounded w-1/4 space-y-2">
        <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Create new account
        </h1>

        {/* Inputs */}
        <div className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Input
              type="text"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
            <p className="text-xs">This is your public display name.</p>
          </div>
          <Input
            type="email"
            name="emil"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <Input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="picture" className="text-lg font-semibold mb-2">
              Profile picture{' '}
              <span className="text-sm text-gray-500">(Optional)</span>
            </Label>

            {/* i can create custom component out of this */}
            <div
              {...getRootProps({
                className: `border-2 border-dashed ${
                  isDragReject ? 'border-red-300' : 'border-gray-300'
                } rounded-md p-6 flex flex-col items-center justify-center cursor-pointer`,
              })}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="text-gray-400">Drop the files here...</p>
              ) : (
                <p className="text-gray-400">
                  Drag n Drop an image here, or click to select a file
                </p>
              )}
            </div>
            {file?.previewImage && (
              <div className="p-4">
                <div className="flex justify-between text-gray-500 text-sm p-2 w-11/12">
                  <p>File</p>
                  <p>Preview</p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center justify-between w-11/12 bg-gray-50 p-2 ">
                    <p>
                      {file.picture.name} - {`${file.picture.size} bytes`}
                    </p>
                    <Avatar>
                      <AvatarImage src={file.previewImage} alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                  <X
                    className="h-4 w-4 text-gray-500 hover:cursor-pointer hover:text-red-500"
                    onClick={handleRemoveInputPicture}
                  />
                </div>
              </div>
            )}
          </div>
          {error.length >= 1 && (
            <ul>
              {error.map((e) => (
                <li key={e.code} className="text-sm text-red-500">
                  {e.message}
                </li>
              ))}
            </ul>
          )}
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

export default Signup;
