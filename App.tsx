import React, { useState, useEffect } from 'react';
import type { GuardPresence } from './types';
import { HEALTH_CENTERS, INSPECTORATES, GUARD_RANKS } from './constants';
import Header from './components/Header';
import GuardForm from './components/GuardForm';
import Dashboard from './components/Dashboard';
import HealthCenterMap from './components/HealthCenterMap';
import EditGuardModal from './components/EditGuardModal';
import { database } from './firebaseConfig';
import { ref, onValue, update } from "firebase/database";

function App() {
  const [presentGuards, setPresentGuards] = useState<GuardPresence[]>([]);
  const [editingGuard, setEditingGuard] = useState<GuardPresence | null>(null);

  // Effect to listen for real-time data changes from Firebase
  useEffect(() => {
    const postsRef = ref(database, 'posts');
    
    const unsubscribe = onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert the Firebase object into an array, using the key as the ID
        const guardsArray = Object.keys(data).map(key => ({
          ...data[key],
          id: key, // The key is the healthCenterId
          healthCenterId: key,
          timestamp: new Date(data[key].timestamp), // Convert timestamp back to Date
        }));
        setPresentGuards(guardsArray);
      } else {
        setPresentGuards([]); // No data, clear the list
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []); // No dependencies, run only once on mount

  const handleMarkPresence = (newPresence: Omit<GuardPresence, 'id' | 'timestamp'>) => {
    const timestamp = new Date();
    // Use healthCenterId as the key. 'update' is used to add/overwrite a specific guard.
    const updates: { [key: string]: any } = {};
    updates[`/posts/${newPresence.healthCenterId}`] = {
        ...newPresence,
        timestamp: timestamp.toISOString(), // Store timestamp as a standardized string
    };

    update(ref(database), updates)
      .catch(error => {
        console.error("Firebase update failed:", error);
      });
  };
  
  const handleOpenEditModal = (guard: GuardPresence) => {
    setEditingGuard(guard);
  };
  
  const handleCloseEditModal = () => {
    setEditingGuard(null);
  };

  const handleUpdatePresence = (updatedGuard: GuardPresence) => {
    const { id, ...presenceData } = updatedGuard;
    
    // The id is the healthCenterId
    const updates: { [key: string]: any } = {};
    updates[`/posts/${id}`] = {
        ...presenceData,
        // Ensure the timestamp is in a storable format
        timestamp: updatedGuard.timestamp.toISOString(),
    };

    update(ref(database), updates)
      .then(() => {
        handleCloseEditModal();
      })
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
              onEditRequest={handleOpenEditModal}
            />
          </div>

          <div className="lg:col-span-2">
            <HealthCenterMap 
              healthCenters={HEALTH_CENTERS}
              presentGuards={presentGuards}
              inspectorates={INSPECTORATES}
              onPinClick={handleOpenEditModal}
            />
          </div>

        </div>
      </main>
      
      {editingGuard && (
        <EditGuardModal
          guard={editingGuard}
          inspectorates={INSPECTORATES}
          healthCenters={HEALTH_CENTERS}
          onSave={handleUpdatePresence}
          onClose={handleCloseEditModal}
        />
      )}
    </div>
  );
}

export default App;