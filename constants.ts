
import type { HealthCenter, Inspectorate } from './types';

export const INSPECTORATES: Inspectorate[] = [
  { id: 'insp_venda_nova', name: 'Inspetoria Venda Nova' },
];

export const GUARD_RANKS: string[] = ['GCMIII', 'GCMII', 'GCMI', 'GCDII', 'GCDI'];

export const HEALTH_CENTERS: HealthCenter[] = [
    { id: 'hc1', name: 'CS Santa Mônica', location: 'Venda Nova', coords: { row: 1, col: 1 } },
    { id: 'hc2', name: 'CS Mantiqueira', location: 'Venda Nova', coords: { row: 1, col: 2 } },
    { id: 'hc3', name: 'CS Rio Branco', location: 'Venda Nova', coords: { row: 1, col: 3 } },
    { id: 'hc4', name: 'CS Paraúna', location: 'Venda Nova', coords: { row: 1, col: 4 } },
    { id: 'hc5', name: 'CS Jardim Europa', location: 'Venda Nova', coords: { row: 2, col: 1 } },
    { id: 'hc6', name: 'CS Céu Azul', location: 'Venda Nova', coords: { row: 2, col: 2 } },
    { id: 'hc7', name: 'CS Minas Caixa', location: 'Venda Nova', coords: { row: 2, col: 3 } },
    { id: 'hc8', name: 'CS Nova York', location: 'Venda Nova', coords: { row: 2, col: 4 } },
    { id: 'hc9', name: 'CS Serra Verde', location: 'Venda Nova', coords: { row: 3, col: 1 } },
    { id: 'hc10', name: 'CS Santo Antônio', location: 'Venda Nova', coords: { row: 3, col: 2 } },
    { id: 'hc11', name: 'CS Copacabana', location: 'Venda Nova', coords: { row: 3, col: 3 } },
    { id: 'hc12', name: 'CS Jardim Leblon', location: 'Venda Nova', coords: { row: 3, col: 4 } },
    { id: 'hc13', name: 'CS Jardim Comerciários', location: 'Venda Nova', coords: { row: 4, col: 1 } },
    { id: 'hc14', name: 'CS Andradas', location: 'Venda Nova', coords: { row: 4, col: 2 } },
    { id: 'hc15', name: 'CS Lagoa', location: 'Venda Nova', coords: { row: 4, col: 3 } },
    { id: 'hc16', name: 'CS Piratininga', location: 'Venda Nova', coords: { row: 4, col: 4 } },
    { id: 'hc17', name: 'CS Alameda dos Ipês', location: 'Venda Nova', coords: { row: 5, col: 1 } },
    { id: 'hc18', name: 'Anexo CS Jd. Comerciários', location: 'Venda Nova', coords: { row: 5, col: 2 } }
];