
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

const RegisterPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && email && password) {
            // Simulate registration and login
            login({ id: Date.now().toString(), name, email, role: 'user', subscription: 'free', resumesGeneratedThisWeek: 0 });
            navigate('/dashboard');
        } else {
            setError('Please fill out all fields');
        }
    };

    return (
        <div className="flex justify-center items-center py-12">
            <Card className="w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Create Your Account</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Full Name"
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <Input
                        label="Email Address"
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        label="Password"
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <p className="text-danger text-sm">{error}</p>}
                    <Button type="submit" className="w-full">
                        Create Account
                    </Button>
                </form>
                 <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account? <Link to="/login" className="font-medium text-primary hover:underline">Log In</Link>
                    </p>
                </div>
            </Card>
        </div>
    );
};

export default RegisterPage;
