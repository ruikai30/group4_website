
import React from 'react';
import { Globe, FileText, Clock, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const StatsCards = () => {
  const stats = [
    {
      icon: Globe,
      title: 'Countries',
      value: '152',
      description: 'NDC documents analyzed',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100'
    },
    {
      icon: FileText,
      title: 'Documents',
      value: '847',
      description: 'Policy documents processed',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: TrendingUp,
      title: 'Research Questions',
      value: '10',
      description: 'Key climate metrics tracked',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Clock,
      title: 'Last Updated',
      value: '2 days',
      description: 'Database refresh cycle',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm font-medium text-gray-700">{stat.title}</p>
                  <p className="text-xs text-gray-500">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
