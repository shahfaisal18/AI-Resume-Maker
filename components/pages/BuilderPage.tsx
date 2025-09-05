
import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import type { PersonalInfo, Education, Experience, Skill, ResumeData } from '../../types';
import { generateResumeWithAI } from '../../services/geminiService';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import PersonalInfoForm from '../builder/PersonalInfoForm';
import EducationForm from '../builder/EducationForm';
import ExperienceForm from '../builder/ExperienceForm';
import SkillsForm from '../builder/SkillsForm';
import ResumePreview from '../builder/ResumePreview';
import Button from '../ui/Button';

type Step = 'personal' | 'education' | 'experience' | 'skills' | 'preview';

const BuilderPage: React.FC = () => {
    const { user, incrementResumeCount } = useAuth();
    const navigate = useNavigate();

    const [step, setStep] = useState<Step>('personal');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({ name: '', email: '', phone: '', linkedin: '', github: '', website: '' });
    const [education, setEducation] = useState<Education[]>([]);
    const [experience, setExperience] = useState<Experience[]>([]);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [generatedResume, setGeneratedResume] = useState<ResumeData | null>(null);

    const canGenerate = user?.subscription === 'premium' || (user?.resumesGeneratedThisWeek || 0) < 2;

    const handleGenerateResume = async () => {
        if (!canGenerate) {
            setError("You've reached your weekly limit for resume generation.");
            return;
        }
        setIsLoading(true);
        setError('');
        const dataToGenerate = { personalInfo, education, experience, skills };
        const result = await generateResumeWithAI(dataToGenerate);
        setIsLoading(false);

        if (result) {
            setGeneratedResume(result);
            incrementResumeCount();
            setStep('preview');
        } else {
            setError('Failed to generate resume. Please try again.');
        }
    };

    const handleDownloadPdf = () => {
        const input = document.getElementById('resume-preview');
        if (input) {
            html2canvas(input, { scale: 2 })
                .then((canvas) => {
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF('p', 'mm', 'a4');
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = pdf.internal.pageSize.getHeight();
                    const canvasWidth = canvas.width;
                    const canvasHeight = canvas.height;
                    const ratio = canvasWidth / canvasHeight;
                    const width = pdfWidth;
                    const height = width / ratio;

                    // if height is larger than a page, we need to split it
                    let position = 0;
                    let heightLeft = height;
                    if (height > pdfHeight){
                        pdf.addImage(imgData, 'PNG', 0, position, width, height);
                        heightLeft -= pdfHeight;
                        while (heightLeft > 0) {
                            position = -pdfHeight;
                            pdf.addPage();
                            pdf.addImage(imgData, 'PNG', 0, position, width, height);
                            heightLeft -= pdfHeight;
                        }
                    } else {
                         pdf.addImage(imgData, 'PNG', 0, 0, width, height);
                    }

                    pdf.save(`${personalInfo.name.replace(' ', '_')}_Resume.pdf`);
                });
        }
    };

    const renderStep = () => {
        switch (step) {
            case 'personal':
                return <PersonalInfoForm data={personalInfo} setData={setPersonalInfo} onNext={() => setStep('education')} />;
            case 'education':
                return <EducationForm data={education} setData={setEducation} onNext={() => setStep('experience')} onBack={() => setStep('personal')} />;
            case 'experience':
                return <ExperienceForm data={experience} setData={setExperience} onNext={() => setStep('skills')} onBack={() => setStep('education')} />;
            case 'skills':
                return <SkillsForm data={skills} setData={setSkills} onBack={() => setStep('experience')} onGenerate={handleGenerateResume} isLoading={isLoading} canGenerate={canGenerate} />;
            case 'preview':
                return generatedResume ? (
                    <ResumePreview data={generatedResume} onDownload={handleDownloadPdf} onEdit={() => setStep('personal')} />
                ) : (
                    <div>Loading preview...</div>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-center">Resume Builder</h1>
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
             {!canGenerate && step !== 'preview' && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
                    <p className="font-bold">Generation Limit Reached</p>
                    <p>You have reached your free weekly limit. <a href="#/pricing" className="font-bold underline" onClick={()=> navigate('/pricing')}>Upgrade to Premium</a> for unlimited generations.</p>
                </div>
            )}
            {renderStep()}
        </div>
    );
};

export default BuilderPage;

