
import React, { useState, useEffect, useRef } from 'react';
import type { GuardPresence } from './types';
import { HEALTH_CENTERS, INSPECTORATES, GUARD_RANKS } from './constants';
import Header from './components/Header';
import GuardForm from './components/GuardForm';
import Dashboard from './components/Dashboard';
import HealthCenterMap from './components/HealthCenterMap';

function App() {
  const [presentGuards, setPresentGuards] = useState<GuardPresence[]>([]);
  const todayRef = useRef(new Date().toDateString());

  // Efeito para limpar a lista de presença à meia-noite
  useEffect(() => {
    const checkAndClearAtMidnight = () => {
      const currentDateString = new Date().toDateString();
      if (todayRef.current !== currentDateString) {
        setPresentGuards([]); // Limpa a lista
        todayRef.current = currentDateString; // Atualiza a referência para o novo dia
      }
    };

    // Verifica a cada minuto se o dia mudou
    const intervalId = setInterval(checkAndClearAtMidnight, 60000); // 60 segundos

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, []); // O array vazio garante que o efeito rode apenas uma vez

  const handleMarkPresence = (newPresence: Omit<GuardPresence, 'id' | 'timestamp'>) => {
    const presence: GuardPresence = {
      ...newPresence,
      id: `presence_${Date.now()}`,
      timestamp: new Date(),
    };

    setPresentGuards(prev => {
      // Remove qualquer guarda existente do mesmo centro de saúde antes de adicionar o novo
      const updatedList = prev.filter(g => g.healthCenterId !== presence.healthCenterId);
      return [...updatedList, presence];
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1 space-y-8">
            <GuardForm 
              healthCenters={HEALTH_CENTERS} 
              inspectorates={INSPECTORATES}
              ranks={GUARD_RANKS}
              onMarkPresence={handleMarkPresence}
            />
             <Dashboard
              healthCenters={HEALTH_CENTERS}
              inspectorates={INSPECTORATES}
              presentGuards={presentGuards}
            />
          </div>

          <div className="lg:col-span-2">
            <HealthCenterMap 
              healthCenters={HEALTH_CENTERS}
              presentGuards={presentGuards}
              inspectorates={INSPECTORATES}
            />
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;
