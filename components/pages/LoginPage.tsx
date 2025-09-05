
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate login
        if (email === 'admin@example.com' && password === 'admin123') {
            login({ id: 'admin1', name: 'Admin User', email, role: 'admin', subscription: 'premium', resumesGeneratedThisWeek: 0 });
            navigate('/admin');
        } else if (email && password) {
            login({ id: 'user1', name: 'Test User', email, role: 'user', subscription: 'free', resumesGeneratedThisWeek: 1 });
            navigate('/dashboard');
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="flex justify-center items-center py-12">
            <Card className="w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Login to Your Account</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
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
                        Login
                    </Button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account? <Link to="/register" className="font-medium text-primary hover:underline">Sign Up</Link>
                    </p>
                </div>
            </Card>
        </div>
    );
};

export default LoginPage;
