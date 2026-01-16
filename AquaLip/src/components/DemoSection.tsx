
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Play, BarChart3, Droplets, Thermometer, Leaf } from 'lucide-react';

const DemoSection = () => {
  return (
    <section id="demo-section" className="py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            See AquaLip in Action
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Watch how our smart monitoring system helps you grow healthier plants while conserving water and resources.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Video Demo */}
          <div className="relative">
            <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                  <p className="text-white text-lg">Demo Video</p>
                  <p className="text-white/70 text-sm">Click to play</p>
                </div>
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Analytics</h3>
                <p className="text-gray-600">Monitor pH levels, temperature, and nutrient concentrations in real-time with intuitive dashboards.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Droplets className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Water Management</h3>
                <p className="text-gray-600">Automated water quality control and circulation optimization for maximum efficiency.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Thermometer className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Climate Control</h3>
                <p className="text-gray-600">Maintain optimal growing conditions with automated temperature and humidity control.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Leaf className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Plant Health Monitoring</h3>
                <p className="text-gray-600">AI-powered plant health analysis and early disease detection for better yields.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
