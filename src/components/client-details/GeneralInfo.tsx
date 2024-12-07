import React from 'react';
import { Building2, Globe2, MapPin, Clock, Briefcase } from 'lucide-react';
import type { Client } from '../../types/client';

interface GeneralInfoProps {
  client: Client;
}

export default function GeneralInfo({ client }: GeneralInfoProps) {
  return (
    <section className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 border border-gray-100 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">General Information</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Building2 className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Industry</p>
            <p className="text-gray-900 dark:text-white">{client.industry}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <MapPin className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
            <p className="text-gray-900 dark:text-white">{client.country}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Briefcase className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Work Setup</p>
            <p className="text-gray-900 dark:text-white">{client.workSetup}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Clock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Timezone</p>
            <p className="text-gray-900 dark:text-white">{client.timezone || 'Not specified'}</p>
          </div>
        </div>

        {client.website && (
          <div className="flex items-center space-x-3">
            <Globe2 className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Website</p>
              <a
                href={client.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
              >
                {client.website}
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}