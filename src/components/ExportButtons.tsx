import React from 'react';
import { CSVLink } from 'react-csv';
import { FileDown, FileText } from 'lucide-react';
import type { Client } from '../types/client';
import { generatePDF } from '../utils/pdfGenerator';

interface ExportButtonsProps {
  clients: Client[];
}

export default function ExportButtons({ clients }: ExportButtonsProps) {
  const csvData = clients.map(client => ({
    Name: client.name,
    Industry: client.industry,
    Country: client.country,
    Status: client.status,
    'Work Setup': client.workSetup,
    'Sales Rep': client.salesRep,
    Website: client.website
  }));

  return (
    <div className="flex space-x-4">
      <CSVLink
        data={csvData}
        filename="sourcefit-clients.csv"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        <FileDown className="h-4 w-4 mr-2" />
        Export CSV
      </CSVLink>

      <button
        onClick={() => generatePDF(clients)}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        <FileText className="h-4 w-4 mr-2" />
        Export PDF
      </button>
    </div>
  );
}