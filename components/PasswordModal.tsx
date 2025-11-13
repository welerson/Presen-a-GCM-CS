import React, { useState } from 'react';
import { KeyIcon } from './Icons';

interface PasswordModalProps {
  macroName: string;
  correctPassword?: string;
  onClose: () => void;
  onSuccess: () => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ macroName, correctPassword, onClose, onSuccess }) => {
  const [enteredPassword, setEnteredPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPassword === correctPassword) {
      setError('');
      onSuccess();
    } else {
      setError('Senha incorreta. Tente novamente.');
      setEnteredPassword('');
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-gray-800 p-6 rounded-lg shadow-2xl w-full max-w-sm mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4 text-blue-300 flex items-center">
          <KeyIcon className="h-6 w-6 mr-2" />
          Autenticação Necessária
        </h2>
        <p className="text-gray-300 mb-4">
          Para continuar, por favor insira a senha da <span className="font-bold">{macroName}</span>.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 sr-only">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={enteredPassword}
              onChange={(e) => setEnteredPassword(e.target.value)}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
              placeholder="Digite a senha"
              autoFocus
            />
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
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;