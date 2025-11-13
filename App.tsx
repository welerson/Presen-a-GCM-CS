
import React, { useState } from 'react';
import type { GuardPresence } from './types';
import { HEALTH_CENTERS, INSPECTORATES } from './constants';
import Header from './components/Header';
import GuardForm from './components/GuardForm';
import Dashboard from './components/Dashboard';
import HealthCenterMap from './components/HealthCenterMap';

function App() {
  const [presentGuards, setPresentGuards] = useState<GuardPresence[]>([]);

  const handleMarkPresence = (newPresence: Omit<GuardPresence, 'id' | 'timestamp'>) => {
    const presence: GuardPresence = {
      ...newPresence,
      id: `presence_${Date.now()}`,
      timestamp: new Date(),
    };

    setPresentGuards(prev => {
      // Remove any existing guard from the same health center before adding the new one
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
