import { FileUser, MoreVertical } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function ResumeCardItem({ resume }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={`/dashboard/resume/${resume.documentId}/edit`}
      className="block group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Section (Icon) */}
      <div
        className="p-14 bg-secondary rounded-t-lg border-t-4 
        flex justify-center items-center h-[280px] group-hover:scale-105 
        transition-all group-hover:shadow-md border border-black"
      >
        <FileUser className="h-8 w-8" />
      </div>

      {/* Title Section (Now Part of Hover Effect) */}
      <div
        className="flex justify-between items-center bg-gray-100 p-4 
        rounded-b-lg border border-black transition-all group-hover:bg-gray-200"
      >
        <h2 className="text-md font-medium transition-colors group-hover:text-gray-800">
          {resume.title}
        </h2>
        {isHovered && <MoreVertical className="text-gray-600" />}
      </div>
    </Link>
  );
}

export default ResumeCardItem;
