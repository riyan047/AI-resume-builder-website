import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/resumeInfoContext'
import { LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../service/GlobalApi'
import { toast } from 'sonner'

function Education() {
    const [educationList, setEducationList] = useState([
        {
            universityName: '',
            degree: '',
            major: '',
            startDate: '',
            endDate: '',
            description: ''
        }
    ])

    const [loading, setLoading] = useState(false);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const params = useParams();

    const handleChange = (e, index) => {
        const newEntries = educationList.slice();
        const { name, value } = e.target;
        newEntries[index][name] = value;
        setEducationList(newEntries);
        console.log(newEntries);
    }

    const addNewEducation = () => {
        setEducationList([...educationList, {
            universityName: '',
            degree: '',
            major: '',
            startDate: '',
            endDate: '',
            description: ''
        }])
    }

    const removeEducation = () => {
        setEducationList(educationList => educationList.slice(0, -1))
    }


    const onSave = () => {
        setLoading(true)
        const data ={
            data:{
                education:educationList
            }
        }

        GlobalApi.UpdateResumeDetails(params.resumeId, data).then(resp => {
            console.log(resp);
            setLoading(false)
            toast('Details updated!')
        }, (error)=>{
            setLoading(false);
            toast('Server error, please try again')
        })

    }

    useEffect(() => {
        setResumeInfo(prev => ({
            ...prev,
            education: educationList
        }));
    }, [educationList, setResumeInfo]);



    return (
        <div className='p-5 shadow-lg rounded-lg '>
            <h2 className='font-bold text-lg'>Education</h2>
            <p>Add your previous educational details</p>
            <div>
                {educationList.map((item, index) => (
                    <div key={index}>
                        <div className='grid grid-cols-2 p-3 gap-3 my-5 border rounded-lg'>
                            <div className='col-span-2'>
                                <label >University Name</label>
                                <Input name='universityName' onChange={(e) => handleChange(e, index)} />
                            </div>
                            <div>
                                <label >Degree</label>
                                <Input name='degree' onChange={(e) => handleChange(e, index)} />
                            </div>
                            <div>
                                <label >Major</label>
                                <Input name='major' onChange={(e) => handleChange(e, index)} />
                            </div>
                            <div>
                                <label >Start Date</label>
                                <Input name='startDate' type='date' onChange={(e) => handleChange(e, index)} />
                            </div>
                            <div>
                                <label >End Date</label>
                                <Input name='endDate' type='date' onChange={(e) => handleChange(e, index)} />
                            </div>
                            <div className='col-span-2'>
                                <label >Description</label>
                                <Textarea name='description' onChange={(e) => handleChange(e, index)} />
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <div className='flex gap-2'>
                                <Button onClick={addNewEducation} variant='outline'>Add more Education details</Button>
                                <Button onClick={removeEducation} variant='outline'>Remove</Button>
                            </div>
                            <Button disabled={loading} onClick={() => onSave()}>
                                {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                            </Button>


                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default Education
