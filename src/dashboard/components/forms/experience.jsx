import React, { useState } from 'react'

const formField= {
    title:'', 
    companyName:'',
    city:'',
    state:'', 
    startDate:'',
    endDate:'',
    workSummary:''


}

function Experience() {
    const [experienceList, setExperiencedList] = useState([formField])
  return (
    <div>
        <div className='p-5 shadow-lg rounded-lg '>
            <h2 className='font-bold text-lg'>Personal Details</h2>
            <p>Get started with the basic information</p>
        </div>
    </div>
  )
}

export default Experience
