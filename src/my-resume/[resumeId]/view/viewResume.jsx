import Header from '@/components/custom/header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/resumeInfoContext'
import ResumePreviewSection from '@/dashboard/components/resumePreview'
import React, { useEffect, useState } from 'react'
import GlobalApi from './../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'

function ViewResume() {
    const [resumeInfo, setResumeInfo] = useState();
    const { resumeId } = useParams();

    useEffect(() => {
        GetResumeInfo()
    }, [])

    const GetResumeInfo = () => {
        GlobalApi.GetResumeById(resumeId).then(resp => {
            console.log(resp.data.data);
            setResumeInfo(resp.data.data)
        })
    }
    const handleDownload = () => {
        window.print();
    }

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div id='noPrintArea'>
                <Header />
                <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
                    <h2 className='text-center text-2xl font-medium'>Congrats! Your ultimate AI generated resume is ready!</h2>
                    <p className='text-center text-gray-400'>Now you are ready to download your resume and you can share your unique resume url with your friends and family</p>
                    <div className='flex  justify-between my-10 px-30'>
                        <Button onClick={handleDownload}>Download</Button>
                        <Button>Share</Button>
                    </div>
                </div>
            </div>
            <div className='my-10 md:mx-20 lg:mx-36'>
                <div id='printArea'>
                    <ResumePreviewSection />
                </div>
            </div>
        </ResumeInfoContext.Provider>
        
    )
}

export default ViewResume
