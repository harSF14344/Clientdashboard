import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Client } from '../types/client';

export const generatePDF = (clients: Client[]) => {
  const doc = new jsPDF();

  // Add header with Sourcefit branding
  doc.setFontSize(24);
  doc.setTextColor(0, 102, 204); // Sourcefit blue
  doc.text('Sourcefit', 14, 20);
  
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text('Client Directory', 14, 30);
  
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, 14, 38);

  const tableData = clients.map(client => [
    client.name,
    client.industry,
    client.country,
    client.status,
    client.workSetup,
    client.salesRep || 'N/A'
  ]);

  autoTable(doc, {
    head: [['Name', 'Industry', 'Country', 'Status', 'Work Setup', 'Sales Rep']],
    body: tableData,
    startY: 45,
    styles: { 
      fontSize: 10,
      cellPadding: 3
    },
    headStyles: { 
      fillColor: [0, 102, 204],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    alternateRowStyles: {
      fillColor: [245, 247, 250]
    }
  });

  doc.save('sourcefit-client-directory.pdf');
};