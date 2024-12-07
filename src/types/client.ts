export interface PointOfContact {
  name: string;
  position: string;
  email: string;
}

export interface Client {
  id: string;
  name: string;
  about: string;
  industry: string;
  country: string;
  workSetup: 'Work from home' | 'Hybrid' | 'Onsite';
  holidays: string;
  hmoDetails: string;
  leaves: string;
  pocs: PointOfContact[];
  rolesFilled: string[];
  salesRep: string;
  status: 'Active' | 'Inactive' | 'Pending';
  timezone: string;
  website: string;
  yearOnboarded: number;
}