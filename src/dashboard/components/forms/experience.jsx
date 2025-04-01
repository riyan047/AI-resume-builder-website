import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import RichTextEditor from '../richTextEditor'
import { ResumeInfoContext } from '@/context/resumeInfoContext'
import { LoaderCircle } from 'lucide-react'
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
  const [experienceList, setExperienceList] = useState([formField]);
  const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const params = useParams();

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
    setExperienceList(experienceList => experienceList.slice(0, -1))
  }
  const handleRichTextEditor = (e,name, index) => {
    const newEntries = experienceList.slice();
    newEntries[index][name] = e.target.value;
    setExperienceList(newEntries);
  }

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo, 
      experience:experienceList
    })
  }, [experienceList]);


  const onSave = () => {
    setLoading(true)
    const data = {
      data: {
        experience: experienceList.map(({ id, ...rest }) => rest)
      }
    }

    console.log(experienceList)

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
        <p>Add your previous Job exprience</p>

        <div>
          {experienceList.map((item, index) => (
            <div key={index}>
              <div className='grid grid-cols-2 gap-3 p-3 border my-5 rounded-lg '>
                <div>
                  <label className='text-md ' >Position Title</label>
                  <Input name='title' onChange={(e) => handleChange(index, e)} />
                </div>
                <div>
                  <label className='text-md ' >Company Name</label>
                  <Input name='companyName' onChange={(e) => handleChange(index, e)} />
                </div>
                <div>
                  <label className='text-md ' >City</label>
                  <Input name='city' onChange={(e) => handleChange(index, e)} />
                </div>
                <div>
                  <label className='text-md ' >State</label>
                  <Input name='state' onChange={(e) => handleChange(index, e)} />
                </div>
                <div>
                  <label className='text-md'>Start Date</label>
                  <Input type='date' name='startDate' onChange={(e) => handleChange(index, e)} />
                </div>

                <div>
                  <label className='text-md'>End Date</label>
                  <Input
                    type='date'
                    name='endDate'
                    onChange={(e) => handleChange(index, e)}
                    disabled={item.currentlyWorking} 
                  />
                </div>
                <div className='flex items-center'>
                  <input
                    type="checkbox"
                    id={`currentlyWorking-${index}`}
                    checked={item.currentlyWorking}
                    onChange={(e) => handleChange(index, e)}
                  />
                  <label htmlFor={`currentlyWorking-${index}`} className='ml-2'>Presently Working</label>
                </div>
                <div className='col-span-2'>
                  <label className='text-md ' >Work Description</label>
                  <RichTextEditor index={index} onRichTextEditorChange={(e) => handleRichTextEditor(e, 'workSummary', index)} />
                </div>

              </div>

              <div className='flex justify-between'>
                <div className='flex gap-2'>
                  <Button onClick={addNewExperience} variant='outline'>+ Add more experience</Button>
                  <Button onClick={removeExperience} variant='outline'>Remove</Button>
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
