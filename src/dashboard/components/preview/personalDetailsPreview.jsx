import React from 'react'

function PersonalDetailsPreview({resumeInfo}) {
  return (
    <div className='font-bold text-center text-xl'>
      <h2>{resumeInfo?.firstName} {resumeInfo?.lastName}</h2>
      <h2 className='text-sm text-center font-medium'>{resumeInfo?.jobTitle}</h2>
      <h2 className='text-sm text-center font-normal'>{resumeInfo?.address}</h2>

      <div className='flex justify-between gap-2'>
        <h2 className='text-xs text-center font-normal'>{resumeInfo?.phone}</h2>
        <h2 className='text-xs text-center font-normal'>{resumeInfo?.email}</h2>
      </div>
      <hr className='my-2 border-black border-[1.5px]' />
    </div>
  )
}

export default PersonalDetailsPreview
