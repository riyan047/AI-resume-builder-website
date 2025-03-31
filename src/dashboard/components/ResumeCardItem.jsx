import { FileUser, Flashlight, Loader2Icon, MoreVertical } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import GlobalApi from "./../../../service/GlobalApi";
import { toast } from "sonner";



function ResumeCardItem({ resume, refreshData }) {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false)

  const onDelete = () => {
    setLoading(true)
    GlobalApi.DeleteResumeById(resume.documentId)
      .then(resp => {
        console.log(resp)
        setOpenAlert(false)
        toast('Resume deleted successfully!');
        refreshData();
        setLoading(false)
      })
  }

  return (
    <div>

      <Link
        to={`/dashboard/resume/${resume.documentId}/edit`}
        className="block group">

        <div
          className="p-14 bg-secondary rounded-t-lg border-t-4 
        flex justify-center items-center h-[280px] group-hover:scale-105 
        transition-all group-hover:shadow-md border border-black"
        >
          <FileUser className="h-8 w-8" />
        </div>


      </Link>
      <div
        className="flex justify-between items-center bg-gray-100 p-4 
        rounded-b-lg border border-black transition-all hover:bg-gray-100"
      >
        <h2 className="text-md font-medium transition-colors ">
          {resume.title}
        </h2>

        <DropdownMenu>
          <DropdownMenuTrigger><MoreVertical className="text-gray-600" /></DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => navigate(`/dashboard/resume/${resume.documentId}/edit`)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/my-resume/${resume.documentId}/view`)}>View</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/my-resume/${resume.documentId}/view`)}>Download</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your resume
                and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} disabled={loading}>
                {loading ? <Loader2Icon className="animate-spin" /> : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>


      </div>
    </div>
  );
}

export default ResumeCardItem;
