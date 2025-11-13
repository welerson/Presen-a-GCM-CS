
import type { HealthCenter, Inspectorate } from './types';

export const INSPECTORATES: Inspectorate[] = [
  { id: 'insp1', name: 'Inspetoria Leste' },
  { id: 'insp2', name: 'Inspetoria Oeste' },
  { id: 'insp3', name: 'Inspetoria Norte' },
  { id: 'insp4', name: 'Inspetoria Sul' },
  { id: 'insp5', name: 'Inspetoria Central' },
];

export const HEALTH_CENTERS: HealthCenter[] = [
  { id: 'hc1', name: 'UPA Tatuapé', location: 'Zona Leste', coords: { row: 1, col: 4 } },
  { id: 'hc2', name: 'CS Jd. Nélia', location: 'Zona Leste', coords: { row: 1, col: 5 } },
  { id: 'hc3', name: 'UPA Lapa', location: 'Zona Oeste', coords: { row: 2, col: 2 } },
  { id: 'hc4', name: 'CS Butantã', location: 'Zona Oeste', coords: { row: 3, col: 1 } },
  { id: 'hc5', name: 'UPA Santana', location: 'Zona Norte', coords: { row: 1, col: 3 } },
  { id: 'hc6', name: 'CS Casa Verde', location: 'Zona Norte', coords: { row: 1, col: 2 } },
  { id: 'hc7', name: 'UPA Campo Limpo', location: 'Zona Sul', coords: { row: 4, col: 2 } },
  { id: 'hc8', name: 'CS Sto. Amaro', location: 'Zona Sul', coords: { row: 5, col: 3 } },
  { id: 'hc9', name: 'CS Sé', location: 'Centro', coords: { row: 3, col: 3 } },
  { id: 'hc10', name: 'UPA Vergueiro', location: 'Centro', coords: { row: 4, col: 4 } },
  { id: 'hc11', name: 'CS Itaquera', location: 'Zona Leste', coords: { row: 2, col: 5 } },
  { id: 'hc12', name: 'UPA Pirituba', location: 'Zona Norte', coords: { row: 2, col: 1 } },
];
