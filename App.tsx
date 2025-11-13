import React, { useState, useEffect } from 'react';
import type { GuardPresence } from './types';
import { HEALTH_CENTERS, INSPECTORATES, GUARD_RANKS } from './constants';
import Header from './components/Header';
import GuardForm from './components/GuardForm';
import Dashboard from './components/Dashboard';
import HealthCenterMap from './components/HealthCenterMap';
import { database } from './firebaseConfig';
import { ref, onValue, set, update } from "firebase/database";

// Helper to get a consistent date string in YYYY-MM-DD format based on LOCAL timezone
const getLocalDateString = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

function App() {
  const [presentGuards, setPresentGuards] = useState<GuardPresence[]>([]);
  const today = getLocalDateString();
  
  // Effect to listen for real-time data changes from Firebase
  useEffect(() => {
    const presencesRef = ref(database, `presences/${today}`);
    
    const unsubscribe = onValue(presencesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert the Firebase object into an array
        const guardsArray = Object.keys(data).map(key => ({
          ...data[key],
          id: key,
          timestamp: new Date(data[key].timestamp), // Convert timestamp back to Date
        }));
        setPresentGuards(guardsArray);
      } else {
        setPresentGuards([]); // No data for today, clear the list
      }
    });

    // Clean up the listener when the component unmounts or date changes
    return () => unsubscribe();
  }, [today]); // Rerun effect if the day changes

  const handleMarkPresence = (newPresence: Omit<GuardPresence, 'id' | 'timestamp'>) => {
    const timestamp = new Date();
    const presence: Omit<GuardPresence, 'id'> = {
      ...newPresence,
      timestamp,
    };

    // Use healthCenterId as the key to ensure only one guard per post.
    // 'update' is used to add/overwrite a specific guard without replacing the whole day's data.
    const updates: { [key: string]: any } = {};
    updates[`/presences/${today}/${newPresence.healthCenterId}`] = {
        ...presence,
        timestamp: timestamp.toISOString(), // Store timestamp as a standardized string
    };

    update(ref(database), updates)
      .catch(error => {
        console.error("Firebase update failed:", error);
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