
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  BarChart3, 
  Brain, 
  Shield, 
  Smartphone, 
  Zap, 
  Leaf,
  Droplets,
  Bell
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
      title: "Real-Time Monitoring",
      description: "Track pH, temperature, oxygen levels, and more with live sensor data updates every minute."
    },
    {
      icon: <Brain className="w-8 h-8 text-purple-600" />,
      title: "AI-Powered Insights",
      description: "Get intelligent recommendations for plant care based on advanced machine learning algorithms."
    },
    {
      icon: <Bell className="w-8 h-8 text-orange-600" />,
      title: "Smart Alerts",
      description: "Receive instant notifications when your system needs attention or parameters drift."
    },
    {
      icon: <Smartphone className="w-8 h-8 text-green-600" />,
      title: "Mobile Responsive",
      description: "Monitor your aquaponic system from anywhere with our fully responsive web application."
    },
    {
      icon: <Droplets className="w-8 h-8 text-cyan-600" />,
      title: "Water Quality Analysis",
      description: "Comprehensive water quality tracking with automated analysis and trend detection."
    },
    {
      icon: <Leaf className="w-8 h-8 text-emerald-600" />,
      title: "Plant Health Tracking",
      description: "Monitor plant growth patterns and receive care recommendations tailored to your crops."
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      title: "Energy Optimization",
      description: "Optimize power consumption while maintaining ideal growing conditions for maximum efficiency."
    },
    {
      icon: <Shield className="w-8 h-8 text-red-600" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime to ensure your data is always safe and accessible."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for Smart Aquaponics
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive platform combines cutting-edge sensor technology with artificial intelligence 
            to help you grow healthier plants while conserving resources.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-gray-50 rounded-full">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
