
import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Users, Target, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About AquaLip
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            We're revolutionizing sustainable agriculture through smart aquaponics technology, 
            making it accessible for home gardeners and small-scale farmers worldwide.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="mb-12 border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-blue-100 rounded-full mr-4">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              AquaLip empowers individuals and communities to grow fresh, healthy food while conserving 
              water and minimizing environmental impact. By combining IoT sensors with artificial intelligence, 
              we make aquaponics accessible to everyone, regardless of their technical expertise.
            </p>
          </CardContent>
        </Card>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="p-3 bg-green-100 rounded-full w-fit mx-auto mb-4">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Sustainability</h3>
              <p className="text-gray-600">
                Promoting eco-friendly farming practices that use 90% less water than traditional agriculture.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="p-3 bg-purple-100 rounded-full w-fit mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community</h3>
              <p className="text-gray-600">
                Building a global network of sustainable growers sharing knowledge and best practices.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="p-3 bg-red-100 rounded-full w-fit mx-auto mb-4">
                <Heart className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Accessibility</h3>
              <p className="text-gray-600">
                Making advanced growing technology simple and affordable for everyone to use.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Founder Section */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="prose prose-lg text-gray-700">
              <p className="mb-4">
                AquaLip was born from a simple observation: traditional farming methods are becoming 
                unsustainable in our changing world. With growing populations, climate change, and 
                diminishing water resources, we needed a better way to grow food.
              </p>
              <p className="mb-4">
                Our team of engineers, data scientists, and agricultural experts came together with 
                a shared vision: to democratize sustainable food production through technology. 
                We believe that everyone should have access to fresh, nutritious food, regardless 
                of their location or resources.
              </p>
              <p>
                Today, AquaLip serves thousands of users worldwide, from urban apartment dwellers 
                growing herbs on their balconies to small farms producing food for their communities. 
                Together, we're building a more sustainable future, one garden at a time.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="text-center mt-12 p-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Get in Touch</h3>
          <p className="text-gray-600 mb-4">
            Have questions or want to learn more about AquaLip?
          </p>
          <a 
            href="mailto:support@aqualip.com" 
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ahmed.bensalah@ieee.org
          </a>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
