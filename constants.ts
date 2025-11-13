import type { HealthCenter, Inspectorate } from './types';

export const INSPECTORATES: Inspectorate[] = [
  { id: 'insp_venda_nova', name: 'Inspetoria Venda Nova', macro: 'MACRO1' },
  { id: 'insp_pampulha', name: 'Inspetoria Pampulha', macro: 'MACRO1' },
  { id: 'insp_norte', name: 'Inspetoria Norte', macro: 'MACRO1' },
  { id: 'insp_oeste', name: 'Inspetoria Oeste', macro: 'MACRO2' },
  { id: 'insp_noroeste', name: 'Inspetoria Noroeste', macro: 'MACRO2' },
  { id: 'insp_barreiro', name: 'Inspetoria Barreiro', macro: 'MACRO2' },
  { id: 'insp_centro_sul', name: 'Inspetoria Centro-Sul', macro: 'MACRO3' },
  { id: 'insp_leste', name: 'Inspetoria Leste', macro: 'MACRO3' },
  { id: 'insp_nordeste', name: 'Inspetoria Nordeste', macro: 'MACRO3' },
];

export const GUARD_RANKS: string[] = ['GCMIII', 'GCMII', 'GCMI', 'GCDII', 'GCDI'];

export const MACROS = {
  'MACRO1': { name: 'MACRO 1 (Venda Nova - Pampulha - Norte)', password: 'RUBI#01', count: 50 },
  'MACRO2': { name: 'MACRO 2 (Oeste - Noroeste - Barreiro)', password: 'SAFIRA#02', count: 51 },
  'MACRO3': { name: 'MACRO 3 (Centro Sul - Leste - Nordeste)', password: 'ESMERALDA#03', count: 51 },
};

const VENDA_NOVA_CENTERS = [
  'CS COPACABANA',
  'CS JARDIM DOS COMERCIÁRIOS',
  'CS PARAÚNA – VENDA NOVA',
  'CS JARDIM EUROPA',
  'CS CÉU AZUL',
  'CS LAGOA',
  'CS JARDIM LEBLON',
  'CS MANTIQUEIRA',
  'CS NOVA YORK',
  'CS ANDRADAS',
  'CS SERRA VERDE',
  'CS PIRATININGA',
  'CS SANTA MÔNICA II – ALAMEDA DOS IPÊS',
  'CS SANTO ANTÔNIO',
  'CS SANTA MÔNICA',
  'CS MINAS CAIXA',
  'CS RIO BRANCO',
];

const PAMPULHA_CENTERS = [
  'CS ITAMARATI',
  'CS SÃO JOSÉ',
  'CS JARDIM ALVORADA',
  'CS SANTA ROSA',
  'CS OURO PRETO',
  'CS SERRANO',
  'CS SANTA TEREZINHA',
  'CS PADRE TIAGO',
  'CS SANTA AMÉLIA',
  'CS PADRE JOAQUIM MAIA',
  'CS CONFISCO',
  'CS DOM ORIONE',
  'CS TREVO',
  'CS SÃO FRANCISCO',
];

const NORTE_CENTERS = [
  'CS NOVO AARÃO REIS',
  'CS PRIMEIRO DE MAIO',
  'CS PROVIDÊNCIA',
  'CS CAMPO ALEGRE',
  'CS ETELVINA CARNEIRO',
  'CS ZILAH SPOSITO',
  'CS SÃO TOMAZ',
  'CS FLORAMAR',
  'CS LAJEDO',
  'CS MG-20',
  'CS JARDIM GUANABARA',
  'CS GUARANI',
  'CS JAQUELINE',
  'CS FELICIDADE II',
  'CS AARÃO REIS',
  'CS SÃO BERNARDO – AMÉLIA ROCHA DE MELO',
  'CS HELIÓPOLIS',
  'CS JAQUELINE II',
  'CS TUPI',
];

const generateCenters = (): HealthCenter[] => {
  const centers: HealthCenter[] = [];
  const macroConfig = [
    { name: 'MACRO1', regions: ['Venda Nova', 'Pampulha', 'Norte'], count: 50 },
    { name: 'MACRO2', regions: ['Oeste', 'Noroeste', 'Barreiro'], count: 51 },
    { name: 'MACRO3', regions: ['Centro Sul', 'Leste', 'Nordeste'], count: 51 },
  ];

  let idCounter = 1;
  let currentCol = 1;
  let currentRow = 1;
  const maxCols = 15;

  for (const macro of macroConfig) {
    for (let i = 0; i < macro.count; i++) {
      const region = macro.regions[i % macro.regions.length];
      const centerIndex = Math.floor(i / macro.regions.length);
      
      let centerName: string;
      let inspectorateId: string;

      if (region === 'Venda Nova' && centerIndex < VENDA_NOVA_CENTERS.length) {
        centerName = VENDA_NOVA_CENTERS[centerIndex];
        inspectorateId = 'insp_venda_nova';
      } else if (region === 'Pampulha' && centerIndex < PAMPULHA_CENTERS.length) {
        centerName = PAMPULHA_CENTERS[centerIndex];
        inspectorateId = 'insp_pampulha';
      } else if (region === 'Norte' && centerIndex < NORTE_CENTERS.length) {
        centerName = NORTE_CENTERS[centerIndex];
        inspectorateId = 'insp_norte';
      } else {
        centerName = `CS ${region} ${centerIndex + 1}`;
        switch(region) {
          case 'Oeste': inspectorateId = 'insp_oeste'; break;
          case 'Noroeste': inspectorateId = 'insp_noroeste'; break;
          case 'Barreiro': inspectorateId = 'insp_barreiro'; break;
          case 'Centro Sul': inspectorateId = 'insp_centro_sul'; break;
          case 'Leste': inspectorateId = 'insp_leste'; break;
          case 'Nordeste': inspectorateId = 'insp_nordeste'; break;
          default: inspectorateId = '';
        }
      }
      
      centers.push({
        id: `hc${idCounter}`,
        name: centerName,
        location: region,
        macro: macro.name as 'MACRO1' | 'MACRO2' | 'MACRO3',
        inspectorateId,
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