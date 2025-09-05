
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
    const { user } = useAuth();

    if (!user) {
        return <div>Loading...</div>;
    }
    
    const freeTierLimit = 2;
    const resumesLeft = user.subscription === 'free' ? Math.max(0, freeTierLimit - user.resumesGeneratedThisWeek) : Infinity;

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>

            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <h2 className="text-xl font-semibold mb-4">Account Overview</h2>
                    <div className="space-y-2 text-gray-700">
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Subscription:</strong> <span className={`font-bold ${user.subscription === 'premium' ? 'text-green-500' : 'text-yellow-500'}`}>{user.subscription.toUpperCase()}</span></p>
                    </div>
                </Card>
                <Card className="flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Your Usage</h2>
                        {user.subscription === 'free' ? (
                            <>
                                <p className="text-gray-700">You have generated <strong>{user.resumesGeneratedThisWeek} of {freeTierLimit}</strong> resumes this week.</p>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 my-4">
                                    <div className="bg-primary h-2.5 rounded-full" style={{ width: `${(user.resumesGeneratedThisWeek / freeTierLimit) * 100}%` }}></div>
                                </div>
                                <p className="text-sm text-gray-500">{resumesLeft} generations remaining.</p>
                            </>
                        ) : (
                            <p className="text-gray-700">You have <strong>unlimited</strong> resume generations with your Premium plan!</p>
                        )}
                    </div>
                     {user.subscription === 'free' && (
                        <Link to="/pricing" className="mt-4">
                            <Button variant="secondary" className="w-full">
                                Upgrade to Premium <i className="fas fa-rocket ml-2"></i>
                            </Button>
                        </Link>
                    )}
                </Card>
            </div>
            
            <Card>
                <div className="flex justify-between items-center mb-4">
                     <h2 className="text-xl font-semibold">Resume History</h2>
                     <Link to="/builder">
                         <Button icon="fa-plus">Create New Resume</Button>
                     </Link>
                </div>
                {/* This is a placeholder for resume history */}
                <div className="text-center py-10 border-2 border-dashed border-gray-300 rounded-lg">
                    <i className="fas fa-folder-open text-4xl text-gray-400 mb-4"></i>
                    <p className="text-gray-500">You haven't created any resumes yet.</p>
                    <p className="text-sm text-gray-400">Your created resumes will appear here.</p>
                </div>
            </Card>
        </div>
    );
};

export default DashboardPage;
