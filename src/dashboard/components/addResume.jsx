import { Loader2, PlusSquare } from 'lucide-react';
import { useState } from 'react';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/clerk-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import GlobalApi from './../../../service/GlobalApi';
import { useNavigate } from 'react-router-dom';

function AddResume() {
    const [openDialog, setOpenDialog] = useState(false);
    const [resumeTitle, setResumeTitle]= useState();
    const [loading, setLoading] = useState(false);
    const {user} = useUser() ;
    const navigate = useNavigate();

    const onCreate = () =>{
        setLoading(true);

        const uuid = uuidv4();
        const data = {
            data: {
                title: resumeTitle,
                resumeId: uuid,
                userEmail : user?.primaryEmailAddress?.emailAddress,
                userName: user?.fullName
            }
        }
        GlobalApi.CreateNewResume(data).then(res =>{
           
            //every strapi resumeid had its own document id
            const documentId = res.data.data.documentId
            if(res){
                setLoading(false);
                navigate(`/dashboard/resume/${documentId}/edit`)
            }
        }, (error) => {
            setLoading(false)

        }) 
    }

    return (
        <div>
            <div className=' p-14 py-24 border border-dashed 
                flex justify-center items-center bg-secondary rounded-lg h-[340px] 
                hover:scale-105 transition-all hover:shadow-md cursor-pointer'
            onClick={()=> setOpenDialog(true)}>
                    
                <PlusSquare />

            </div>

            <Dialog open={openDialog}>
               
                <DialogContent >
                    <DialogHeader>
                        <DialogTitle>Create New Resume</DialogTitle>
                        <DialogDescription>
                            <p >Add a title for your new resume</p>
                            <Input className='my-2 text-black' placeholder='Eg: Full Stack Resume'  onChange = {(e)=>setResumeTitle(e.target.value)}/>
                        </DialogDescription>

                        <div className=' flex justify-end gap-4'>
                        <Button 
                        disabled = {!resumeTitle || loading}
                        onClick={()=>onCreate()}>
                            {
                                loading ? <Loader2 className='animate-spin'/> : 'Create'
                            }
                            </Button>
                        <Button onClick={()=> setOpenDialog(false)} variant="ghost">Cancel</Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>

    )
}

export default AddResume
