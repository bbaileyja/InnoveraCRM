export type UserRole = 'admin' | 'sales' | 'technician';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
}

export type DealStatus = 
  | 'potential'
  | 'quote_requested'
  | 'work_requested'
  | 'planning'
  | 'assessment'
  | 'quoting'
  | 'waiting_approval'
  | 'in_progress'
  | 'completed';

export interface Deal {
  id: string;
  title: string;
  clientName: string;
  value: number;
  status: DealStatus;
  assignedTo: string;
  createdAt: Date;
}

export interface JobCard {
  id: string;
  dealId: string;
  status: 'pending' | 'in-progress' | 'completed';
  technician: string;
  location: {
    lat: number;
    lng: number;
  };
  materials: {
    id: string;
    name: string;
    quantity: number;
    unit: string;
  }[];
  notes: string;
  createdAt: Date;
}