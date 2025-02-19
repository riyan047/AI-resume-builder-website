import React from 'react';

function SkillsPreview({ resumeInfo }) {
    return (
        <div className="w-full max-w-md mx-auto">
            <h2 className="text-center font-bold text-sm mb-2">Skills</h2>
            <hr className="border-black border-[1.5px]" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                {resumeInfo?.skills.map((skills, index) => (
                    <div key={index} className="flex flex-col sm:flex-row items-center sm:justify-between w-full">
                        <h2 className="text-sm w-full sm:w-auto text-left">{skills?.name}</h2>
                        <div className="h-2 bg-gray-200 w-full sm:w-[120px] mt-1 sm:mt-0">
                            <div className="h-2 bg-black" style={{ width: `${skills?.rating}%` }}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SkillsPreview;
