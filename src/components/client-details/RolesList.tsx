import React from 'react';
import { Users } from 'lucide-react';
import type { Client } from '../../types/client';

interface RolesListProps {
  client: Client;
}

export default function RolesList({ client }: RolesListProps) {
  return (
    <section className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 border border-gray-100 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Roles Filled</h2>
      <div className="space-y-4">
        {client.rolesFilled.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {client.rolesFilled.map((role, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              >
                <Users className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                <span className="text-gray-900 dark:text-white">{role}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No roles filled yet.</p>
        )}
      </div>
    </section>
  );
}