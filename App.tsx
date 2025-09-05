
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LandingPage from './components/pages/LandingPage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import DashboardPage from './components/pages/DashboardPage';
import BuilderPage from './components/pages/BuilderPage';
import PricingPage from './components/pages/PricingPage';
import AdminPage from './components/pages/AdminPage';
import Layout from './components/Layout';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <HashRouter>
                <Layout>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/pricing" element={<PricingPage />} />

                        <Route path="/dashboard" element={
                            <ProtectedRoute>
                                <DashboardPage />
                            </ProtectedRoute>
                        } />
                        <Route path="/builder" element={
                            <ProtectedRoute>
                                <BuilderPage />
                            </ProtectedRoute>
                        } />
                        <Route path="/admin" element={
                            <ProtectedRoute adminOnly={true}>
                                <AdminPage />
                            </ProtectedRoute>
                        } />

                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </Layout>
            </HashRouter>
        </AuthProvider>
    );
};

export default App;
