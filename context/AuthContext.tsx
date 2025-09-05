
import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { User } from '../types';

interface AuthContextType {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
    incrementResumeCount: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (userData: User) => {
        // In a real app, this would involve a token
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    const incrementResumeCount = () => {
        setUser(currentUser => {
            if (!currentUser) return null;
            return {
                ...currentUser,
                resumesGeneratedThisWeek: currentUser.resumesGeneratedThisWeek + 1,
            };
        });
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, incrementResumeCount }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
