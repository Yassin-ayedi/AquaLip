
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SensorCardProps {
  title: string;
  value: string;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'stable';
}

const SensorCard = ({ title, value, unit, status, icon, trend }: SensorCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      case 'stable': return '→';
      default: return '';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-gray-600 flex items-center space-x-2">
            {icon}
            <span>{title}</span>
          </CardTitle>
          <Badge variant="outline" className={getStatusColor(status)}>
            {status.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-gray-900">{value}</span>
          <span className="text-sm text-gray-500">{unit}</span>
          {trend && (
            <span className="text-lg" title={`Trending ${trend}`}>
              {getTrendIcon(trend)}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SensorCard;
