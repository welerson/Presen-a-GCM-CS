
import React, { useState } from 'react';
import type { HealthCenter, Inspectorate, GuardPresence } from '../types';
import { UserPlusIcon } from './Icons';

interface GuardFormProps {
  healthCenters: HealthCenter[];
  inspectorates: Inspectorate[];
  onMarkPresence: (presence: Omit<GuardPresence, 'id' | 'timestamp'>) => void;
}

const GuardForm: React.FC<GuardFormProps> = ({ healthCenters, inspectorates, onMarkPresence }) => {
  const [warName, setWarName] = useState('');
  const [selectedCenterId, setSelectedCenterId] = useState('');
  const [selectedInspectorateId, setSelectedInspectorateId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!warName || !selectedCenterId || !selectedInspectorateId) {
      setError('Todos os campos são obrigatórios.');
      return;
    }
    setError('');
    onMarkPresence({
      warName,
      healthCenterId: selectedCenterId,
      inspectorateId: selectedInspectorateId,
    });
    setWarName('');
    setSelectedCenterId('');
    setSelectedInspectorateId('');
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-2xl">
      <h2 className="text-xl font-bold mb-4 text-blue-300 flex items-center">
        <UserPlusIcon className="h-6 w-6 mr-2" />
        Registrar Presença
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="warName" className="block text-sm font-medium text-gray-300">
            Nome de Guerra
          </label>
          <input
            id="warName"
            type="text"
            value={warName}
            onChange={(e) => setWarName(e.target.value)}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
            placeholder="Ex: GCM Silva"
          />
        </div>
        <div>
          <label htmlFor="inspectorate" className="block text-sm font-medium text-gray-300">
            Inspetoria
          </label>
          <select
            id="inspectorate"
            value={selectedInspectorateId}
            onChange={(e) => setSelectedInspectorateId(e.target.value)}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
          >
            <option value="" disabled>Selecione a inspetoria</option>
            {inspectorates.map(insp => (
              <option key={insp.id} value={insp.id}>{insp.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="healthCenter" className="block text-sm font-medium text-gray-300">
            Posto (Centro de Saúde / UPA)
          </label>
          <select
            id="healthCenter"
            value={selectedCenterId}
            onChange={(e) => setSelectedCenterId(e.target.value)}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
          >
            <option value="" disabled>Selecione o posto</option>
            {healthCenters.map(center => (
              <option key={center.id} value={center.id}>{center.name}</option>
            ))}
          </select>
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 transition-colors duration-200 flex items-center justify-center"
        >
          <UserPlusIcon className="h-5 w-5 mr-2" />
          Marcar Presença
        </button>
      </form>
    </div>
  );
};

export default GuardForm;
