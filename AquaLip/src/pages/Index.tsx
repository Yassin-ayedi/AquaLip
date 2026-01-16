
import React from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import DemoSection from '../components/DemoSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <DemoSection />
      <Footer />
    </div>
  );
};

export default Index;
