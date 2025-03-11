import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import RichTextEditor from '../richTextEditor'

const formField = {
  title: '',
  companyName: '',
  city: '',
  state: '',
  startDate: '',
  endDate: '',
  workSummary: ''
}

function Experience() {
  const [experienceList, setExperienceList] = useState([formField])

  const handleChange = (index, e) => {
    const newEntries = experienceList.slice();
    const { name, value } = e.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  }

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
    console.log(experienceList)
  }, [experienceList])

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
                  <label className='text-xs ' >Position Title</label>
                  <Input name='title' onChange={(e) => handleChange(index, e)} />
                </div>
                <div>
                  <label className='text-xs ' >Company Name</label>
                  <Input name='companyName' onChange={(e) => handleChange(index, e)} />
                </div>
                <div>
                  <label className='text-xs ' >City</label>
                  <Input name='city' onChange={(e) => handleChange(index, e)} />
                </div>
                <div>
                  <label className='text-xs ' >State</label>
                  <Input name='state' onChange={(e) => handleChange(index, e)} />
                </div>
                <div>
                  <label className='text-xs ' >Start Date</label>
                  <Input type='date' name='startDate' onChange={(e) => handleChange(index, e)} />
                </div>
                <div>
                  <label className='text-xs ' >End Date</label>
                  <Input type='date' name='endDate' onChange={(e) => handleChange(index, e)} />
                </div>
                <div className='col-span-2'>
                  <label className='text-xs ' >Work Description</label>
                  <RichTextEditor onRichTextEditorChange={(e) => handleRichTextEditor(e, 'workSummary', index)} />
                </div>

              </div>

              <div className='flex justify-between'>
                <div className='flex gap-2'>
                  <Button onClick={addNewExperience} variant='outline'>+ Add more experience</Button>
                  <Button onClick={removeExperience} variant='outline'>Remove</Button>
                </div>
                <Button>Save</Button>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Experience
