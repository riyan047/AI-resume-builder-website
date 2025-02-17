import React from 'react'

function PersonalDetailsPreview({resumeInfo}) {
  return (
    <div>
      <h2>{resumeInfo?.firstName}{resumeInfo?.lastName}</h2>
    </div>
  )
}

export default PersonalDetailsPreview
