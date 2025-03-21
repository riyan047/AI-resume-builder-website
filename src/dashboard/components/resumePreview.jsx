import React, { useContext } from 'react'
import PersonalDetailsPreview from './preview/personalDetailsPreview';
import { ResumeInfoContext } from '@/context/resumeInfoContext';
import SummaryPreview from './preview/summeryPreview';
import ExperiencePreview from './preview/ExperiencePreview';
import EducationPreview from './preview/educationPreview';
import SkillsPreview from './preview/skillsPreview';

function ResumePreviewSection() {
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
  return (
    <div className='h-full shadow-lg p-6 '>
        {/* Personal details */}
        <PersonalDetailsPreview resumeInfo={resumeInfo} />

        {/* Summary */}
        <SummaryPreview resumeInfo={resumeInfo} />

        {/* Experience */}
        <ExperiencePreview resumeInfo={resumeInfo}/>

        {/* Educational  */}
        <EducationPreview resumeInfo={resumeInfo}/>

        {/* Skills */}
        <SkillsPreview resumeInfo={resumeInfo}/>
    </div>
  )
}

export default ResumePreviewSection