
import { SignIn } from '@clerk/clerk-react'
import React from 'react'

function SignInPage() {
  return (
    <div className='flex justify-center items-center h-screen w-full'>
      <SignIn />
    </div>
  )
}

export default SignInPage
