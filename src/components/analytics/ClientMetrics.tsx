import React from 'react';
import { Activity, Users2, UserMinus, Globe } from 'lucide-react';
import type { Client } from '../../types/client';
import ClientListModal from '../modals/ClientListModal';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  onClick?: () => void;
  isClickable?: boolean;
}

function MetricCard({ title, value, icon, description, onClick, isClickable = false }: MetricCardProps) {
  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 ${
        isClickable ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
          {description && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
          )}
        </div>
        <div className="p-3 bg-primary-50 dark:bg-primary-900/30 rounded-lg">
          {icon}
        </div>
      </div>
    </div>
  );
}

interface ClientMetricsProps {
  clients: Client[];
}

export default function ClientMetrics({ clients }: ClientMetricsProps) {
  const [selectedClients, setSelectedClients] = React.useState<Client[]>([]);
  const [modalTitle, setModalTitle] = React.useState('');
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const activeClients = clients.filter(client => client.status === 'Active');
  const pendingClients = clients.filter(client => client.status === 'Pending');
  const inactiveClients = clients.filter(client => client.status === 'Inactive');
  const uniqueCountries = Array.from(new Set(clients.map(client => client.country)));

  const handleCardClick = (title: string, filteredClients: Client[]) => {
    setModalTitle(title);
    setSelectedClients(filteredClients);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const getClientsByCountry = () => {
    const clientsByCountry: { [key: string]: Client[] } = {};
    clients.forEach(client => {
      if (!clientsByCountry[client.country]) {
        clientsByCountry[client.country] = [];
      }
      clientsByCountry[client.country].push(client);
    });
    return Object.entries(clientsByCountry).map(([country, clients]) => ({
      name: country,
      clients
    }));
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Active Clients"
          value={activeClients.length}
          icon={<Activity className="h-6 w-6 text-primary-600 dark:text-primary-400" />}
          description="Currently active partnerships"
          onClick={() => handleCardClick('Active Clients', activeClients)}
          isClickable={true}
        />
        <MetricCard
          title="Pending Clients"
          value={pendingClients.length}
          icon={<Users2 className="h-6 w-6 text-primary-600 dark:text-primary-400" />}
          description="Clients in onboarding phase"
          onClick={() => handleCardClick('Pending Clients', pendingClients)}
          isClickable={true}
        />
        <MetricCard
          title="Inactive Clients"
          value={inactiveClients.length}
          icon={<UserMinus className="h-6 w-6 text-primary-600 dark:text-primary-400" />}
          description="Past or paused partnerships"
          onClick={() => handleCardClick('Inactive Clients', inactiveClients)}
          isClickable={true}
        />
        <MetricCard
          title="Global Presence"
          value={uniqueCountries.length}
          icon={<Globe className="h-6 w-6 text-primary-600 dark:text-primary-400" />}
          description="Countries with client presence"
          onClick={() => handleCardClick('Global Presence', clients)}
          isClickable={true}
        />
      </div>

      <ClientListModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={modalTitle}
        clients={selectedClients}
        showCountryGroups={modalTitle === 'Global Presence'}
        countryGroups={modalTitle === 'Global Presence' ? getClientsByCountry() : undefined}
      />
    </>
  );
}