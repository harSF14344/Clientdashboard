import React from 'react';
import Select from 'react-select';
import { useClients } from '../hooks/useClients';

interface SearchFiltersProps {
  onFilterChange: (filters: {
    industry?: string | null;
    country?: string | null;
    status?: string | null;
  }) => void;
  activeFilters: {
    industry: string | null;
    country: string | null;
    status: string | null;
  };
}

const selectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    backgroundColor: 'transparent',
    borderColor: state.isFocused ? '#6366F1' : '#374151',
    '&:hover': {
      borderColor: '#4F46E5'
    }
  }),
  menu: (base: any) => ({
    ...base,
    backgroundColor: '#1F2937',
    border: '1px solid #374151'
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isFocused ? '#374151' : 'transparent',
    '&:active': {
      backgroundColor: '#4B5563'
    },
    color: '#E5E7EB'
  }),
  singleValue: (base: any) => ({
    ...base,
    color: '#E5E7EB'
  }),
  input: (base: any) => ({
    ...base,
    color: '#E5E7EB'
  }),
  placeholder: (base: any) => ({
    ...base,
    color: '#9CA3AF'
  })
};

export default function SearchFilters({ onFilterChange, activeFilters }: SearchFiltersProps) {
  const { clients } = useClients();

  const industries = Array.from(new Set(clients.map(client => client.industry)));
  const countries = Array.from(new Set(clients.map(client => client.country)));
  const statuses = ['Active', 'Inactive', 'Pending'];

  const createOptions = (values: string[]) =>
    values.map(value => ({ value, label: value }));

  const getValue = (key: keyof typeof activeFilters) => {
    const value = activeFilters[key];
    return value ? { value, label: value } : null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Select
        isClearable
        placeholder="Filter by Industry"
        options={createOptions(industries)}
        value={getValue('industry')}
        onChange={(option) => onFilterChange({ industry: option?.value || null })}
        className="text-sm"
        styles={selectStyles}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: '#6366F1',
            primary75: '#4F46E5',
            primary50: '#4F46E5',
            primary25: '#374151',
            neutral0: '#1F2937',
            neutral5: '#374151',
            neutral10: '#4B5563',
            neutral20: '#6B7280',
            neutral30: '#9CA3AF',
            neutral40: '#D1D5DB',
            neutral50: '#E5E7EB',
            neutral60: '#F3F4F6',
            neutral70: '#F9FAFB',
            neutral80: '#FFFFFF',
            neutral90: '#FFFFFF'
          }
        })}
      />
      <Select
        isClearable
        placeholder="Filter by Country"
        options={createOptions(countries)}
        value={getValue('country')}
        onChange={(option) => onFilterChange({ country: option?.value || null })}
        className="text-sm"
        styles={selectStyles}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: '#6366F1',
            primary75: '#4F46E5',
            primary50: '#4F46E5',
            primary25: '#374151',
            neutral0: '#1F2937',
            neutral5: '#374151',
            neutral10: '#4B5563',
            neutral20: '#6B7280',
            neutral30: '#9CA3AF',
            neutral40: '#D1D5DB',
            neutral50: '#E5E7EB',
            neutral60: '#F3F4F6',
            neutral70: '#F9FAFB',
            neutral80: '#FFFFFF',
            neutral90: '#FFFFFF'
          }
        })}
      />
      <Select
        isClearable
        placeholder="Filter by Status"
        options={createOptions(statuses)}
        value={getValue('status')}
        onChange={(option) => onFilterChange({ status: option?.value || null })}
        className="text-sm"
        styles={selectStyles}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: '#6366F1',
            primary75: '#4F46E5',
            primary50: '#4F46E5',
            primary25: '#374151',
            neutral0: '#1F2937',
            neutral5: '#374151',
            neutral10: '#4B5563',
            neutral20: '#6B7280',
            neutral30: '#9CA3AF',
            neutral40: '#D1D5DB',
            neutral50: '#E5E7EB',
            neutral60: '#F3F4F6',
            neutral70: '#F9FAFB',
            neutral80: '#FFFFFF',
            neutral90: '#FFFFFF'
          }
        })}
      />
    </div>
  );
}