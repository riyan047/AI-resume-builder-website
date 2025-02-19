import { Notebook } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function ResumeCardItem({ resume }) {
  return (
    <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
      <div className='p-14 bg-secondary rounded-lg
        flex justify-center items-center h-[280px] hover:scale-105 
        transition-all hover:shadow-md border border-black '>
        <Notebook />
      </div>
      <h2 className='text-center p-4 md:text-md '>{resume.title}</h2>
    </Link>
  )
}

export default ResumeCardItem
