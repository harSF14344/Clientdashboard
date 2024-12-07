import type { Client } from '../types/client';

interface Distribution {
  name: string;
  value: number;
}

interface Metrics {
  summary: {
    'Total Clients': number;
    'Active Clients': number;
    'Pending Clients': number;
    'Total Industries': number;
  };
  industryDistribution: Distribution[];
  workSetupDistribution: Distribution[];
  countryDistribution: Distribution[];
  statusDistribution: Distribution[];
}

export function calculateMetrics(clients: Client[]): Metrics {
  const activeClients = clients.filter(client => client.status === 'Active').length;
  const pendingClients = clients.filter(client => client.status === 'Pending').length;
  const uniqueIndustries = new Set(clients.map(client => client.industry)).size;

  // Calculate distributions
  const distributions = {
    industry: {} as Record<string, number>,
    workSetup: {} as Record<string, number>,
    country: {} as Record<string, number>,
    status: {} as Record<string, number>,
  };

  clients.forEach(client => {
    // Industry distribution
    distributions.industry[client.industry] = (distributions.industry[client.industry] || 0) + 1;

    // Work setup distribution
    distributions.workSetup[client.workSetup] = (distributions.workSetup[client.workSetup] || 0) + 1;

    // Country distribution
    distributions.country[client.country] = (distributions.country[client.country] || 0) + 1;

    // Status distribution
    distributions.status[client.status] = (distributions.status[client.status] || 0) + 1;
  });

  // Convert to arrays and sort
  const toDistributionArray = (obj: Record<string, number>): Distribution[] =>
    Object.entries(obj)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

  return {
    summary: {
      'Total Clients': clients.length,
      'Active Clients': activeClients,
      'Pending Clients': pendingClients,
      'Total Industries': uniqueIndustries,
    },
    industryDistribution: toDistributionArray(distributions.industry),
    workSetupDistribution: toDistributionArray(distributions.workSetup),
    countryDistribution: toDistributionArray(distributions.country),
    statusDistribution: toDistributionArray(distributions.status),
  };
}