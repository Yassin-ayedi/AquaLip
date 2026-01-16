
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Brain, TrendingUp, Lightbulb, Target, Download } from 'lucide-react';

const AIInsights = () => {
  const chartData = [
    { name: 'Mon', pH: 6.5, temp: 23, oxygen: 7.8 },
    { name: 'Tue', pH: 6.7, temp: 24, oxygen: 8.1 },
    { name: 'Wed', pH: 6.8, temp: 24.5, oxygen: 8.2 },
    { name: 'Thu', pH: 6.6, temp: 23.8, oxygen: 7.9 },
    { name: 'Fri', pH: 6.8, temp: 24.5, oxygen: 8.2 },
    { name: 'Sat', pH: 6.9, temp: 25, oxygen: 8.0 },
    { name: 'Sun', pH: 6.8, temp: 24.2, oxygen: 7.8 }
  ];

  const growthPrediction = [
    { week: 'Week 1', predicted: 12, actual: 11 },
    { week: 'Week 2', predicted: 18, actual: 17 },
    { week: 'Week 3', predicted: 25, actual: 24 },
    { week: 'Week 4', predicted: 32, actual: null },
    { week: 'Week 5', predicted: 38, actual: null },
    { week: 'Week 6', predicted: 44, actual: null }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Insights & Analytics</h1>
        <p className="text-gray-600">Advanced predictions and recommendations powered by machine learning</p>
      </div>

      {/* Key Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-lg">Predictive Health Score</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 mb-2">87%</div>
            <p className="text-sm text-gray-600">Expected plant health for next week</p>
            <Badge className="mt-2 bg-green-100 text-green-800">Trending Up</Badge>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <CardTitle className="text-lg">Growth Rate</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-2">+15%</div>
            <p className="text-sm text-gray-600">Above average for this season</p>
            <Badge className="mt-2 bg-blue-100 text-blue-800">Optimal Range</Badge>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-purple-600" />
              <CardTitle className="text-lg">Efficiency Score</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600 mb-2">92%</div>
            <p className="text-sm text-gray-600">Water and nutrient utilization</p>
            <Badge className="mt-2 bg-green-100 text-green-800">Excellent</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>7-Day Sensor Trends</CardTitle>
            <Button size="sm" variant="outline" className="ml-auto">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="pH" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="temp" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="oxygen" stroke="#f59e0b" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-6 mt-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>pH Level</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Temperature</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>Oxygen</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Growth Prediction vs Actual</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={growthPrediction}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="predicted" fill="#93c5fd" name="Predicted (cm)" />
                <Bar dataKey="actual" fill="#3b82f6" name="Actual (cm)" />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-6 mt-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
                <span>Predicted Growth</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span>Actual Growth</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
            <span>AI-Generated Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Optimization Opportunities</h3>
              <div className="space-y-3">
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <p className="text-sm text-blue-800 font-medium">Lighting Schedule</p>
                  <p className="text-sm text-blue-700 mt-1">
                    Extend light exposure by 2 hours during morning for 15% growth boost
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                  <p className="text-sm text-green-800 font-medium">Nutrient Timing</p>
                  <p className="text-sm text-green-700 mt-1">
                    Optimal feeding window detected between 9-11 AM for better absorption
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Risk Predictions</h3>
              <div className="space-y-3">
                <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                  <p className="text-sm text-yellow-800 font-medium">pH Fluctuation Risk</p>
                  <p className="text-sm text-yellow-700 mt-1">
                    35% chance of pH dropping below 6.5 in next 48 hours
                  </p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
                  <p className="text-sm text-red-800 font-medium">Temperature Alert</p>
                  <p className="text-sm text-red-700 mt-1">
                    Monitor closely - temperature trending above optimal range
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIInsights;
