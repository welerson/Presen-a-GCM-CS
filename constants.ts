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

export const GUARD_RANKS: string[] = ['GCM III', 'GCM II', 'GCM I', 'GCD II', 'GCD I'];

export const MACROS = {
  'MACRO1': { name: 'MACRO 1 (Venda Nova - Pampulha - Norte)', password: 'GCMBH@123', count: 50 },
  'MACRO2': { name: 'MACRO 2 (Oeste - Noroeste - Barreiro)', password: 'BH@CS', count: 49 },
  'MACRO3': { name: 'MACRO 3 (Centro Sul - Leste - Nordeste)', password: 'CS@GCM', count: 48 },
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

const OESTE_CENTERS = [
  'CS VILA LEONINA',
  'CS CABANA',
  'CS VISTA ALEGRE',
  'CS JOÃO XXIII',
  'CS NORALDINO DE LIMA',
  'CS WALDOMIRO LOBO',
  'CS PALMEIRAS',
  'CS SALGADO FILHO',
  'CS CÍCERO IDELFONSO',
  'CS SÃO JORGE',
  'CS SANTA MARIA',
  'CS VENTOSA',
  'CS CAMARGOS',
  'CS AMILCAR VIANA MARTINS',
  'CS CONJUNTO BETÂNIA',
  'CS VILA IMPERIAL',
  'CS BETÂNIA',
  'CS HAVAI',
];

const NOROESTE_CENTERS = [
    'CS JARDIM MONTANHÊS',
    'CS DOM CABRAL',
    'CS SÃO CRISTÓVÃO',
    'CS DOM BOSCO',
    'CS COQUEIROS',
    'CS JARDIM FILADÉLFIA',
    'CS PEDREIRA PRADO LOPES',
    'CS JOÃO PINHEIRO',
    'CS ERMELINDA',
    'CS GLÓRIA',
    'CS BOM JESUS',
    'CS SANTOS ANJOS',
    'CS CARLOS PRATES',
    'CS PADRE EUSTÁQUIO',
    'CS CALIFÓRNIA',
    'CS PINDORAMA ELZA MARTINS',
];

const BARREIRO_CENTERS = [
    'CS URUCUIA',
    'CS VILA CEMIG',
    'CS VILA PINHO',
    'CS LINDEIA – MARIA MADALENA TEODORO',
    'CS MILIONÁRIOS',
    'CS SANTA CECÍLIA',
    'CS MIRAMAR – EDUARDO MAURO DE ARAÚJO',
    'CS ITAIPU – JATOBÁ',
    'CS INDEPENDÊNCIA',
    'CS VALE DO JATOBÁ',
    'CS BARREIRO DE CIMA',
    'CS MANGUEIRAS',
    'CS BARREIRO – CARLOS RENATO DIAS',
    'CS TIROL – FRANCISCO GOMES BARBOSA',
    'CS DIAMANTE – TEIXEIRA DIAS',
];

const CENTRO_SUL_CENTERS = [
  'CS NOSSA SENHORA DA CONCEIÇÃO – PADRE TARCÍSIO',
  'CS TIA AMÂNCIA',
  'CS SANTA RITA DE CÁSSIA',
  'CS CONJUNTO SANTA MARIA',
  'CS SANTA LÚCIA',
  'CS NOSSA SENHORA DE FÁTIMA',
  'CS NOSSA SENhora APARECIDA',
  'CS CARLOS CHAGAS',
  'CS MENINO JESUS',
  'CS OSWALDO CRUZ',
  'CS SÃO MIGUEL ARCANJO',
  'CS CAFEZAL',
];

const LESTE_NORDESTE_CENTERS = [
  'CS VILA MARIA',
  'CS CONJUNTO PAULO VI',
  'CS SÃO MARCOS',
  'CS GENTIL GOMES',
  'CS VILAS REUNIDAS – LEOPOLDO CRISÓSTOMO DE CASTRO',
  'CS ALTO VERA CRUZ',
  'CS PARAÍSO',
  'CS CACHOEIRINHA',
  'CS JARDIM VITÓRIA – MARCELO PONTEL GOMES',
  'CS PAULO VI – MARIVANDA BALEEIRO',
  'CS CIDADE OZANAN',
  'CS MARIANO DE ABREU',
  'CS GOIÂNIA',
  'CS TAQUARIL',
  'CS POMPÉIA',
  'CS MARIA GORETTI',
  'CS JOÃO VITAL',
  'CS NAZARÉ',
  'CS VERA CRUZ',
  'CS SAGRADA FAMÍLIA – MARCO ANTÔNIO DE MENEZES',
  'CS SÃO GERALDO',
  'CS SÃO PAULO',
  'CS SANTA INÊS',
  'CS ALCIDES LINS',
  'CS OLAVO ALBINO CORRÊA',
  'CS SÃO GABRIEL – FÁBIO CORRÊA LIMA',
  'CS RIBEIRO DE ABREU',
  'CS DOM JOAQUIM',
  'CS CAPITÃO EDUARDO',
  'CS BOA VISTA',
  'CS NOVO HORIZONTE',
  'CS GRANJA DE FREITAS',
  'CS HORTO',
  'CS SANTA CRUZ – PADRE FERNANDO DE MELLO',
  'CS CONJUNTO RIBEIRO DE ABREU – EFIGÊNIA MURTA FIGUEIREDO',
  'CS SÃO GERALDO'
];


const generateCenters = (): HealthCenter[] => {
  const centers: HealthCenter[] = [];
  let idCounter = 1;
  let currentCol = 1;
  let currentRow = 1;
  const maxCols = 15;

  const addCenter = (name: string, location: string, macro: 'MACRO1' | 'MACRO2' | 'MACRO3', inspectorateId: string) => {
    const newCenter: HealthCenter = {
      id: `hc${idCounter}`,
      name,
      location,
      macro,
      inspectorateId,
      coords: {
        row: currentRow,
        col: currentCol,
      },
    };

    if (name === 'C. S. JARDIM FELICIDADE') {
      newCenter.status = 'inactive';
    }

    centers.push(newCenter);
    idCounter++;
    currentCol++;
    if (currentCol > maxCols) {
      currentCol = 1;
      currentRow++;
    }
  };

  // MACRO 1 - Specific names from lists
  VENDA_NOVA_CENTERS.forEach(name => addCenter(name, 'Venda Nova', 'MACRO1', 'insp_venda_nova'));
  PAMPULHA_CENTERS.forEach(name => addCenter(name, 'Pampulha', 'MACRO1', 'insp_pampulha'));
  NORTE_CENTERS.forEach(name => addCenter(name, 'Norte', 'MACRO1', 'insp_norte'));

  // MACRO 2 - Specific names from lists
  OESTE_CENTERS.forEach(name => addCenter(name, 'Oeste', 'MACRO2', 'insp_oeste'));
  NOROESTE_CENTERS.forEach(name => addCenter(name, 'Noroeste', 'MACRO2', 'insp_noroeste'));
  BARREIRO_CENTERS.forEach(name => addCenter(name, 'Barreiro', 'MACRO2', 'insp_barreiro'));


  // MACRO 3
  // Specific names for Centro-Sul
  CENTRO_SUL_CENTERS.forEach(name => addCenter(name, 'Centro Sul', 'MACRO3', 'insp_centro_sul'));

  // Specific names for Leste and Nordeste, split from the shared list
  const lesteCount = Math.ceil(LESTE_NORDESTE_CENTERS.length / 2);
  const lesteCenters = LESTE_NORDESTE_CENTERS.slice(0, lesteCount);
  const nordesteCenters = LESTE_NORDESTE_CENTERS.slice(lesteCount);

  lesteCenters.forEach(name => addCenter(name, 'Leste', 'MACRO3', 'insp_leste'));
  nordesteCenters.forEach(name => addCenter(name, 'Nordeste', 'MACRO3', 'insp_nordeste'));
  
  // To meet the total count for MACRO3, add placeholders if necessary
  const currentMacro3Count = CENTRO_SUL_CENTERS.length + LESTE_NORDESTE_CENTERS.length;
  const macro3Total = MACROS['MACRO3'].count;
  const remainingCount = macro3Total - currentMacro3Count;

  for (let i = 0; i < remainingCount; i++) {
      addCenter(`CS Leste/Nordeste ${i + 1}`, 'Leste/Nordeste', 'MACRO3', 'insp_leste');
  }


  return centers;
};


export const HEALTH_CENTERS: HealthCenter[] = generateCenters();