import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/resumeInfoContext'
import { UserCircle as LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../service/GlobalApi'
import { toast } from 'sonner'

const formField = {
    universityName: '',
    degree: '',
    major: '',
    startDate: '',
    endDate: '',
    description: ''
}

function Education() {
    const [educationList, setEducationList] = useState([]);
    const [loading, setLoading] = useState(false);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const params = useParams();

    
    useEffect(() => {
        if (resumeInfo?.education && resumeInfo.education.length > 0) {
            setEducationList(resumeInfo.education);
        } else {
            setEducationList([formField]);
        }
    }, [resumeInfo?.education]);

    useEffect(() => {
        if (educationList?.length > 0) {
            setResumeInfo({
                ...resumeInfo,
                education: educationList
            });
        }
    }, [educationList]);

    const handleChange = (e, index) => {
        const newEntries = [...educationList];
        const { name, value } = e.target;
        newEntries[index][name] = value;
        setEducationList(newEntries);
    }

    const addNewEducation = () => {
        setEducationList([...educationList, formField]);
    }

    const removeEducation = () => {
        if (educationList.length > 1) {
            setEducationList(educationList => educationList.slice(0, -1));
        }
    }

    const onSave = () => {
        setLoading(true);
        const data = {
            data: {
                education: educationList.map(({ id, ...rest }) => rest)
            }
        }

        GlobalApi.UpdateResumeDetails(params.resumeId, data).then(resp => {
            console.log(resp);
            setLoading(false);
            toast('Details updated!');
        }, (error) => {
            setLoading(false);
            toast('Server error, please try again');
        });
    }

    return (
        <div className='p-5 shadow-lg rounded-lg '>
            <h2 className='font-bold text-lg'>Education</h2>
            <p>Add your previous educational details</p>
            <div>
                {educationList.map((item, index) => (
                    <div key={index}>
                        <div className='grid grid-cols-2 p-3 gap-3 my-5 border rounded-lg'>
                            <div className='col-span-2'>
                                <label>University Name</label>
                                <Input
                                    name='universityName'
                                    value={item.universityName || ''}
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>
                            <div>
                                <label>Degree</label>
                                <Input
                                    name='degree'
                                    value={item.degree || ''}
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>
                            <div>
                                <label>Major</label>
                                <Input
                                    name='major'
                                    value={item.major || ''}
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>
                            <div>
                                <label>Start Date</label>
                                <Input
                                    name='startDate'
                                    type='date'
                                    value={item.startDate || ''}
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>
                            <div>
                                <label>End Date</label>
                                <Input
                                    name='endDate'
                                    type='date'
                                    value={item.endDate || ''}
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>
                            <div className='col-span-2'>
                                <label>Description</label>
                                <Textarea
                                    name='description'
                                    value={item.description || ''}
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <div className='flex gap-2'>
                                <Button onClick={addNewEducation} variant='outline'>
                                    Add more Education details
                                </Button>
                                <Button
                                    onClick={removeEducation}
                                    variant='outline'
                                    disabled={educationList.length <= 1}
                                >
                                    Remove
                                </Button>
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