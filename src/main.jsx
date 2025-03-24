import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignIn from './auth/signin/signIn'
import Home from './home/home'
import { ClerkProvider } from '@clerk/clerk-react'
import EditResume from './dashboard/resume/[resumeId]/edit/editResume'
import Dashboard from './dashboard/dashboard'
import ViewResume from './my-resume/[resumeId]/view/viewResume'


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const router = createBrowserRouter([
  {
    element: <App />,
    children:[
      {
        path:'/dashboard',
        element: <Dashboard />
      },{
        path:'/dashboard/resume/:resumeId/edit',
        element: <EditResume />
      }
    ]
  },
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/auth/sign-in', 
    element: <SignIn />
  },{
    path:'/my-resume/:resumeId/view',
    element: <ViewResume />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} >
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>,
)
