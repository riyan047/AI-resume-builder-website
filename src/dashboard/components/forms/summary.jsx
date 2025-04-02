import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/resumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import GlobalApi from './../../../../service/GlobalApi'
import { Brain, UserCircle as LoaderCircle } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { AIChatSession } from './../../../../service/AIModel'

const prompt = "Job Title: {jobTitle} , Depends on job title give me list of  summary for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format"

function Summary({ enabledNext }) {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState([]);

    // Initialize with existing data
    useEffect(() => {
        if (resumeInfo?.summary) {
            setSummary(resumeInfo.summary);
        }
    }, [resumeInfo?.summary]);

    useEffect(() => {
        if (summary) {
            setResumeInfo({
                ...resumeInfo,
                summary: summary
            });
        }
    }, [summary]);

    const GenerateSummaryFromAI = async () => {
        setLoading(true);
        const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle || '');

        try {
            const result = await AIChatSession.sendMessage(PROMPT);
            const responseText = await result.response.text();

            try {
                const parsedData = JSON.parse(responseText);
                setAiGeneratedSummaryList(parsedData.summaries || []);
            } catch (error) {
                console.error("JSON Parsing Error:", error);
                setAiGeneratedSummaryList([]);
                toast('Error parsing AI response');
            }
        } catch (error) {
            console.error("AI Generation Error:", error);
            toast('Error generating summary from AI');
        } finally {
            setLoading(false);
        }
    };

    const onSave = (e) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            data: {
                summary: summary
            }
        };

        GlobalApi.UpdateResumeDetails(params?.resumeId, data).then(
            (res) => {
                console.log(res);
                enabledNext(true);
                setLoading(false);
                toast("Details Updated");
            },
            (error) => {
                console.error(error);
                setLoading(false);
                toast("Error saving summary");
            }
        );
    };

    return (
        <div className='p-5 shadow-lg rounded-lg'>
            <h2 className='font-bold text-lg'>Summary</h2>
            <form className='mt-5' onSubmit={onSave}>
                <div className='flex justify-between items-center'>
                    <label>Add Summary for your job title.</label>
                    <Button
                        variant="outline"
                        type="button"
                        size="sm"
                        className='border-black flex gap-2'
                        onClick={GenerateSummaryFromAI}
                        disabled={loading}
                    >
                        <Brain className='h-4 w-4' />
                        Generate from AI
                    </Button>
                </div>
                <Textarea
                    required
                    className='mt-2'
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Enter your professional summary"
                />
                <div className='mt-2 flex justify-end'>
                    <Button
                        disabled={loading}
                        type='submit'
                    >
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                    </Button>
                </div>
            </form>

            {aiGeneratedSummaryList.length > 0 && (
                <div>
                    <h2 className='font-bold text-lg mt-6'>Suggestions</h2>
                    {aiGeneratedSummaryList.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => setSummary(item?.summary)}
                            className='p-5 shadow-lg my-4 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors'
                        >
                            <h2 className='font-bold my-1 text-primary'>
                                Level: {item?.experience_level}
                            </h2>
                            <p>{item?.summary}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Summary;