import React from 'react';
import type { HealthCenter, GuardPresence, Inspectorate } from '../types';
import { MapPinIcon } from './Icons';

interface HealthCenterMapProps {
  healthCenters: HealthCenter[];
  presentGuards: GuardPresence[];
  inspectorates: Inspectorate[];
  onPinClick: (guard: GuardPresence) => void;
}

const HealthCenterMap: React.FC<HealthCenterMapProps> = ({ healthCenters, presentGuards, inspectorates, onPinClick }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-2xl h-full">
      <h2 className="text-xl font-bold mb-6 text-blue-300 flex items-center">
        <MapPinIcon className="h-6 w-6 mr-2" />
        Mapa de Postos
      </h2>
      <div 
        className="relative grid grid-cols-5 grid-rows-5 gap-2 bg-gray-900/50 p-4 rounded-md aspect-video"
        style={{ minHeight: '500px' }}
      >
        {healthCenters.map(center => {
          const presence = presentGuards.find(g => g.healthCenterId === center.id);
          const inspectorate = inspectorates.find(i => i.id === presence?.inspectorateId);
          const isPresent = !!presence;
          const isPsus = presence?.psus === true;
          
          let pinColor = 'bg-red-500'; // Absent
          if (isPsus) {
            pinColor = 'bg-blue-500'; // PSUS
          } else if (isPresent) {
            pinColor = 'bg-green-500 animate-pulse'; // Present
          }
          
          return (
            <div
              key={center.id}
              className={`group relative flex flex-col items-center justify-center text-center p-1 rounded-md transition-transform duration-200 hover:scale-110 z-0 hover:z-40 ${isPresent ? 'cursor-pointer' : 'cursor-default'}`}
              style={{
                gridRowStart: center.coords.row,
                gridColumnStart: center.coords.col,
              }}
              onClick={() => isPresent && onPinClick(presence)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && isPresent && onPinClick(presence)}
              role={isPresent ? "button" : undefined}
              aria-label={isPresent ? `Editar registro de ${center.name}` : center.name}
              tabIndex={isPresent ? 0 : -1}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${pinColor}`}>
                <MapPinIcon className="h-5 w-5 text-white" />
              </div>
              <p className="text-xs mt-1 font-semibold text-gray-200 truncate">{center.name}</p>
              
              <div className="absolute bottom-full mb-2 w-max p-3 text-sm text-white bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                <p className="font-bold text-base">{center.name}</p>
                <p className="text-gray-400">{center.location}</p>
                <hr className="border-gray-700 my-1.5" />
                {isPresent && presence ? (
                  <>
                    <p className={`font-semibold ${isPsus ? 'text-blue-400' : 'text-green-400'}`}>
                      Status: {isPsus ? 'PSUS em Patrulhamento' : 'Coberto'}
                    </p>
                    <p><span className="font-medium text-gray-400">Guarda:</span> {presence.rank} {presence.warName}</p>
                    <p><span className="font-medium text-gray-400">Inspetoria:</span> {inspectorate?.name}</p>
                    <p><span className="font-medium text-gray-400">Horário:</span> {presence.timestamp.toLocaleTimeString()}</p>
                  </>
                ) : (
                  <p className="text-red-400 font-semibold">Status: Descoberto</p>
                )}
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-gray-900/90"></div>
              </div>

            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-end space-x-4 mt-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span>Presente</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span>PSUS</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span>Ausente</span>
        </div>
      </div>
    </div>
  );
};

export default HealthCenterMap;