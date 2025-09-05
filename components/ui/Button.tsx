
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    isLoading?: boolean;
    icon?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', isLoading = false, icon, className = '', ...props }) => {
    const baseClasses = 'px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed';

    const variantClasses = {
        primary: 'bg-primary text-white hover:bg-blue-600 focus:ring-blue-500',
        secondary: 'bg-indigo-500 text-white hover:bg-indigo-600 focus:ring-indigo-500',
        danger: 'bg-danger text-white hover:bg-red-600 focus:ring-red-500',
        ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-primary',
    };

    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? (
                <i className="fas fa-spinner fa-spin mr-2"></i>
            ) : (
                icon && <i className={`fas ${icon} mr-2`}></i>
            )}
            {children}
        </button>
    );
};

export default Button;
