
export interface HealthCenter {
  id: string;
  name: string;
  location: string;
  macro: 'MACRO1' | 'MACRO2' | 'MACRO3';
  coords: {
    row: number;
    col: number;
  };
  inspectorateId: string;
  status?: 'active' | 'inactive';
}

export interface Inspectorate {
  id: string;
  name:string;
  macro: 'MACRO1' | 'MACRO2' | 'MACRO3';
}

export interface GuardPresence {
  id: string;
  warName: string;
  rank: string;
  inspectorateId: string;
  healthCenterId: string;
  timestamp: Date;
  psus?: boolean;
}