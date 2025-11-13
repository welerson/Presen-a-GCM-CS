
import React from 'react';

type MacroKey = 'MACRO1' | 'MACRO2' | 'MACRO3';

interface StatsAndFiltersProps {
  totalCount: number;
  presentCount: number;
  activeFilter: 'Todos' | MacroKey;
  onFilterChange: (filter: 'Todos' | MacroKey) => void;
  macros: { [key in MacroKey]: { name: string; count: number } };
}

const StatsAndFilters: React.FC<StatsAndFiltersProps> = ({ totalCount, presentCount, activeFilter, onFilterChange, macros }) => {
  const percentage = totalCount > 0 ? (presentCount / totalCount) * 100 : 0;

  const getButtonClass = (filter: 'Todos' | MacroKey) => {
    const baseClass = "px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800";
    if (filter === activeFilter) {
      return `${baseClass} bg-blue-600 text-white shadow-lg`;
    }
    return `${baseClass} bg-gray-700 hover:bg-gray-600 text-gray-200`;
  };

  return (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-2xl mb-8">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
        <h2 className="text-xl font-bold text-blue-300 mb-2 sm:mb-0">Visão Geral</h2>
        <span className="font-semibold text-gray-300 bg-gray-900/50 px-3 py-1 rounded-md">
          {presentCount} / {totalCount} Postos Cobertos
        </span>
      </div>
      
      <div className="w-full bg-gray-700 rounded-full h-4 mb-6 overflow-hidden">
        <div 
          className="bg-blue-600 h-4 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      
      <div className="flex flex-wrap gap-2 justify-center">
        <button onClick={() => onFilterChange('Todos')} className={getButtonClass('Todos')}>
          Todos
        </button>
        {(Object.keys(macros) as MacroKey[]).map(key => (
          <button 
            key={key} 
            onClick={() => onFilterChange(key)} 
            className={getButtonClass(key)}
          >
            {macros[key].name} ({macros[key].count})
          </button>
        ))}
      </div>
    </div>
  );
};

export default StatsAndFilters;