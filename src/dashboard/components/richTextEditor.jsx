import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/resumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import {
    BtnBold, BtnBulletList, BtnItalic,
    BtnLink, BtnNumberedList, BtnStrikeThrough, BtnUnderline, Editor,
    EditorProvider, Separator, Toolbar
} from 'react-simple-wysiwyg'
import { AIChatSession } from './../../../service/AIModel';
import { toast } from 'sonner';

const PROMPT = `Position Title: {positionTitle}. Based on this role, write 5-7 professional experience bullet points suitable for a resume. 
Each point should be numbered (e.g., 1., 2., 3., etc.) and written in plain text. Do not include any brackets, quotes, or array format and introduction sentence.`;

function RichTextEditor({ onRichTextEditorChange, index, value: propValue }) {
    const [value, setValue] = useState(propValue);
    const[loading, setLoading] = useState(false);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)

    const generateSummaryFromAI = async () => {
        setLoading(true);
        if (!resumeInfo.experience[index].title) {
            toast('Please add position title');
            return;
        }
        const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title);
        const result = await AIChatSession.sendMessage(prompt);
        const resp = result.response.text();
        console.log(resp)
        setValue(resp.replace('[','').replace(']',''));
        setLoading(false)
    }

    useEffect(()=>{
        setValue(propValue)
    },[propValue])

    return (
        <div>
            <div className='flex justify-between items-center my-2'>
                <label className='text-sm'>Summary</label>
                <Button onClick={generateSummaryFromAI} variant='outline' size='sm' className='flex gap-2'>
                    {loading ? <LoaderCircle  className='animate-spin'/> : <><Brain className='h-4 w-4' /> Generate from AI</>}
                    </Button>
            </div>
            <EditorProvider>
                <Editor value={value} onChange={(e) => {
                    setValue(e.target.value);
                    onRichTextEditorChange(e)
                }}>
                    <Toolbar className='w-full'>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <BtnLink />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    )
}

export default RichTextEditor
