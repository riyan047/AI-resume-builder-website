import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/resumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import GlobalApi from './../../../../service/GlobalApi';
import { Brain, LoaderCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { AIChatSession } from './../../../../service/AIModel';

const prompt = "Job Title: {jobTitle} , Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format"


function Summary({ enabledNext }) {

    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [summary, setSummary] = useState();
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState();

    useEffect(() => {
        summary && setResumeInfo({
            ...resumeInfo,
            summary: summary
        })
    }, [summary]);

    const GenerateSummaryFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle);
    console.log(PROMPT);

    const result = await AIChatSession.sendMessage(PROMPT);
    const responseText = await result.response.text();
    console.log(responseText);

    try {
        const parsedData = JSON.parse(responseText); // Convert to JSON
        setAiGeneratedSummaryList(parsedData.summaries || []); // Extract summaries array
    } catch (error) {
        console.error("JSON Parsing Error:", error);
        setAiGeneratedSummaryList([]); // Set empty array on error
    }

    setLoading(false);
};


    const onSave = (e) => {
        e.preventDefault();
        setLoading(true)
        const data = {
            data: {
                summary: summary
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
                    {/* added type button to prevent onSave from being called */}
                    <Button variant="outline" type="button" size="sm" className='border-black flex gap-2' onClick={() => GenerateSummaryFromAI()}
                    > <Brain className='h-4 w-4'/>Generate from AI</Button>
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
            {aiGeneratedSummaryList && <div>
                <h2 className='font-bold text-lg'>Suggestions</h2>
                {aiGeneratedSummaryList?.map((item, index)=>(
                    
                    <div key={index}
                    onClick={() => setSummery(item?.summary)}
                    className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
                        <h2 className='font-bold my-1 text-primary'>Level: {item?.experience_level}</h2>
                        <p>{item?.summary}</p>
                    </div>
                        
                ))}

            </div>}

        </div>
    )
}

export default Summary
