import React, { useContext } from 'react'
import PersonalDetailsPreview from './preview/personalDetailsPreview';
import { ResumeInfoContext } from '@/context/resumeInfoContext';

function ResumePreviewSection() {
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
  return (
    <div>
        {/* Personal details */}
        <PersonalDetailsPreview resumeInfo={resumeInfo} />

        {/* Summary */}

        {/* Experience */}

        {/* Educational  */}

        {/* Skills */}
    </div>
  )
}

export default ResumePreviewSection