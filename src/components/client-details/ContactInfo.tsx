import React from 'react';
import { Mail, UserCircle } from 'lucide-react';
import type { Client } from '../../types/client';

interface ContactInfoProps {
  client: Client;
}

export default function ContactInfo({ client }: ContactInfoProps) {
  return (
    <section className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 border border-gray-100 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h2>
      <div className="space-y-6">
        {client.pocs.map((poc, index) => (
          <div key={index} className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0">
            <div className="flex items-start space-x-3">
              <UserCircle className="h-5 w-5 text-gray-400 dark:text-gray-500 mt-1" />
              <div className="space-y-1">
                <p className="font-medium text-gray-900 dark:text-white">{poc.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{poc.position}</p>
                <a
                  href={`mailto:${poc.email}`}
                  className="flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                >
                  <Mail className="h-4 w-4" />
                  <span>{poc.email}</span>
                </a>
              </div>
            </div>
          </div>
        ))}
        {client.pocs.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400">No contact information available.</p>
        )}
      </div>
    </section>
  );
}