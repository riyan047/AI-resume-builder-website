import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/resumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react'
import {
    BtnBold, BtnBulletList, BtnItalic,
    BtnLink, BtnNumberedList, BtnStrikeThrough, BtnUnderline, Editor,
    EditorProvider, Separator, Toolbar
} from 'react-simple-wysiwyg'
import { AIChatSession } from './../../../service/AIModel';
import { toast } from 'sonner';

const PROMPT = 'position titile: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume, give me result in a array strictly and seperate point by numbering them'

function RichTextEditor({ onRichTextEditorChange, index }) {
    const [value, setValue] = useState();
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
