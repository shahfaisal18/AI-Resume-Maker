
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinkClasses = "text-gray-600 hover:text-primary transition-colors duration-300";
    const activeNavLinkClasses = "text-primary font-semibold";

    const navLinks = (
        <>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? `${navLinkClasses} ${activeNavLinkClasses}` : navLinkClasses}>Dashboard</NavLink>
            <NavLink to="/builder" className={({ isActive }) => isActive ? `${navLinkClasses} ${activeNavLinkClasses}` : navLinkClasses}>Builder</NavLink>
            <NavLink to="/pricing" className={({ isActive }) => isActive ? `${navLinkClasses} ${activeNavLinkClasses}` : navLinkClasses}>Pricing</NavLink>
            {user?.role === 'admin' && (
                <NavLink to="/admin" className={({ isActive }) => isActive ? `${navLinkClasses} ${activeNavLinkClasses}` : navLinkClasses}>Admin</NavLink>
            )}
        </>
    );

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-bold text-primary">
                            <i className="fas fa-file-alt mr-2"></i>AI Resume
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        {user ? (
                            <>
                                {navLinks}
                                <button
                                    onClick={logout}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <div className="space-x-4">
                                <Link to="/login" className="text-gray-600 hover:text-primary transition-colors">Login</Link>
                                <Link to="/register" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">Sign Up</Link>
                            </div>
                        )}
                    </div>
                    
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-primary focus:outline-none">
                            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
                        </button>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className="md:hidden pb-4">
                        <div className="flex flex-col space-y-4 items-center">
                            {user ? (
                                <>
                                    {navLinks}
                                    <button
                                        onClick={() => { logout(); setIsMenuOpen(false); }}
                                        className="bg-red-500 text-white w-full py-2 rounded-md hover:bg-red-600 transition-colors"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className={navLinkClasses}>Login</Link>
                                    <Link to="/register" onClick={() => setIsMenuOpen(false)} className="bg-primary text-white w-full text-center py-2 rounded-md hover:bg-blue-600 transition-colors">Sign Up</Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
