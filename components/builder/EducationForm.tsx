
import React from 'react';
import type { Education } from '../../types';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface Props {
    data: Education[];
    setData: React.Dispatch<React.SetStateAction<Education[]>>;
    onNext: () => void;
    onBack: () => void;
}

const EducationForm: React.FC<Props> = ({ data, setData, onNext, onBack }) => {
    const handleAdd = () => {
        setData([...data, { id: Date.now().toString(), institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '' }]);
    };

    const handleRemove = (id: string) => {
        setData(data.filter(item => item.id !== id));
    };

    const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(data.map(item => item.id === id ? { ...item, [name]: value } : item));
    };

    return (
        <Card>
            <h2 className="text-xl font-semibold mb-4">Education</h2>
            {data.map((edu, index) => (
                <div key={edu.id} className="mb-6 p-4 border rounded-md relative">
                    {data.length > 1 && (
                         <button onClick={() => handleRemove(edu.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                             <i className="fas fa-times-circle"></i>
                         </button>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Institution" name="institution" value={edu.institution} onChange={(e) => handleChange(edu.id, e)} />
                        <Input label="Degree" name="degree" value={edu.degree} onChange={(e) => handleChange(edu.id, e)} />
                        <Input label="Field of Study" name="fieldOfStudy" value={edu.fieldOfStudy} onChange={(e) => handleChange(edu.id, e)} />
                        <Input label="Start Date" name="startDate" type="month" value={edu.startDate} onChange={(e) => handleChange(edu.id, e)} />
                        <Input label="End Date" name="endDate" type="month" value={edu.endDate} onChange={(e) => handleChange(edu.id, e)} />
                        <Input label="GPA (Optional)" name="gpa" value={edu.gpa} onChange={(e) => handleChange(edu.id, e)} />
                    </div>
                </div>
            ))}
            <Button onClick={handleAdd} variant="ghost" icon="fa-plus">Add Education</Button>
            <div className="mt-6 flex justify-between">
                <Button onClick={onBack} variant="secondary">Back</Button>
                <Button onClick={onNext}>Next: Experience <i className="fas fa-arrow-right ml-2"></i></Button>
            </div>
        </Card>
    );
};

export default EducationForm;
