
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  subscription: 'free' | 'premium';
  resumesGeneratedThisWeek: number;
}

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  website: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  summary: string;
}
