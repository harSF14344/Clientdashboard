import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, X } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import toast from 'react-hot-toast';
import type { Client, PointOfContact } from '../types/client';

export default function AddClient() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    about: '',
    industry: '',
    country: '',
    workSetup: 'Work from home' as const,
    holidays: '',
    hmoDetails: '',
    leaves: '',
    pocs: [{ name: '', position: '', email: '' }],
    rolesFilled: [''],
    salesRep: '',
    status: 'Active' as const,
    timezone: '',
    website: '',
    yearOnboarded: new Date().getFullYear()
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'number' ? parseInt(e.target.value) : e.target.value;
    setFormData(prev => ({
      ...prev,
      [e.target.name]: value
    }));
  };

  const handlePocChange = (index: number, field: keyof PointOfContact, value: string) => {
    setFormData(prev => {
      const newPocs = [...prev.pocs];
      newPocs[index] = { ...newPocs[index], [field]: value };
      return { ...prev, pocs: newPocs };
    });
  };

  const addPoc = () => {
    setFormData(prev => ({
      ...prev,
      pocs: [...prev.pocs, { name: '', position: '', email: '' }]
    }));
  };

  const removePoc = (index: number) => {
    setFormData(prev => ({
      ...prev,
      pocs: prev.pocs.filter((_, i) => i !== index)
    }));
  };

  const handleRoleChange = (index: number, value: string) => {
    setFormData(prev => {
      const newRoles = [...prev.rolesFilled];
      newRoles[index] = value;
      return { ...prev, rolesFilled: newRoles };
    });
  };

  const addRole = () => {
    setFormData(prev => ({
      ...prev,
      rolesFilled: [...prev.rolesFilled, '']
    }));
  };

  const removeRole = (index: number) => {
    setFormData(prev => ({
      ...prev,
      rolesFilled: prev.rolesFilled.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const clientData = {
        ...formData,
        nameLower: formData.name.toLowerCase(),
        pocs: formData.pocs.filter(poc => poc.name && poc.email),
        rolesFilled: formData.rolesFilled.filter(role => role),
        yearOnboarded: parseInt(formData.yearOnboarded.toString())
      };

      await addDoc(collection(db, 'clients'), clientData);
      toast.success('Client added successfully!');
      navigate('/admin/manage');
    } catch (error) {
      toast.error('Failed to add client. Please try again.');
      console.error('Error adding client:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Add New Client</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 shadow rounded-lg p-6 border border-gray-700">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              Client Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-600 px-3 py-2 bg-gray-700 text-white focus:border-primary-500 focus:ring-primary-500"
            />
          </div>

          <div>
            <label htmlFor="yearOnboarded" className="block text-sm font-medium text-gray-300">
              Year Onboarded *
            </label>
            <input
              type="number"
              id="yearOnboarded"
              name="yearOnboarded"
              required
              min="2000"
              max={new Date().getFullYear()}
              value={formData.yearOnboarded}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-600 px-3 py-2 bg-gray-700 text-white focus:border-primary-500 focus:ring-primary-500"
            />
          </div>

          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-gray-300">
              Industry *
            </label>
            <input
              type="text"
              id="industry"
              name="industry"
              required
              value={formData.industry}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-600 px-3 py-2 bg-gray-700 text-white focus:border-primary-500 focus:ring-primary-500"
            />
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-300">
              Country *
            </label>
            <input
              type="text"
              id="country"
              name="country"
              required
              value={formData.country}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-600 px-3 py-2 bg-gray-700 text-white focus:border-primary-500 focus:ring-primary-500"
            />
          </div>

          <div>
            <label htmlFor="workSetup" className="block text-sm font-medium text-gray-300">
              Work Setup *
            </label>
            <select
              id="workSetup"
              name="workSetup"
              required
              value={formData.workSetup}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-600 px-3 py-2 bg-gray-700 text-white focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="Work from home">Work from home</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Onsite">Onsite</option>
            </select>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-300">
              Status *
            </label>
            <select
              id="status"
              name="status"
              required
              value={formData.status}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-600 px-3 py-2 bg-gray-700 text-white focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="about" className="block text-sm font-medium text-gray-300">
            About
          </label>
          <textarea
            id="about"
            name="about"
            rows={3}
            value={formData.about}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-600 px-3 py-2 bg-gray-700 text-white focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        {/* Points of Contact */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-white">Points of Contact</h3>
            <button
              type="button"
              onClick={addPoc}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-primary-400 bg-primary-900/30 hover:bg-primary-900/50"
            >
              <PlusCircle className="h-4 w-4 mr-1" />
              Add POC
            </button>
          </div>

          <div className="space-y-4">
            {formData.pocs.map((poc, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-1 grid grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    value={poc.name}
                    onChange={(e) => handlePocChange(index, 'name', e.target.value)}
                    className="rounded-md border border-gray-600 px-3 py-2 bg-gray-700 text-white focus:border-primary-500 focus:ring-primary-500"
                  />
                  <input
                    type="text"
                    placeholder="Position"
                    value={poc.position}
                    onChange={(e) => handlePocChange(index, 'position', e.target.value)}
                    className="rounded-md border border-gray-600 px-3 py-2 bg-gray-700 text-white focus:border-primary-500 focus:ring-primary-500"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={poc.email}
                    onChange={(e) => handlePocChange(index, 'email', e.target.value)}
                    className="rounded-md border border-gray-600 px-3 py-2 bg-gray-700 text-white focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removePoc(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Roles Filled */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-white">Roles Filled</h3>
            <button
              type="button"
              onClick={addRole}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-primary-400 bg-primary-900/30 hover:bg-primary-900/50"
            >
              <PlusCircle className="h-4 w-4 mr-1" />
              Add Role
            </button>
          </div>

          <div className="space-y-4">
            {formData.rolesFilled.map((role, index) => (
              <div key={index} className="flex items-center space-x-4">
                <input
                  type="text"
                  placeholder="Role title"
                  value={role}
                  onChange={(e) => handleRoleChange(index, e.target.value)}
                  className="flex-1 rounded-md border border-gray-600 px-3 py-2 bg-gray-700 text-white focus:border-primary-500 focus:ring-primary-500"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeRole(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="holidays" className="block text-sm font-medium text-gray-300">
              Holidays
            </label>
            <input
              type="text"
              id="holidays"
              name="holidays"
              value={formData.holidays}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-600 px-3 py-2 bg-gray-700 text-white focus:border-primary-500 focus:ring-primary-500"
            />
          </div>

          <div>
            <label htmlFor="hmoDetails" className="block text-sm font-medium text-gray-300">
              HMO Details
            </label>
            <input
              type="text"
              id="hmoDetails"
              name="hmoDetails"
              value={formData.hmoDetails}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-600 px-3 py-2 bg-gray-700 text-white focus:border-primary-500 focus:ring-primary-500"
            />
          </div>

          <div>
            <label htmlFor="leaves" className="block text-sm font-medium text-gray-300">
              Leaves
            </label>
            <input
              type="text"
              id="leaves"
              name="leaves"
              value={formData.leaves}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-600 px-3 py-2 bg-gray-700 text-white focus:border-primary-500 focus:ring-primary-500"
            />
          </div>

          <div>
            <label htmlFor="salesRep" className="block text-sm font-medium text-gray-300">
              Sales Representative
            </label>
            <input
              type="text"
              id="salesRep"
              name="salesRep"
              value={formData.salesRep}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-600 px-3 py-2 bg-gray-700 text-white focus:border-primary-500 focus:ring-primary-500"
            />
          </div>

          <div>
            <label htmlFor="timezone" className="block text-sm font-medium text-gray-300">
              Timezone
            </label>
            <input
              type="text"
              id="timezone"
              name="timezone"
              value={formData.timezone}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-600 px-3 py-2 bg-gray-700 text-white focus:border-primary-500 focus:ring-primary-500"
            />
          </div>

          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-300">
              Website
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-600 px-3 py-2 bg-gray-700 text-white focus:border-primary-500 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/manage')}
            className="px-4 py-2 border border-gray-600 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700/50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Client'}
          </button>
        </div>
      </form>
    </div>
  );
}