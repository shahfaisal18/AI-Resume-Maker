
import React, { useState } from 'react';
import type { Skill } from '../../types';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface Props {
    data: Skill[];
    setData: React.Dispatch<React.SetStateAction<Skill[]>>;
    onBack: () => void;
    onGenerate: () => void;
    isLoading: boolean;
    canGenerate: boolean;
}

const SkillsForm: React.FC<Props> = ({ data, setData, onBack, onGenerate, isLoading, canGenerate }) => {
    const [currentSkill, setCurrentSkill] = useState('');

    const handleAddSkill = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentSkill && !data.find(s => s.name.toLowerCase() === currentSkill.toLowerCase())) {
            setData([...data, { id: Date.now().toString(), name: currentSkill }]);
            setCurrentSkill('');
        }
    };

    const handleRemoveSkill = (id: string) => {
        setData(data.filter(skill => skill.id !== id));
    };

    return (
        <Card>
            <h2 className="text-xl font-semibold mb-4">Skills</h2>
            <form onSubmit={handleAddSkill} className="flex items-center gap-4 mb-4">
                <Input
                    label="Add a skill"
                    id="skill"
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    placeholder="e.g., React, Project Management"
                />
                <Button type="submit" className="mt-6" icon="fa-plus">Add</Button>
            </form>
            <div className="flex flex-wrap gap-2 mb-6">
                {data.map(skill => (
                    <span key={skill.id} className="bg-primary text-white text-sm font-medium px-3 py-1 rounded-full flex items-center gap-2">
                        {skill.name}
                        <button onClick={() => handleRemoveSkill(skill.id)} className="text-white hover:text-gray-200">
                            &times;
                        </button>
                    </span>
                ))}
            </div>
            <div className="mt-6 flex justify-between">
                <Button onClick={onBack} variant="secondary">Back</Button>
                <Button onClick={onGenerate} isLoading={isLoading} disabled={!canGenerate || isLoading}>
                    {isLoading ? 'Generating...' : 'Generate Resume with AI'}
                    <i className="fas fa-robot ml-2"></i>
                </Button>
            </div>
        </Card>
    );
};

export default SkillsForm;
