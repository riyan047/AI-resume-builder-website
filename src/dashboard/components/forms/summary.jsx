import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/resumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import GlobalApi from './../../../../service/GlobalApi';
import { LoaderCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';


function Summary({ enabledNext }) {

    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

    const [summary, setSummary] = useState();

    const [loading, setLoading] = useState(false);

    const params =useParams();

    useEffect(() => {
        summary && setResumeInfo({
            ...resumeInfo,
            summary:summary
            
        })
    }, [summary]);


    const onSave = (e) => {
        e.preventDefault();
        setLoading(true)
        const data = {
            data: {
                summary:summary
            }
        }
        GlobalApi.UpdateResumeDetails(params?.resumeId, data).then(res => {
            console.log(res)
            enabledNext(true);
            setLoading(false);
            toast({
                description: "Details Updated"
            })
        }, (error) => { setLoading(false) });
    }

    return (
        <div className='p-5 shadow-lg rounded-lg '>
            <h2 className='font-bold text-lg'>Summary</h2>
            {/* <p  className='mt-2 text-md'></p> */}
            <form className='mt-5' onSubmit={onSave}>
                <div className='flex justify-between items-center'>
                    <label >Add Summary for your job title.</label>
                    <Button variant="outline" size="sm" className=''>Generate from Ai</Button>
                </div>
                <Textarea required className='mt-2'
                    onChange={(e) => setSummary(e.target.value)} />
                <div className='mt-2 flex justify-end'>
                    <Button
                        disabled={loading}
                        type='submit'> {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                    </Button>
                </div>
            </form>

        </div>
    )
}

export default Summary
