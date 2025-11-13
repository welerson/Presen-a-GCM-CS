import type { HealthCenter, Inspectorate } from './types';

export const INSPECTORATES: Inspectorate[] = [
  { id: 'insp_venda_nova', name: 'Inspetoria Venda Nova' },
  { id: 'insp_pampulha', name: 'Inspetoria Pampulha' },
  { id: 'insp_norte', name: 'Inspetoria Norte' },
  { id: 'insp_oeste', name: 'Inspetoria Oeste' },
  { id: 'insp_noroeste', name: 'Inspetoria Noroeste' },
  { id: 'insp_barreiro', name: 'Inspetoria Barreiro' },
  { id: 'insp_centro_sul', name: 'Inspetoria Centro-Sul' },
  { id: 'insp_leste', name: 'Inspetoria Leste' },
  { id: 'insp_nordeste', name: 'Inspetoria Nordeste' },
];

export const GUARD_RANKS: string[] = ['GCMIII', 'GCMII', 'GCMI', 'GCDII', 'GCDI'];

export const MACROS = {
  'MACRO1': { name: 'MACRO 1 (Venda Nova - Pampulha - Norte)', password: 'RUBI#01' },
  'MACRO2': { name: 'MACRO 2 (Oeste - Noroeste - Barreiro)', password: 'SAFIRA#02' },
  'MACRO3': { name: 'MACRO 3 (Centro Sul - Leste - Nordeste)', password: 'ESMERALDA#03' },
};

const generateCenters = (): HealthCenter[] => {
  const centers: HealthCenter[] = [];
  const macroConfig = [
    { name: 'MACRO1', regions: ['Venda Nova', 'Pampulha', 'Norte'], count: 51 },
    { name: 'MACRO2', regions: ['Oeste', 'Noroeste', 'Barreiro'], count: 51 },
    { name: 'MACRO3', regions: ['Centro Sul', 'Leste', 'Nordeste'], count: 51 },
  ];

  let idCounter = 1;
  let currentCol = 1;
  let currentRow = 1;
  const maxCols = 15; // Increased from 13 to 15 to make the grid more compact

  for (const macro of macroConfig) {
    for (let i = 0; i < macro.count; i++) {
      const region = macro.regions[i % macro.regions.length];
      const centerNumber = Math.floor(i / macro.regions.length) + 1;
      
      centers.push({
        id: `hc${idCounter}`,
        name: `CS ${region} ${centerNumber}`,
        location: region,
        macro: macro.name as 'MACRO1' | 'MACRO2' | 'MACRO3',
        coords: {
          row: currentRow,
          col: currentCol,
        },
      });
      
      idCounter++;
      currentCol++;
      if (currentCol > maxCols) {
        currentCol = 1;
        currentRow++;
      }
    }
  }
  return centers;
};


export const HEALTH_CENTERS: HealthCenter[] = generateCenters();