

import React, { useMemo } from 'react';
import type { HealthCenter, Inspectorate, GuardPresence } from '../types';
import { ChartBarIcon, UserGroupIcon, ClockIcon, PencilIcon } from './Icons';

interface DashboardProps {
  healthCenters: HealthCenter[];
  inspectorates: Inspectorate[];
  presentGuards: GuardPresence[];
  onEditRequest: (guard: GuardPresence) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ healthCenters, inspectorates, presentGuards, onEditRequest }) => {
  const activeHealthCenters = useMemo(() => healthCenters.filter(c => c.status !== 'inactive'), [healthCenters]);
  
  const presentCount = presentGuards.length;
  const absentCount = activeHealthCenters.length - presentCount;

  const centerToInspectorateMap = useMemo(() => {
    const map = new Map<string, string>();
    healthCenters.forEach(center => map.set(center.id, center.inspectorateId));
    return map;
  }, [healthCenters]);

  const inspectorateCounts = inspectorates.map(insp => {
    const totalInInsp = activeHealthCenters.filter(c => c.inspectorateId === insp.id).length;
    
    const presentInInsp = presentGuards.filter(g => {
      const guardCenterInspectorate = centerToInspectorateMap.get(g.healthCenterId);
      return guardCenterInspectorate === insp.id;
    }).length;

    return {
      ...insp,
      totalCount: totalInInsp,
      presentCount: presentInInsp,
    };
  });

  const getGuardDetails = (guard: GuardPresence) => {
    const center = healthCenters.find(c => c.id === guard.healthCenterId);
    const inspectorate = inspectorates.find(i => i.id === guard.inspectorateId);
    return {
      centerName: center?.name || 'N/A',
      inspectorateName: inspectorate?.name || 'N/A',
    };
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-2xl space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-4 text-blue-300 flex items-center">
          <ChartBarIcon className="h-6 w-6 mr-2" />
          Resumo do Efetivo
        </h2>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-green-800/50 p-4 rounded-lg">
            <p className="text-3xl font-bold text-green-300">{presentCount}</p>
            <p className="text-sm text-green-100">Presentes</p>
          </div>
          <div className="bg-red-800/50 p-4 rounded-lg">
            <p className="text-3xl font-bold text-red-300">{absentCount}</p>
            <p className="text-sm text-red-100">Ausentes</p>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-200">Efetivo por Inspetoria</h3>
        <div className="space-y-2">
          {inspectorateCounts.map(insp => (
            <div key={insp.id} className="flex justify-between items-center bg-gray-700/50 p-2 rounded">
              <span className="text-gray-300">{insp.name}</span>
              <span className="font-bold text-blue-300 bg-gray-900 px-2 py-0.5 rounded">{insp.presentCount} / {insp.totalCount}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4 text-blue-300 flex items-center">
          <UserGroupIcon className="h-6 w-6 mr-2" />
          Guarnição de Serviço
        </h2>
        <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
          {presentGuards.length > 0 ? (
            presentGuards.sort((a,b) => a.warName.localeCompare(b.warName)).map(guard => {
              const { centerName, inspectorateName } = getGuardDetails(guard);
              return (
                <div key={guard.id} className="bg-gray-700 p-3 rounded-lg shadow">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-bold text-white">{guard.rank} {guard.warName}</p>
                    <button onClick={() => onEditRequest(guard)} className="p-1 text-gray-400 hover:text-white transition-colors duration-200" aria-label="Editar">
                        <PencilIcon className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-gray-300">{centerName}</p>
                    {guard.psus && (
                        <span className="text-xs font-bold bg-blue-500 text-white px-2 py-0.5 rounded-full">PSUS</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400">{inspectorateName}</p>
                   <p className="text-xs text-blue-300 mt-1 flex items-center">
                     <ClockIcon className="h-3 w-3 mr-1"/>
                     {guard.timestamp.toLocaleTimeString()}
                   </p>
                </div>
              );
            })
          ) : (
            <p className="text-gray-400 italic">Nenhum guarda com presença marcada.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;