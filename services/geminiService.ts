
import { GoogleGenAI, Type } from "@google/genai";
// FIX: Imported Education and Experience types.
import type { ResumeData, Education, Experience } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const generateResumePrompt = (data: Omit<ResumeData, 'summary'>): string => {
    const { personalInfo, education, experience, skills } = data;
    
    return `
      Based on the following user data, generate a professional, ATS-friendly resume in a structured JSON format.
      The JSON should have a 'summary' (a 3-4 sentence professional summary), 'personalInfo', 'experience', 'education', and 'skills'.
      For the 'experience' section, rewrite the descriptions into 3-4 concise, action-oriented bullet points starting with strong verbs.
      Ensure the output strictly adheres to the provided JSON schema.

      User Data:
      - Personal Info: ${JSON.stringify(personalInfo)}
      - Education: ${JSON.stringify(education)}
      - Work Experience: ${JSON.stringify(experience)}
      - Skills: ${JSON.stringify(skills.map(s => s.name))}
    `;
};


export const generateResumeWithAI = async (data: Omit<ResumeData, 'summary'>): Promise<ResumeData | null> => {
    if (!API_KEY) {
        // Simulate a successful response for development without an API key
        console.log("Simulating AI response.");
        return {
            ...data,
            summary: `Highly motivated and results-oriented professional with demonstrated experience in driving project success. Skilled in ${data.skills.slice(0, 3).map(s => s.name).join(', ')}, with a strong background in ${data.education[0]?.fieldOfStudy || 'relevant fields'}. Seeking to leverage expertise to contribute to a dynamic team.`,
            experience: data.experience.map(exp => ({...exp, description: `• Achieved significant results at ${exp.company}.\n• Collaborated with teams to deliver high-quality outcomes.\n• Drove key initiatives in the role of ${exp.role}.`})),
        };
    }

    try {
        const prompt = generateResumePrompt(data);
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        summary: { type: Type.STRING },
                        personalInfo: {
                            type: Type.OBJECT,
                            properties: {
                                name: { type: Type.STRING },
                                email: { type: Type.STRING },
                                phone: { type: Type.STRING },
                                linkedin: { type: Type.STRING },
                                github: { type: Type.STRING },
                                website: { type: Type.STRING },
                            }
                        },
                        education: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    institution: { type: Type.STRING },
                                    degree: { type: Type.STRING },
                                    fieldOfStudy: { type: Type.STRING },
                                    startDate: { type: Type.STRING },
                                    endDate: { type: Type.STRING },
                                    gpa: { type: Type.STRING, nullable: true },
                                }
                            }
                        },
                        experience: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    company: { type: Type.STRING },
                                    role: { type: Type.STRING },
                                    startDate: { type: Type.STRING },
                                    endDate: { type: Type.STRING },
                                    description: { type: Type.STRING },
                                }
                            }
                        },
                        skills: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    name: { type: Type.STRING }
                                }
                            }
                        }
                    }
                }
            }
        });

        const jsonString = response.text;
        const generatedData = JSON.parse(jsonString);

        // We map skills back to the format our app uses
        const finalData = {
            ...generatedData,
            skills: generatedData.skills.map((s: { name: string }, index: number) => ({ id: `${Date.now()}-${index}`, name: s.name })),
            education: generatedData.education.map((edu: Omit<Education, 'id'>, index: number) => ({...edu, id: `${Date.now()}-${index}`})),
            experience: generatedData.experience.map((exp: Omit<Experience, 'id'>, index: number) => ({...exp, id: `${Date.now()}-${index}`})),
        };

        return finalData as ResumeData;
    } catch (error) {
        console.error("Error generating resume with AI:", error);
        return null;
    }
};