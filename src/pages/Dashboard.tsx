import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search as SearchIcon, 
  PlusCircle,
  ArrowRight,
  BarChart3,
  Globe2,
  Users2
} from 'lucide-react';
import { useClients } from '../hooks/useClients';
import StatsModal from '../components/StatsModal';
import AnalyticsDashboard from '../components/analytics/AnalyticsDashboard';
import SalesRepresentatives from '../components/analytics/SalesRepresentatives';

export default function Dashboard() {
  const { clients, loading } = useClients();
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    clients: typeof clients;
  }>({
    isOpen: false,
    title: '',
    clients: [],
  });

  const handleShowModal = (title: string, filteredClients: typeof clients) => {
    setModalConfig({
      isOpen: true,
      title,
      clients: filteredClients,
    });
  };

  const handleCloseModal = () => {
    setModalConfig(prev => ({ ...prev, isOpen: false }));
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 dark:border-primary-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="bg-gray-800 rounded-xl p-8 border border-gray-700">
        <h1 className="text-4xl font-bold text-white mb-4">
          Client Information Dashboard
        </h1>
        <p className="text-xl text-gray-300">
          Manage and access detailed information about your clients in one centralized location.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-primary-900/30 rounded-lg">
                <Users2 className="h-6 w-6 text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Total Clients</h3>
            </div>
            <p className="text-3xl font-bold text-white">{clients.length}</p>
          </div>

          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-primary-900/30 rounded-lg">
                <BarChart3 className="h-6 w-6 text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Industries</h3>
            </div>
            <p className="text-3xl font-bold text-white">
              {new Set(clients.map(c => c.industry)).size}
            </p>
          </div>

          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-primary-900/30 rounded-lg">
                <Globe2 className="h-6 w-6 text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Countries</h3>
            </div>
            <p className="text-3xl font-bold text-white">
              {new Set(clients.map(c => c.country)).size}
            </p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <AnalyticsDashboard clients={clients} />

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to="/search"
              className="group bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700 hover:border-primary-500 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary-900/30 p-3 rounded-lg">
                      <SearchIcon className="h-6 w-6 text-primary-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Search Clients</h3>
                  </div>
                  <p className="text-gray-300">
                    Quickly find and access detailed client information
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-500 group-hover:text-primary-400 transition-colors duration-200" />
              </div>
            </Link>

            <Link
              to="/admin/add"
              className="group bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700 hover:border-primary-500 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary-900/30 p-3 rounded-lg">
                      <PlusCircle className="h-6 w-6 text-primary-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Add New Client</h3>
                  </div>
                  <p className="text-gray-300">
                    Create and set up a new client profile
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-500 group-hover:text-primary-400 transition-colors duration-200" />
              </div>
            </Link>
          </div>
        </div>

        <div>
          <SalesRepresentatives clients={clients} />
        </div>
      </div>

      <StatsModal
        isOpen={modalConfig.isOpen}
        onClose={handleCloseModal}
        title={modalConfig.title}
        clients={modalConfig.clients}
      />
    </div>
  );
}