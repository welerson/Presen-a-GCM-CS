import React, { useState, useEffect } from 'react';
import type { GuardPresence, Inspectorate, HealthCenter } from '../types';
import { GUARD_RANKS } from '../constants';
import { PencilIcon } from './Icons';

interface EditGuardModalProps {
  guard: GuardPresence;
  inspectorates: Inspectorate[];
  healthCenters: HealthCenter[];
  onSave: (updatedGuard: GuardPresence) => void;
  onClose: () => void;
}

const EditGuardModal: React.FC<EditGuardModalProps> = ({ guard, inspectorates, healthCenters, onSave, onClose }) => {
  const [warName, setWarName] = useState('');
  const [selectedRank, setSelectedRank] = useState('');
  const [selectedInspectorateId, setSelectedInspectorateId] = useState('');
  const [error, setError] = useState('');
  
  const healthCenterName = healthCenters.find(hc => hc.id === guard.healthCenterId)?.name || 'Desconhecido';

  useEffect(() => {
    if (guard) {
      setWarName(guard.warName);
      setSelectedRank(guard.rank);
      setSelectedInspectorateId(guard.inspectorateId);
    }
  }, [guard]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!warName || !selectedInspectorateId || !selectedRank) {
      setError('Todos os campos, exceto o posto, devem ser preenchidos.');
      return;
    }
    setError('');
    onSave({
      ...guard,
      warName,
      rank: selectedRank,
      inspectorateId: selectedInspectorateId,
      timestamp: new Date(), // Update timestamp on edit
    });
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="bg-gray-800 p-6 rounded-lg shadow-2xl w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4 text-blue-300 flex items-center">
          <PencilIcon className="h-6 w-6 mr-2" />
          Editar Registro
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="edit-healthCenter" className="block text-sm font-medium text-gray-400">
              Posto
            </label>
            <input
              id="edit-healthCenter"
              type="text"
              value={healthCenterName}
              disabled
              className="mt-1 block w-full bg-gray-900 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-300 cursor-not-allowed"
            />
          </div>
          <div>
            <label htmlFor="edit-rank" className="block text-sm font-medium text-gray-300">
              Posto / Graduação
            </label>
            <select
              id="edit-rank"
              value={selectedRank}
              onChange={(e) => setSelectedRank(e.target.value)}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
            >
              <option value="" disabled>Selecione a graduação</option>
              {GUARD_RANKS.map(rank => (
                <option key={rank} value={rank}>{rank}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="edit-warName" className="block text-sm font-medium text-gray-300">
              Nome de Guerra
            </label>
            <input
              id="edit-warName"
              type="text"
              value={warName}
              onChange={(e) => setWarName(e.target.value)}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
              placeholder="Ex: Silva"
            />
          </div>
          <div>
            <label htmlFor="edit-inspectorate" className="block text-sm font-medium text-gray-300">
              Inspetoria
            </label>
            <select
              id="edit-inspectorate"
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
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500 transition-colors duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 transition-colors duration-200"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditGuardModal;