
import { SignUp, SignIn } from '@clerk/clerk-react'
import React from 'react'

function SignUpPage() {
  return (
    <div className='flex justify-center items-center h-screen w-full'>
      {/* <SignUp /> */}
      <SignIn />
    </div>
  )
}

export default SignUpPage
