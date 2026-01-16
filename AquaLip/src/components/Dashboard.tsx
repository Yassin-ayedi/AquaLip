
import React, { useEffect, useState } from 'react';
import SensorCard from './SensorCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Thermometer, 
  Droplets, 
  Zap, 
  Sun, 
  Waves, 
  BeakerIcon,
  Brain,
  Clock,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';


//ayadi----------------------------------------------------------------------------------
//getting data from the backend


  

const Dashboard = () => {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    async function loadData() {
      const res = await fetch("http://localhost:3000/api/data");
      const data = await res.json();
      console.log(data);
      if (data.length === 0) return;

      //const data = data[0]; // assuming the first is the most recent

      const sensorData = [
        {
          title: "pH Level",
          value: data?.pH?.[0]?.value,
          unit: "pH",
          status: "good",
          icon: <BeakerIcon className="w-4 h-4" />,
          trend: "stable",
        },
        {
          title: "Temperature",
          value: data?.temp?.[0]?.value,
          unit: "°C",
          status: "good",
          icon: <Thermometer className="w-4 h-4" />,
          trend: "up",
        },
        {
          title: "Dissolved Oxygen",
          value: data?.DO?.[0]?.value,
          unit: "mg/L",
          status: "warning",
          icon: <Zap className="w-4 h-4" />,
          trend: "down",
        },
        {
          title: "Salinity",
          value: data?.Salinity?.[0]?.value,
          unit: "ppt",
          status: "good",
          icon: <Waves className="w-4 h-4" />,
          trend: "stable",
        },
        {
          title: "Water Level",
          value: data?.Water_Level?.[0]?.value,
          unit: "%",
          status: "good",
          icon: <Droplets className="w-4 h-4" />,
          trend: "down",
        },
        {
          title: "Light Intensity",
          value: data?.Light_Intensity?.[0]?.value,
          unit: "μmol/m²/s",
          status: "warning",
          icon: <Sun className="w-4 h-4" />,
          trend: "up",
        },
      ];
      setSensorData(sensorData);}
      loadData(); // initial load
      intervalId = setInterval(loadData, 5000); // repeat every 5s

       return () => clearInterval(intervalId); // cleanup on unmount
    
    
    }, []);

  const aiRecommendations = [
    {
      priority: 'high',
      message: 'Increase dissolved oxygen levels by improving water circulation',
      timestamp: '2 minutes ago',
      status: 'pending'
    },
    {
      priority: 'medium',
      message: 'Consider increasing light intensity for optimal photosynthesis',
      timestamp: '15 minutes ago',
      status: 'pending'
    },
    {
      priority: 'low',
      message: 'Monitor water level - trending downward but within acceptable range',
      timestamp: '1 hour ago',
      status: 'acknowledged'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">System Dashboard</h1>
        <p className="text-gray-600">Real-time monitoring and AI insights for your aquaponic system</p>
      </div>

      {/* Sensor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {sensorData.map((sensor, index) => (
          <SensorCard
            key={index}
            title={sensor.title}
            value={sensor.value}
            unit={sensor.unit}
            status={sensor.status}
            icon={sensor.icon}
            trend={sensor.trend}
          />
        ))}
      </div>

      {/* AI Recommendations Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-blue-600" />
              <span>AI Recommendations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiRecommendations.map((rec, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    {rec.status === 'acknowledged' ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-orange-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge className={getPriorityColor(rec.priority)}>
                        {rec.priority.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {rec.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{rec.message}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4">
              View All Recommendations
            </Button>
          </CardContent>
        </Card>

        {/* System Status Overview */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Overall Health</span>
                <Badge className="bg-green-100 text-green-800">Excellent</Badge>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Water Quality</span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Plant Health</span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">System Efficiency</span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Last Updated</span>
                  <span className="text-gray-900 font-medium">Just now</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
