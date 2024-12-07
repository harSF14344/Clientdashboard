import React from 'react';
import { Calendar, Heart, User } from 'lucide-react';
import type { Client } from '../../types/client';

interface AdditionalInfoProps {
  client: Client;
}

export default function AdditionalInfo({ client }: AdditionalInfoProps) {
  return (
    <section className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 border border-gray-100 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Additional Information</h2>
      <div className="space-y-6">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            <h3 className="font-medium text-gray-900 dark:text-white">Holidays & Leaves</h3>
          </div>
          <div className="ml-7 space-y-2">
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-medium">Holidays:</span> {client.holidays || 'Not specified'}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-medium">Leaves:</span> {client.leaves || 'Not specified'}
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Heart className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            <h3 className="font-medium text-gray-900 dark:text-white">Benefits</h3>
          </div>
          <div className="ml-7">
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-medium">HMO Details:</span> {client.hmoDetails || 'Not specified'}
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-2">
            <User className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            <h3 className="font-medium text-gray-900 dark:text-white">Sales Representative</h3>
          </div>
          <div className="ml-7">
            <p className="text-gray-600 dark:text-gray-400">{client.salesRep || 'Not assigned'}</p>
          </div>
        </div>
      </div>
    </section>
  );
}