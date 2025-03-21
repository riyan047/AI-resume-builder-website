import React, { useState } from 'react'
import PersonalDetails from './forms/personalDetails';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react';
import Summary from './forms/summary';
import Experience from './forms/experience';
import Education from './forms/education';
import Skills from './forms/skills';
import { Link } from 'react-router-dom';

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enabledNext, setEnabledNext] = useState(false);

  return (
    <div>

      <div className=' flex justify-between items-center mb-4'>
        {/* Home button */}
        <Link to={'/dashboard'}>
          <Button className='flex gap-2 hover:scale-105' size='sm'> <Home /></Button>
        </Link>
        <div className='flex gap-2 '>
          {activeFormIndex > 1 &&
            <Button className='hover:scale-105' size='sm' onClick={() => setActiveFormIndex(activeFormIndex - 1)}> <ArrowLeft /> </Button>}

          <Button
            // disabled={!enabledNext}
            className='flex gap-2 hover:scale-105' size='sm' onClick={() => setActiveFormIndex(activeFormIndex + 1)}>Next
            <ArrowRight /></Button>
        </div>
      </div>


      {activeFormIndex == 1 ? <PersonalDetails enabledNext={(v) => setEnabledNext(v)} /> :
        activeFormIndex == 2 ? <Summary enabledNext={(v) => setEnabledNext(v)} /> :
          activeFormIndex == 3 ? <Experience enabledNext={(v) => setEnabledNext(v)} /> :
            activeFormIndex == 4 ? <Education /> :
              activeFormIndex == 5 ? <Skills /> :
                null}

      {/* Experience  */}


      {/* Educational details  */}


      {/* Skills  */}

    </div>
  )
}

export default FormSection
