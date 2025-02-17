import React, { useEffect, useState } from 'react'
import AddResume from './components/addResume'
import GlobalApi from './../../service/GlobalApi'
import { useUser } from '@clerk/clerk-react'
import { data } from 'react-router-dom'
import ResumeCardItem from './components/ResumeCardItem'

function Dashboard() {
  const {user} = useUser();
  const [resumeList, setResumeList] = useState([]);


  useEffect(()=>{
    user && GetResumeList()
  },[user])

    //fetching user resume list based on the email address
  const GetResumeList = () => {
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
    .then(res => {
      setResumeList(res.data.data);
    })
  }

  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='text-3xl font-bold'>My Resume</h2>
      <p className='py-4'>Start Creating AI resume for your next Job role</p>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
        <AddResume />
        { resumeList.length>0 && resumeList.map((resume, index)=> 
          (<ResumeCardItem resume={resume} key={index} />)
        )}
      </div>
    </div>
  )
}

export default Dashboard
