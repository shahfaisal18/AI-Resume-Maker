
import React from 'react';
import type { Experience } from '../../types';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface Props {
    data: Experience[];
    setData: React.Dispatch<React.SetStateAction<Experience[]>>;
    onNext: () => void;
    onBack: () => void;
}

const ExperienceForm: React.FC<Props> = ({ data, setData, onNext, onBack }) => {
    const handleAdd = () => {
        setData([...data, { id: Date.now().toString(), company: '', role: '', startDate: '', endDate: '', description: '' }]);
    };

    const handleRemove = (id: string) => {
        setData(data.filter(item => item.id !== id));
    };

    const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(data.map(item => item.id === id ? { ...item, [name]: value } : item));
    };

    return (
        <Card>
            <h2 className="text-xl font-semibold mb-4">Work Experience</h2>
            {data.map((exp) => (
                <div key={exp.id} className="mb-6 p-4 border rounded-md relative">
                     {data.length > 1 && (
                         <button onClick={() => handleRemove(exp.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                             <i className="fas fa-times-circle"></i>
                         </button>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Company" name="company" value={exp.company} onChange={(e) => handleChange(exp.id, e)} />
                        <Input label="Role / Title" name="role" value={exp.role} onChange={(e) => handleChange(exp.id, e)} />
                        <Input label="Start Date" name="startDate" type="month" value={exp.startDate} onChange={(e) => handleChange(exp.id, e)} />
                        <Input label="End Date" name="endDate" type="month" value={exp.endDate} onChange={(e) => handleChange(exp.id, e)} />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={exp.description}
                            onChange={(e) => handleChange(exp.id, e)}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            placeholder="Describe your responsibilities and achievements..."
                        ></textarea>
                    </div>
                </div>
            ))}
            <Button onClick={handleAdd} variant="ghost" icon="fa-plus">Add Experience</Button>
            <div className="mt-6 flex justify-between">
                <Button onClick={onBack} variant="secondary">Back</Button>
                <Button onClick={onNext}>Next: Skills <i className="fas fa-arrow-right ml-2"></i></Button>
            </div>
        </Card>
    );
};

export default ExperienceForm;
