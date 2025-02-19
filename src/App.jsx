import { useUser } from '@clerk/clerk-react'
import './App.css'
import { Button } from './components/ui/button'
import { Navigate, Outlet } from 'react-router-dom'
import Header from './components/custom/header';
import { Toaster } from './components/ui/toaster';

function App() {

  const {user, isLoaded, isSignedIn} = useUser();

  if(!isSignedIn && isLoaded){
    return <Navigate to={'auth/sign-in'} />
  }
  
  return (
    <>
      <Header />
      <Outlet />
       <Toaster />
    </>
  )
}

export default App
