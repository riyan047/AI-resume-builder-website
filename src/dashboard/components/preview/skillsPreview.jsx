import React from 'react';

function SkillsPreview({ resumeInfo }) {
    return (
        <div className="w-full mx-auto">
            <h2 className="text-center font-bold text-sm mb-2">Skills</h2>
            <hr className="border-black border-[1.5px]" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                {resumeInfo?.skills.map((skills, index) => (
                    <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-3 w-full">
                        <h2 className="text-sm min-w-[80px] shrink-0">{skills?.name}</h2>
                        <div className="h-2 bg-gray-200 w-full ">
                            <div
                                className="h-2 bg-black transition-all duration-300"
                                style={{ width: `${skills?.rating}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default SkillsPreview;
