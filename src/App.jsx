import { useUser } from '@clerk/clerk-react'
import './App.css'
import { Navigate, Outlet } from 'react-router-dom'
import Header from './components/custom/header';
import { Toaster } from 'sonner';


function App() {

  const {isLoaded, isSignedIn } = useUser();

  if (!isSignedIn && isLoaded) {
    return <Navigate to={'auth/sign-up'} />
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
