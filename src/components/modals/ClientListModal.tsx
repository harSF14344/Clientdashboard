import React from 'react';
import { X, MapPin, Building2, Globe2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Client } from '../../types/client';

interface CountryGroup {
  name: string;
  clients: Client[];
}

interface ClientListModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  clients: Client[];
  showCountryGroups?: boolean;
  countryGroups?: CountryGroup[];
}

export default function ClientListModal({
  isOpen,
  onClose,
  title,
  clients,
  showCountryGroups = false,
  countryGroups = []
}: ClientListModalProps) {
  if (!isOpen) return null;

  const renderClientCard = (client: Client) => (
    <Link
      to={`/client/${client.id}`}
      key={client.id}
      className="block bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h3 className="font-medium text-gray-900 dark:text-white">{client.name}</h3>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Building2 className="h-4 w-4 mr-1" />
            <span>{client.industry}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{client.country}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Globe2 className="h-4 w-4 mr-1" />
            <span>{client.workSetup}</span>
          </div>
        </div>
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
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
    </Link>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl">
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {showCountryGroups ? (
            <div className="space-y-6">
              {countryGroups.map(group => (
                <div key={group.name}>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    {group.name}
                  </h3>
                  <div className="space-y-3">
                    {group.clients.map(client => renderClientCard(client))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {clients.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  No clients found
                </p>
              ) : (
                clients.map(client => renderClientCard(client))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}