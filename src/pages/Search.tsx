import React, { useState, useMemo } from 'react';
import { Search as SearchIcon, Filter } from 'lucide-react';
import { useClients } from '../hooks/useClients';
import ClientCard from '../components/ClientCard';
import SearchFilters from '../components/SearchFilters';
import ExportButtons from '../components/ExportButtons';

interface Filters {
  industry: string | null;
  country: string | null;
  status: string | null;
}

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    industry: null,
    country: null,
    status: null
  });
  const { clients, loading, error } = useClients(searchQuery);

  const filteredClients = useMemo(() => {
    return clients.filter(client => {
      const matchesIndustry = !filters.industry || client.industry === filters.industry;
      const matchesCountry = !filters.country || client.country === filters.country;
      const matchesStatus = !filters.status || client.status === filters.status;
      return matchesIndustry && matchesCountry && matchesStatus;
    });
  }, [clients, filters]);

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Search Clients</h1>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by client name..."
              className="w-full px-4 py-3 pl-10 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-white placeholder-gray-400"
            />
            <SearchIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="absolute right-3 top-3 p-1 text-gray-400 hover:text-white transition-colors"
            >
              <Filter className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <SearchFilters onFilterChange={handleFilterChange} activeFilters={filters} />
        </div>
      )}

      <div className="flex justify-end">
        <ExportButtons clients={filteredClients} />
      </div>

      {error && (
        <div className="bg-red-900/30 text-red-400 p-4 rounded-lg text-center border border-red-800">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center text-gray-400">Loading clients...</div>
      ) : filteredClients.length === 0 ? (
        <div className="bg-gray-800 rounded-lg shadow p-6 text-center text-gray-400 border border-gray-700">
          No clients found{searchQuery ? ` matching "${searchQuery}"` : ''}.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredClients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      )}
    </div>
  );
}