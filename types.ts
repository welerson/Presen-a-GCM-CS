
export interface HealthCenter {
  id: string;
  name: string;
  location: string;
  coords: {
    row: number;
    col: number;
  };
}

export interface Inspectorate {
  id: string;
  name:string;
}

export interface GuardPresence {
  id: string;
  warName: string;
  rank: string;
  inspectorateId: string;
  healthCenterId: string;
  timestamp: Date;
}