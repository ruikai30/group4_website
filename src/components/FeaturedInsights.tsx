
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Target, Zap, Globe } from 'lucide-react';

export const FeaturedInsights = () => {
  const insights = [
    {
      icon: TrendingUp,
      title: 'Global Emission Targets',
      insight: '89% of countries have committed to net-zero emissions by 2050',
      trend: '+12% from last year',
      category: 'Targets',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      icon: Zap,
      title: 'Renewable Energy',
      insight: 'Average renewable energy target across NDCs is 65% by 2030',
      trend: '156 countries committed',
      category: 'Energy',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Target,
      title: 'Baseline Years',
      insight: '2015 is the most common baseline year for emission calculations',
      trend: '68% of countries',
      category: 'Methodology',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Globe,
      title: 'Adaptation Focus',
      insight: 'Climate adaptation measures mentioned in 94% of updated NDCs',
      trend: 'Strong regional variations',
      category: 'Adaptation',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Insights</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Latest findings from our analysis of global climate commitments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {insights.map((item, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-lg ${item.bgColor} flex items-center justify-center`}>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {item.category}
                  </Badge>
                </div>
                <CardTitle className="text-lg text-gray-900">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 font-medium mb-2">{item.insight}</p>
                <p className={`text-sm ${item.color} font-medium`}>{item.trend}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span>Data updated every 48 hours • Last refresh: 2 hours ago</span>
          </div>
        </div>
      </div>
    </section>
  );
};
