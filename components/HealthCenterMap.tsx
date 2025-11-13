
import React from 'react';
import type { HealthCenter, GuardPresence, Inspectorate } from '../types';
import { MapPinIcon } from './Icons';

interface HealthCenterMapProps {
  healthCenters: HealthCenter[];
  presentGuards: GuardPresence[];
  inspectorates: Inspectorate[];
}

const HealthCenterMap: React.FC<HealthCenterMapProps> = ({ healthCenters, presentGuards, inspectorates }) => {
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
          
          return (
            <div
              key={center.id}
              className="group relative flex flex-col items-center justify-center text-center p-1 rounded-md transition-transform duration-200 hover:scale-110"
              style={{
                gridRowStart: center.coords.row,
                gridColumnStart: center.coords.col,
              }}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${isPresent ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}>
                <MapPinIcon className="h-5 w-5 text-white" />
              </div>
              <p className="text-xs mt-1 font-semibold text-gray-200 truncate">{center.name}</p>
              
              <div className="absolute bottom-full mb-2 w-max p-2 text-sm text-white bg-gray-900 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                <p className="font-bold">{center.name}</p>
                <p>{center.location}</p>
                <hr className="border-gray-600 my-1" />
                {isPresent ? (
                  <>
                    <p className="text-green-400">Status: Coberto</p>
                    <p>Guarda: {presence.warName}</p>
                    <p>Inspetoria: {inspectorate?.name}</p>
                    <p>Horário: {presence.timestamp.toLocaleTimeString()}</p>
                  </>
                ) : (
                  <p className="text-red-400">Status: Descoberto</p>
                )}
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-900"></div>
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
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span>Ausente</span>
        </div>
      </div>
    </div>
  );
};

export default HealthCenterMap;
