
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-500">
                <p>&copy; {new Date().getFullYear()} AI Resume Builder. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
