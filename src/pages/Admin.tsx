import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { PlusCircle, List, Users, Settings } from 'lucide-react';
import ManageClients from './ManageClients';
import AddClient from './AddClient';
import EditClient from './EditClient';

function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
        <div className="flex items-center space-x-3 mb-4">
          <Settings className="h-8 w-8 text-primary-400" />
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        </div>
        <p className="text-gray-300 text-lg">
          Manage your client database and administrative settings
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Link
          to="/admin/add"
          className="group bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700 hover:border-primary-500 hover:shadow-lg transition-all duration-200"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-primary-900/30 p-4 rounded-lg">
              <PlusCircle className="h-8 w-8 text-primary-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Add New Client</h3>
              <p className="text-gray-400">Create and configure a new client profile</p>
            </div>
          </div>
        </Link>

        <Link
          to="/admin/manage"
          className="group bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700 hover:border-primary-500 hover:shadow-lg transition-all duration-200"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-primary-900/30 p-4 rounded-lg">
              <Users className="h-8 w-8 text-primary-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Manage Clients</h3>
              <p className="text-gray-400">View, edit, and manage existing client profiles</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default function Admin() {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/add" element={<AddClient />} />
      <Route path="/manage" element={<ManageClients />} />
      <Route path="/edit/:id" element={<EditClient />} />
    </Routes>
  );
}