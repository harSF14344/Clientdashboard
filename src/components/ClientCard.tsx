import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, MapPin, Globe } from 'lucide-react';
import type { Client } from '../types/client';

interface ClientCardProps {
  client: Client;
}

export default function ClientCard({ client }: ClientCardProps) {
  return (
    <Link
      to={`/client/${client.id}`}
      className="block bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{client.name}</h3>
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

        <div className="space-y-2">
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Building2 className="h-4 w-4 mr-2" />
            <span>{client.industry}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{client.country}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Globe className="h-4 w-4 mr-2" />
            <span>{client.workSetup}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}