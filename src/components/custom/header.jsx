import React from 'react';
import { Button } from '../ui/button';
import { Link, useLocation } from 'react-router-dom';
import { UserButton, useUser } from '@clerk/clerk-react';
import { Brain } from 'lucide-react';

function Header() {
  const { isSignedIn } = useUser();
  const location = useLocation(); // to get current route

 
  const getBackground = () => {
    if (location.pathname === '/') {
      return ''; 
    } else {
      return 'bg-gradient-to-br from-black via-zinc-900 to-neutral-900'; 
    }
  };

  return (
    <div className={`flex justify-between p-3 px-10 shadow-md items-center ${getBackground()}`}>
      <div className='flex justify-between items-center space-x-2 w-2xl '>
        <Link to={'/'} className='flex space-x-2 mb-4 md:mb-0 items-center'>
          <Brain className="w-6 h-6 text-blue-400" />
          <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">
            ResumeCraft
          </div>
        </Link>
      </div>

      {location.pathname === '/' ? (
        <div className="hidden md:flex space-x-8">
          <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
          <a href="#about" className="text-gray-300 hover:text-white transition">About</a>
        </div>
      ) : null}

      {isSignedIn ? (
        <div className='flex gap-3 items-center '>
          <Link to={'/dashboard'}>
            <Button variant="outline">Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <Link to={'/auth/sign-up'}>
          <Button variant="outline"> Get Started</Button>
        </Link>
      )}
    </div>
  );
}

export default Header;
