import React from 'react'

function ExperiencePreview({ resumeInfo }) {
  return (
    <div>
      <h2 className='text-center font-bold text-sm mb-2 mt-2'>Professional Experience</h2>
      <hr className='border-black border-[1.5px]' />
      {resumeInfo?.experience.map((experience, index) => (
        <div key={index} className='my-5'>
          <h2 className='text-sm font-bold'>{experience?.title}</h2>
          <h2 className='text-xs flex justify-between mt-2'>{experience?.companyName},
            {experience?.city},
            {experience?.state}
            <span>{experience?.startDate} - {experience?.currentlyWorking ? "Present" : experience?.endDate}</span>
          </h2>
          {/* <p className='text-xs my-2'>
            {experience?.workSummary}
          </p> */}

          <div className='text-xs' dangerouslySetInnerHTML={{__html:experience?.workSummary}}/>
        </div>
      ))}
    </div>
  )
}

export default ExperiencePreview
