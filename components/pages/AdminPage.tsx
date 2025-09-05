
import React from 'react';
import type { User } from '../../types';
import Card from '../ui/Card';

const mockUsers: User[] = [
    { id: 'user1', name: 'John Doe', email: 'john@example.com', role: 'user', subscription: 'free', resumesGeneratedThisWeek: 2 },
    { id: 'user2', name: 'Jane Smith', email: 'jane@example.com', role: 'user', subscription: 'premium', resumesGeneratedThisWeek: 15 },
    { id: 'user3', name: 'Sam Wilson', email: 'sam@example.com', role: 'user', subscription: 'free', resumesGeneratedThisWeek: 0 },
];

const AdminPage: React.FC = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <Card>
                <h2 className="text-xl font-semibold mb-4">User Management</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscription</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage (Week)</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {mockUsers.map(user => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.subscription === 'premium' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {user.subscription}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.resumesGeneratedThisWeek}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                                        <button className="text-red-600 hover:text-red-900">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default AdminPage;
