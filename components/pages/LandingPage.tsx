
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const FeatureCard: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
        <div className="text-primary text-4xl mb-4"><i className={`fas ${icon}`}></i></div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const LandingPage: React.FC = () => {
    return (
        <div className="space-y-20">
            {/* Hero Section */}
            <section className="text-center py-20">
                <h1 className="text-5xl md:text-6xl font-extrabold text-dark mb-4">
                    Build Your Professional Resume <span className="text-primary">in Minutes</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                    Leverage the power of AI to create a standout, ATS-friendly resume that gets you noticed.
                </p>
                <Link to="/register">
                    {/* FIX: Removed non-existent 'size' prop. Sizing is handled by className. */}
                    <Button className="text-lg px-8 py-3">
                        Get Started for Free <i className="fas fa-arrow-right ml-2"></i>
                    </Button>
                </Link>
            </section>
            
            {/* Features Section */}
            <section>
                <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon="fa-robot"
                        title="AI-Powered Content"
                        description="Our AI crafts compelling summary and experience points tailored to your profile."
                    />
                    <FeatureCard
                        icon="fa-file-pdf"
                        title="PDF Downloads"
                        description="Export your professionally formatted resume as a high-quality PDF with a single click."
                    />
                    <FeatureCard
                        icon="fa-check-double"
                        title="ATS-Friendly"
                        description="Designs and formats optimized to pass through Applicant Tracking Systems."
                    />
                </div>
            </section>
            
            {/* CTA Section */}
            <section className="bg-primary text-white rounded-lg p-12 text-center">
                 <h2 className="text-3xl font-bold mb-4">Ready to Land Your Dream Job?</h2>
                 <p className="text-lg mb-8">
                     Join thousands of successful professionals who have built their careers with our help.
                 </p>
                 <Link to="/builder">
                     {/* FIX: Removed non-existent 'size' prop. Sizing is handled by className. */}
                     <Button variant="secondary" className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-3">
                         Build My Resume Now
                     </Button>
                 </Link>
            </section>
        </div>
    );
};

export default LandingPage;