import React, { useState } from 'react';
import { Users, TrendingUp, Briefcase, Award, Calendar, ChevronRight } from 'lucide-react';
import type { Client } from '../../types/client';

interface SalesRepresentativesProps {
  clients: Client[];
}

export default function SalesRepresentatives({ clients }: SalesRepresentativesProps) {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number | 'all'>(currentYear);
  
  const availableYears = React.useMemo(() => {
    const years = new Set(clients.map(client => client.yearOnboarded));
    return Array.from(years).sort((a, b) => b - a);
  }, [clients]);

  const yearlyStats = React.useMemo(() => {
    const relevantClients = selectedYear === 'all' 
      ? clients 
      : clients.filter(client => client.yearOnboarded === selectedYear);
    
    if (relevantClients.length === 0) return null;

    const activeClients = relevantClients.filter(client => client.status === 'Active');
    const industries = new Set(relevantClients.map(client => client.industry));
    const countries = new Set(relevantClients.map(client => client.country));
    const salesReps = new Set(relevantClients.map(client => client.salesRep || 'Unassigned'));
    
    return {
      total: relevantClients.length,
      active: activeClients.length,
      performance: (activeClients.length / relevantClients.length) * 100,
      industries: industries.size,
      countries: countries.size,
      salesReps: salesReps.size,
      clients: relevantClients
    };
  }, [clients, selectedYear]);

  const getPerformanceColor = (performance: number) => {
    if (performance >= 80) return 'text-green-400';
    if (performance >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-md border border-gray-700">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">Performance Overview</h3>
            <p className="text-sm text-gray-400">Onboarding overview and metrics</p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={selectedYear === 'all' ? 'all' : selectedYear.toString()}
              onChange={(e) => setSelectedYear(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 text-sm focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Time</option>
              {availableYears.map(year => (
                <option key={`year-${year}`} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>

        {yearlyStats ? (
          <div className="space-y-6">
            {/* Overview Card */}
            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-primary-400" />
                  <h4 className="text-sm font-medium text-white">
                    {selectedYear === 'all' ? 'Overall Performance' : `${selectedYear} Performance`}
                  </h4>
                </div>
                <span className={`text-lg font-bold ${getPerformanceColor(yearlyStats.performance)}`}>
                  {yearlyStats.performance.toFixed(1)}%
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <p className="text-2xl font-bold text-white">{yearlyStats.active}</p>
                  <p className="text-sm text-gray-400">Active Clients</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <p className="text-2xl font-bold text-white">{yearlyStats.total}</p>
                  <p className="text-sm text-gray-400">Total Clients</p>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-900/50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Briefcase className="h-4 w-4 text-primary-400" />
                  <span className="text-sm text-gray-400">Industries</span>
                </div>
                <p className="text-xl font-bold text-white">{yearlyStats.industries}</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="h-4 w-4 text-primary-400" />
                  <span className="text-sm text-gray-400">Sales Reps</span>
                </div>
                <p className="text-xl font-bold text-white">{yearlyStats.salesReps}</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-primary-400" />
                  <span className="text-sm text-gray-400">Countries</span>
                </div>
                <p className="text-xl font-bold text-white">{yearlyStats.countries}</p>
              </div>
            </div>

            {/* Clients List */}
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-3">Recent Clients</h4>
              <div className="space-y-2 max-h-[240px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                {yearlyStats.clients.map(client => (
                  <div 
                    key={client.id}
                    className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg hover:bg-gray-900/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-primary-900/30 flex items-center justify-center">
                          <Users className="h-4 w-4 text-primary-400" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{client.name}</p>
                        <p className="text-xs text-gray-400">{client.industry}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          client.status === 'Active'
                            ? 'bg-green-900/30 text-green-400'
                            : client.status === 'Pending'
                            ? 'bg-yellow-900/30 text-yellow-400'
                            : 'bg-red-900/30 text-red-400'
                        }`}
                      >
                        {client.status}
                      </span>
                      <ChevronRight className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">
              No clients found {selectedYear !== 'all' ? `for ${selectedYear}` : ''}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}