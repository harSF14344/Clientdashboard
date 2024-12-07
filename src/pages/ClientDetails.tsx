import React from 'react';
import { useParams } from 'react-router-dom';
import { useClientDetails } from '../hooks/useClientDetails';
import GeneralInfo from '../components/client-details/GeneralInfo';
import ContactInfo from '../components/client-details/ContactInfo';
import AdditionalInfo from '../components/client-details/AdditionalInfo';
import RolesList from '../components/client-details/RolesList';

export default function ClientDetails() {
  const { id } = useParams<{ id: string }>();
  const { client, loading, error } = useClientDetails(id || '');

  if (error) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Error</h2>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 dark:border-primary-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading client information...</p>
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Client Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400">The requested client could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{client.name}</h1>
            {client.about && (
              <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl">{client.about}</p>
            )}
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              client.status === 'Active'
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                : client.status === 'Pending'
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
            }`}
          >
            {client.status}
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GeneralInfo client={client} />
        <ContactInfo client={client} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdditionalInfo client={client} />
        <RolesList client={client} />
      </div>
    </div>
  );
}