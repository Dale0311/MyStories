import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  IoHomeOutline,
  IoHome,
  IoPerson,
  IoPersonOutline,
} from 'react-icons/io5';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const Navbar = () => {
  const currPath = useLocation().pathname;
  const activeClassName =
    'text-xl bg-slate-100 p-4 group rounded flex items-center space-x-2 font-semibold';
  const className =
    'text-xl hover:bg-slate-100 p-4 rounded flex items-center space-x-2';

  return (
    <div className="flex flex-col p-4 justify-between h-full">
      <div className="flex flex-col mt-4 space-y-4">
        <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          My Stories
        </h1>
        <div className="flex flex-col space-y-2">
          <NavLink
            to={'.'}
            className={({ isActive }) =>
              isActive ? activeClassName : className
            }
            end
          >
            {currPath === '/' ? <IoHome /> : <IoHomeOutline />}
            <p>Home</p>
          </NavLink>
          <NavLink
            to={'profile'}
            className={({ isActive }) =>
              isActive ? activeClassName : className
            }
          >
            {currPath === '/profile' ? <IoPerson /> : <IoPersonOutline />}
            <p>Profile</p>
          </NavLink>
        </div>
      </div>
      <Popover>
        <PopoverTrigger>
          <div className="flex justify-between items-center p-3 hover:bg-slate-200 rounded-full">
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="">
                <p className="font-semibold text-lg">Dale Cabarle</p>
                <p className="text-sm text-slate-500">@MrDaleCabarle</p>
              </div>
            </div>
            <div className="justify-self-end text-2xl">
              <HiOutlineDotsHorizontal />
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <Link className="hover:underline font-semibold">Sign out</Link>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Navbar;
