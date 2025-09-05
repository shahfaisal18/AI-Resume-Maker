
import React from 'react';
import type { PersonalInfo } from '../../types';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface Props {
    data: PersonalInfo;
    setData: React.Dispatch<React.SetStateAction<PersonalInfo>>;
    onNext: () => void;
}

const PersonalInfoForm: React.FC<Props> = ({ data, setData, onNext }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <Card>
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Full Name" name="name" value={data.name} onChange={handleChange} required />
                <Input label="Email" name="email" type="email" value={data.email} onChange={handleChange} required />
                <Input label="Phone" name="phone" type="tel" value={data.phone} onChange={handleChange} required />
                <Input label="LinkedIn URL" name="linkedin" value={data.linkedin} onChange={handleChange} />
                <Input label="GitHub URL" name="github" value={data.github} onChange={handleChange} />
                <Input label="Personal Website" name="website" value={data.website} onChange={handleChange} />
            </div>
            <div className="mt-6 text-right">
                <Button onClick={onNext}>Next: Education <i className="fas fa-arrow-right ml-2"></i></Button>
            </div>
        </Card>
    );
};

export default PersonalInfoForm;
