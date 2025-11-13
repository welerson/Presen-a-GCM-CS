import React, { useState, useEffect, useRef } from 'react';
import type { GuardPresence } from './types';
import { HEALTH_CENTERS, INSPECTORATES, GUARD_RANKS } from './constants';
import Header from './components/Header';
import GuardForm from './components/GuardForm';
import Dashboard from './components/Dashboard';
import HealthCenterMap from './components/HealthCenterMap';

const LOCAL_STORAGE_KEY = 'gcm-presence-data';

// Helper to get a consistent date string in YYYY-MM-DD format
const getTodayDateString = () => new Date().toISOString().split('T')[0];

// Helper function to load state from localStorage
const loadState = (): GuardPresence[] => {
  try {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (serializedState === null) {
      return [];
    }
    
    const storedData = JSON.parse(serializedState);
    const today = getTodayDateString();

    // Check if the stored data is from today and is well-formed
    if (storedData.date === today && Array.isArray(storedData.guards)) {
      // Convert timestamp strings back to Date objects
      return storedData.guards.map((guard: any) => ({
        ...guard,
        timestamp: new Date(guard.timestamp),
      }));
    }
    
    // If data is from a previous day or malformed, clear storage and return empty
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    return [];

  } catch (error) {
    console.error("Could not load state from localStorage", error);
    // Clear potentially corrupted data
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    return [];
  }
};

function App() {
  const [presentGuards, setPresentGuards] = useState<GuardPresence[]>(loadState);
  const todayRef = useRef(getTodayDateString());
  
  // Effect to save state to localStorage whenever it changes
  useEffect(() => {
    try {
      const dataToStore = {
        date: getTodayDateString(), // Use the consistent date format
        guards: presentGuards,
      };
      const serializedState = JSON.stringify(dataToStore);
      localStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
    } catch (error)      {
      console.error("Could not save state to localStorage", error);
    }
  }, [presentGuards]);


  // Effect to clear the list for users who keep the app open past midnight
  useEffect(() => {
    const checkAndClearAtMidnight = () => {
      const currentDateString = getTodayDateString();
      if (todayRef.current !== currentDateString) {
        setPresentGuards([]); // This clears the state, and the effect above will update localStorage
        todayRef.current = currentDateString;
      }
    };

    const intervalId = setInterval(checkAndClearAtMidnight, 60000); // Check every minute
    return () => clearInterval(intervalId);
  }, []);

  const handleMarkPresence = (newPresence: Omit<GuardPresence, 'id' | 'timestamp'>) => {
    const presence: GuardPresence = {
      ...newPresence,
      id: `presence_${Date.now()}`,
      timestamp: new Date(),
    };

    setPresentGuards(prev => {
      // Remove any guard from the same health center before adding the new one
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