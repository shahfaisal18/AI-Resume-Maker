
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

interface PlanProps {
    name: string;
    price: string;
    features: string[];
    isPopular?: boolean;
}

const PricingCard: React.FC<PlanProps> = ({ name, price, features, isPopular = false }) => (
    <div className={`border rounded-lg p-8 flex flex-col ${isPopular ? 'border-primary scale-105 shadow-xl' : 'border-gray-300'}`}>
        {isPopular && <span className="bg-primary text-white text-xs font-bold uppercase px-3 py-1 rounded-full self-start mb-4">Most Popular</span>}
        <h3 className="text-2xl font-bold">{name}</h3>
        <p className="mt-2 text-4xl font-extrabold mb-4">{price}<span className="text-xl font-medium text-gray-500">/mo</span></p>
        <p className="text-gray-500 mb-6">{name === 'Free' ? 'Get started for free' : 'Unlock all features'}</p>
        <ul className="space-y-4 text-gray-700 flex-grow">
            {features.map(feature => (
                <li key={feature} className="flex items-center">
                    <i className="fas fa-check-circle text-accent mr-3"></i>
                    {feature}
                </li>
            ))}
        </ul>
        <Link to={name === 'Free' ? '/register' : '#'}>
             <Button variant={isPopular ? 'primary' : 'ghost'} className={`w-full mt-8 ${!isPopular && 'border border-primary text-primary'}`}>
                {name === 'Free' ? 'Sign Up for Free' : 'Choose Plan'}
             </Button>
        </Link>
    </div>
);

const PricingPage: React.FC = () => {
    const plans = [
        {
            name: 'Free',
            price: '$0',
            features: [
                '2 AI Resume Generations per Week',
                'Standard Templates',
                'PDF Download',
                'Basic Support'
            ]
        },
        {
            name: 'Premium',
            price: '$19',
            isPopular: true,
            features: [
                'Unlimited AI Resume Generations',
                'Premium Templates',
                'PDF Download',
                'Cover Letter Generator',
                'Priority Support'
            ]
        }
    ];

    return (
        <div className="py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold">Choose Your Plan</h1>
                <p className="text-lg text-gray-600 mt-2">Simple, transparent pricing for everyone.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {plans.map(plan => <PricingCard key={plan.name} {...plan} />)}
            </div>
             <p className="text-center text-gray-500 mt-12">
               Note: This is a simulation. Stripe integration would be handled on the backend.
            </p>
        </div>
    );
};

export default PricingPage;
