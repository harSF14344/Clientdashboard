import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import type { Client } from '../../types/client';
import { calculateMetrics } from '../../utils/analyticsHelpers';
import ClientMetrics from './ClientMetrics';

interface AnalyticsDashboardProps {
  clients: Client[];
}

const COLORS = ['#0066CC', '#00CC66', '#CC6600', '#6600CC'];

export default function AnalyticsDashboard({ clients }: AnalyticsDashboardProps) {
  const metrics = calculateMetrics(clients);

  return (
    <div className="space-y-8">
      <ClientMetrics clients={clients} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Industry Distribution */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700">
          <h3 className="text-lg font-medium text-white mb-4">Industry Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics.industryDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#6B7280' }}
                  stroke="#374151"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  interval={0}
                />
                <YAxis 
                  tick={{ fill: '#6B7280' }}
                  stroke="#374151"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: '#F3F4F6'
                  }}
                />
                <Bar dataKey="value" fill="#0066CC" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Work Setup Distribution */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700">
          <h3 className="text-lg font-medium text-white mb-4">Work Setup Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={metrics.workSetupDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {metrics.workSetupDistribution.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: '#F3F4F6'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}