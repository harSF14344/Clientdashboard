import React from 'react';
import { X } from 'lucide-react';
import type { Client } from '../types/client';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  clients: Client[];
}

export default function StatsModal({ isOpen, onClose, title, clients }: StatsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-4 max-h-[70vh] overflow-y-auto">
          {clients.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">No clients found</p>
          ) : (
            <div className="space-y-4">
              {clients.map((client) => (
                <div
                  key={client.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{client.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{client.industry}</p>
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
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}