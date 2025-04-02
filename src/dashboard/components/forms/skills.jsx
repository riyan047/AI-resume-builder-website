import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Button } from '@/components/ui/button'
import { UserCircle as LoaderCircle } from 'lucide-react'
import { ResumeInfoContext } from '@/context/resumeInfoContext'
import GlobalApi from './../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

const formField = {
    name: '',
    rating: 0
}

function Skills() {
    const [skillsList, setSkillsList] = useState([]);
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

    
    useEffect(() => {
        if (resumeInfo?.skills && resumeInfo.skills.length > 0) {
            setSkillsList(resumeInfo.skills);
        } else {
            setSkillsList([formField]);
        }
    }, [resumeInfo?.skills]); 

    useEffect(() => {
        if (skillsList?.length > 0) {
            setResumeInfo({
                ...resumeInfo,
                skills: skillsList
            });
        }
    }, [skillsList]);

    const handleChange = (index, name, value) => {
        const newEntries = [...skillsList];
        newEntries[index][name] = value;
        setSkillsList(newEntries);
    }

    const addNewSkills = () => {
        setSkillsList([
            ...skillsList,
            {
                name: '',
                rating: 0
            }
        ])
    }

    const removeSkills = () => {
        if (skillsList.length > 1) {
            setSkillsList(skillsList => skillsList.slice(0, -1));
        }
    }

    const onSave = () => {
        setLoading(true);
        const data = {
            data: {
                skills: skillsList.map(({ id, ...rest }) => rest)
            }
        };

        GlobalApi.UpdateResumeDetails(params?.resumeId, data).then(resp => {
            console.log(resp);
            setLoading(false);
            toast('Details updated!');
        }, (error) => {
            setLoading(false);
            console.log(error);
            toast('Error saving the data, please try again later');
        });
    }

    return (
        <div className='p-5 shadow-lg rounded-lg mt-2'>
            <h2 className='font-bold text-lg'>Skills</h2>
            <p>Add your top professional skills</p>

            <div>
                {skillsList.map((item, index) => (
                    <div key={index} className='flex justify-between border items-center rounded-lg p-3 mb-3'>
                        <div>
                            <label className=''>Name</label>
                            <Input
                                value={item.name || ''}
                                onChange={(e) => handleChange(index, 'name', e.target.value)}
                            />
                        </div>
                        <Rating
                            className='ml-2 pt-4'
                            style={{ maxWidth: 150 }}
                            value={item.rating || 0}
                            onChange={(v) => handleChange(index, 'rating', v)}
                        />
                    </div>
                ))}
            </div>
            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button onClick={addNewSkills} variant='outline'>Add more Skills</Button>
                    <Button
                        onClick={removeSkills}
                        variant='outline'
                        disabled={skillsList.length <= 1}
                    >
                        Remove
                    </Button>
                </div>
                <Button disabled={loading} onClick={() => onSave()}>
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </div>
    )
}

export default Skills