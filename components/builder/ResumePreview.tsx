
import React from 'react';
import type { ResumeData } from '../../types';
import Button from '../ui/Button';

interface Props {
    data: ResumeData;
    onDownload: () => void;
    onEdit: () => void;
}

const ResumePreview: React.FC<Props> = ({ data, onDownload, onEdit }) => {
    const { personalInfo, summary, experience, education, skills } = data;

    return (
        <div>
            <div className="my-6 flex justify-center gap-4">
                <Button onClick={onEdit} variant="secondary" icon="fa-pencil-alt">Edit Information</Button>
                <Button onClick={onDownload} icon="fa-download">Download as PDF</Button>
            </div>
            <div id="resume-preview" className="bg-white p-8 md:p-12 shadow-2xl max-w-4xl mx-auto my-8 font-serif text-gray-800">
                {/* Header */}
                <div className="text-center border-b-2 border-gray-300 pb-4 mb-6">
                    <h1 className="text-4xl font-bold tracking-wider">{personalInfo.name}</h1>
                    <div className="flex justify-center gap-x-4 gap-y-1 text-sm mt-2 flex-wrap">
                        <span>{personalInfo.phone}</span>
                        <span className="text-gray-400">|</span>
                        <a href={`mailto:${personalInfo.email}`} className="text-blue-600 hover:underline">{personalInfo.email}</a>
                        {personalInfo.linkedin && <>
                          <span className="text-gray-400">|</span>
                          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn</a>
                        </>}
                         {personalInfo.github && <>
                          <span className="text-gray-400">|</span>
                          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub</a>
                        </>}
                         {personalInfo.website && <>
                          <span className="text-gray-400">|</span>
                          <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Website</a>
                        </>}
                    </div>
                </div>

                {/* Summary */}
                <section>
                    <h2 className="text-xl font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-3">Summary</h2>
                    <p className="text-sm leading-relaxed">{summary}</p>
                </section>

                {/* Experience */}
                <section className="mt-6">
                    <h2 className="text-xl font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-3">Experience</h2>
                    {experience.map(exp => (
                        <div key={exp.id} className="mb-4">
                            <div className="flex justify-between items-baseline">
                                <h3 className="text-lg font-semibold">{exp.role}</h3>
                                <p className="text-sm font-light">{exp.startDate} - {exp.endDate}</p>
                            </div>
                            <p className="text-md italic">{exp.company}</p>
                            <ul className="list-disc pl-5 mt-1 text-sm space-y-1">
                                {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^•\s*/, '')}</li>)}
                            </ul>
                        </div>
                    ))}
                </section>

                {/* Education */}
                <section className="mt-6">
                    <h2 className="text-xl font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-3">Education</h2>
                    {education.map(edu => (
                        <div key={edu.id} className="mb-2">
                             <div className="flex justify-between items-baseline">
                                <h3 className="text-lg font-semibold">{edu.institution}</h3>
                                <p className="text-sm font-light">{edu.startDate} - {edu.endDate}</p>
                            </div>
                            <p className="text-md italic">{edu.degree}, {edu.fieldOfStudy}</p>
                        </div>
                    ))}
                </section>

                {/* Skills */}
                <section className="mt-6">
                     <h2 className="text-xl font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-3">Skills</h2>
                     <p className="text-sm">{skills.map(s => s.name).join(' • ')}</p>
                </section>
            </div>
        </div>
    );
};

export default ResumePreview;
