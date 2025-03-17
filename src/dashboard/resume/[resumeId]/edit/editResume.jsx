
import { ResumeInfoContext } from '@/context/resumeInfoContext';
import FormSection from '@/dashboard/components/formSection';
import ResumePreviewSection from '@/dashboard/components/resumePreview';
import dummy from '@/data/dummy';
import React from 'react'
import { useEffect, useState } from 'react'
import { Form, useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi';

function EditResume() {
  const params = useParams();
  const {resumeId} = useParams();
  const [resumeInfo, setResumeInfo] = useState();
  
  
  useEffect(() => {
    
    GetResumeInfo();
    
  }, [])
  
  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId).then(resp => {
      console.log(resp.data.data);
      setResumeInfo(resp.data.data)
    })
  }

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
        <FormSection />
        <ResumePreviewSection />
      </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume
