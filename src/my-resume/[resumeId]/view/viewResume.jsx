import Header from '@/components/custom/header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/resumeInfoContext'
import ResumePreviewSection from '@/dashboard/components/resumePreview'
import React, { useEffect, useState } from 'react'
import GlobalApi from './../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { RWebShare } from 'react-web-share'
import { Download, Share2 } from 'lucide-react'

function ViewResume() {
    const [resumeInfo, setResumeInfo] = useState();
    const { resumeId } = useParams();

    useEffect(() => {
        GetResumeInfo()
    }, [])

    const GetResumeInfo = () => {
        GlobalApi.GetResumeById(resumeId).then(resp => {
            setResumeInfo(resp.data.data)
        })
    }

    const handleDownload = () => {
        const style = document.createElement('style');
        style.textContent = `
        @media print {
            @page { 
                size: A4 portrait; 
                margin: 0; 
            }
            body { 
                margin: 0;
                padding: 0;
            }
            #printArea {
                width: 21cm;
                margin: 0 auto;
                box-shadow: none;
                transform: scale(1);
                transform-origin: top center;
            }
            #noPrintArea { 
                display: none !important; 
            }
            .progress-bar { 
                display: block !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            .progress-fill {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
        }
    `;
        document.head.appendChild(style);

        // Slight delay to ensure styles are applied
        setTimeout(() => {
            window.print();
            document.head.removeChild(style);
        }, 100);
    }

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div id='noPrintArea' className="bg-gray-50">
                <Header />
                <div className='py-10 px-4 max-w-4xl mx-auto'>
                    <h2 className='text-center text-3xl font-bold text-gray-900 mb-4'>
                        Your AI-Generated Resume is Ready!
                    </h2>
                    <p className='text-center text-gray-600 mb-8 max-w-2xl mx-auto'>
                        Download your professional resume or share it with others using the unique URL
                    </p>
                    <div className='flex justify-center gap-4 mb-10'>
                        <Button
                            onClick={handleDownload}
                            className="flex items-center gap-2"
                            size="lg"
                        >
                            <Download className="w-4 h-4" />
                            Download PDF
                        </Button>
                        <RWebShare
                            data={{
                                text: "Check out my professional resume",
                                url: `${import.meta.env.VITE_BASE_URL}/my-resumes/${resumeId}/view`,
                                title: `${resumeInfo?.firstName} ${resumeInfo?.lastName}'s Resume`,
                            }}
                            onClick={() => console.log("shared successfully!")}
                        >
                            <Button
                                variant="outline"
                                className="flex items-center gap-2"
                                size="lg"
                            >
                                <Share2 className="w-4 h-4" />
                                Share Resume
                            </Button>
                        </RWebShare>
                    </div>
                </div>
            </div>
            <div className='max-w-4xl mx-auto px-4 mb-20'>
                <div id='printArea' className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <ResumePreviewSection />
                </div>
            </div>
        </ResumeInfoContext.Provider>
    )
}

export default ViewResume