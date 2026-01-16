
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Droplets, Leaf, TrendingUp } from 'lucide-react';

const HeroSection = () => {
  const scrollToDemo = () => {
    const demoSection = document.getElementById('demo-section');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 aqua-gradient">
        <div className="absolute inset-0 water-shimmer opacity-30"></div>
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Smart Aquaponics
            <span className="block bg-gradient-to-r from-blue-100 to-white bg-clip-text text-transparent">
              Monitoring
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Monitor your aquaponic systems with real-time sensors and AI-powered insights. 
            Grow healthier plants while conserving water and resources.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4 h-auto">
              Start Monitoring
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="ghost"
              onClick={scrollToDemo}
              className="border border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4 h-auto bg-transparent"
            >
              View Demo
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-6 text-white">
            <div className="flex items-center space-x-2 bg-white/10 rounded-full px-6 py-3 glass-effect">
              <Droplets className="w-5 h-5" />
              <span>Real-time Monitoring</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 rounded-full px-6 py-3 glass-effect">
              <Leaf className="w-5 h-5" />
              <span>AI Plant Care</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 rounded-full px-6 py-3 glass-effect">
              <TrendingUp className="w-5 h-5" />
              <span>Growth Analytics</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 320" className="w-full h-32">
          <path
            fill="rgba(255,255,255,0.1)"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
