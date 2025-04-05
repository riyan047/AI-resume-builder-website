import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import RichTextEditor from '../richTextEditor'
import { ResumeInfoContext } from '@/context/resumeInfoContext'
import { UserCircle as LoaderCircle } from 'lucide-react'
import GlobalApi from './../../../../service/GlobalApi'
import { toast } from 'sonner'
import { useParams } from 'react-router-dom'

const formField = {
  title: '',
  companyName: '',
  city: '',
  state: '',
  startDate: '',
  endDate: '',
  workSummary: '',
  currentlyWorking: false,
}

function Experience() {
  const [experienceList, setExperienceList] = useState([]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    if (resumeInfo?.experience && resumeInfo.experience.length > 0) {
      setExperienceList(resumeInfo.experience);
    } else {
      setExperienceList([formField]);
    }
  }, [resumeInfo?.experience]);

  useEffect(() => {
    if (experienceList?.length > 0) {
      setResumeInfo({
        ...resumeInfo,
        experience: experienceList
      });
    }
  }, [experienceList]);

  const handleChange = (index, e) => {
    const newEntries = [...experienceList];
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      newEntries[index]['currentlyWorking'] = checked;
      if (checked) {
        newEntries[index]['endDate'] = '';
      }
    } else {
      newEntries[index][name] = value;
    }

    setExperienceList(newEntries);
  };

  const addNewExperience = () => {
    setExperienceList([...experienceList, formField])
  }

  const removeExperience = () => {
    if (experienceList.length > 1) {
      setExperienceList(experienceList => experienceList.slice(0, -1))
    }
  }

  const handleRichTextEditor = (e, name, index) => {
    const newEntries = experienceList.slice();
    newEntries[index][name] = e.target.value;
    setExperienceList(newEntries);
  }

  const onSave = () => {
    setLoading(true)
    const data = {
      data: {
        experience: experienceList.map(({ id, ...rest }) => rest)
      }
    }

    GlobalApi.UpdateResumeDetails(params?.resumeId, data).then(res => {
      console.log(res);
      setLoading(false);
      toast('Details updated !')
    }, (error) => {
      setLoading(false);
    })
  }

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg '>
        <h2 className='font-bold text-lg'>Professional Experience</h2>
        <p>Add your previous Job experience</p>

        <div>
          {experienceList.map((item, index) => (
            <div key={index}>
              <div className='grid grid-cols-2 gap-3 p-3 border my-5 rounded-lg '>
                <div>
                  <label className='text-md'>Position Title</label>
                  <Input
                    name='title'
                    value={item.title || ''}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className='text-md'>Company Name</label>
                  <Input
                    name='companyName'
                    value={item.companyName || ''}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className='text-md'>City</label>
                  <Input
                    name='city'
                    value={item.city || ''}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className='text-md'>State</label>
                  <Input
                    name='state'
                    value={item.state || ''}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className='text-md'>Start Date</label>
                  <Input
                    type='date'
                    name='startDate'
                    value={item.startDate || ''}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className='text-md'>End Date</label>
                  <Input
                    type='date'
                    name='endDate'
                    value={item.endDate || ''}
                    onChange={(e) => handleChange(index, e)}
                    disabled={item.currentlyWorking}
                  />
                </div>
                <div className='flex items-center'>
                  <input
                    type="checkbox"
                    id={`currentlyWorking-${index}`}
                    checked={item.currentlyWorking || false}
                    onChange={(e) => handleChange(index, e)}
                  />
                  <label htmlFor={`currentlyWorking-${index}`} className='ml-2'>Presently Working</label>
                </div>
                <div className='col-span-2'>
                  <label className='text-md'>Work Description</label>
                  <RichTextEditor
                    index={index}
                    value={item.workSummary || ''}
                    onRichTextEditorChange={(e) => handleRichTextEditor(e, 'workSummary', index)}
                  />
                </div>
              </div>

              <div className='flex justify-between'>
                <div className='flex gap-2'>
                  <Button onClick={addNewExperience} variant='outline'>+ Add more experience</Button>
                  <Button
                    onClick={removeExperience}
                    variant='outline'
                    disabled={experienceList.length <= 1}
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
    </div>
  )
}

export default Experience