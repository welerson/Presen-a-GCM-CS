

import React, { useState, useEffect, useMemo } from 'react';
import type { GuardPresence } from './types';
import { HEALTH_CENTERS, INSPECTORATES, GUARD_RANKS, MACROS } from './constants';
import Header from './components/Header';
import GuardForm from './components/GuardForm';
import Dashboard from './components/Dashboard';
import HealthCenterMap from './components/HealthCenterMap';
import EditGuardModal from './components/EditGuardModal';
import PasswordModal from './components/PasswordModal';
import StatsAndFilters from './components/StatsAndFilters';
import { database } from './firebaseConfig';
import { ref, onValue, update } from "firebase/database";

type MacroKey = keyof typeof MACROS;

function App() {
  const [presentGuards, setPresentGuards] = useState<GuardPresence[]>([]);
  const [editingGuard, setEditingGuard] = useState<GuardPresence | null>(null);
  const [activeMacro, setActiveMacro] = useState<'Todos' | MacroKey>('Todos');
  const [authenticatedMacro, setAuthenticatedMacro] = useState<MacroKey | null>(null);
  
  // State for authentication flow
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [actionToConfirm, setActionToConfirm] = useState<(() => void) | null>(null);
  const [macroForAuth, setMacroForAuth] = useState<MacroKey | null>(null);

  // Effect to listen for real-time data changes from Firebase
  useEffect(() => {
    const postsRef = ref(database, 'posts');
    
    const unsubscribe = onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const guardsArray = Object.keys(data).map(key => ({
          ...data[key],
          id: key,
          healthCenterId: key,
          timestamp: new Date(data[key].timestamp),
        }));
        setPresentGuards(guardsArray);
      } else {
        setPresentGuards([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const filteredHealthCenters = useMemo(() => {
    if (activeMacro === 'Todos') {
      return HEALTH_CENTERS;
    }
    return HEALTH_CENTERS.filter(center => center.macro === activeMacro);
  }, [activeMacro]);
  
  const activeHealthCenters = useMemo(() => {
    return filteredHealthCenters.filter(center => center.status !== 'inactive');
  }, [filteredHealthCenters]);


  const filteredPresentGuards = useMemo(() => {
    const filteredCenterIds = new Set(filteredHealthCenters.map(c => c.id));
    return presentGuards.filter(guard => filteredCenterIds.has(guard.healthCenterId));
  }, [presentGuards, filteredHealthCenters]);

  const filteredInspectorates = useMemo(() => {
    if (authenticatedMacro) {
      return INSPECTORATES.filter(insp => insp.macro === authenticatedMacro);
    }
    // If no macro is authenticated (e.g., in "Todos" view), show all
    return INSPECTORATES;
  }, [authenticatedMacro]);


  const performMarkPresence = (newPresence: Omit<GuardPresence, 'id' | 'timestamp'>) => {
    const timestamp = new Date();
    const updates: { [key: string]: any } = {};
    updates[`/posts/${newPresence.healthCenterId}`] = {
        ...newPresence,
        timestamp: timestamp.toISOString(),
    };

    update(ref(database), updates).catch(error => {
        console.error("Firebase update failed:", error);
    });
  };

  const handleMarkPresence = (newPresence: Omit<GuardPresence, 'id' | 'timestamp'>) => {
    const center = HEALTH_CENTERS.find(c => c.id === newPresence.healthCenterId);
    if (!center) return;
    
    if (authenticatedMacro === center.macro) {
        performMarkPresence(newPresence);
    } else {
        setMacroForAuth(center.macro);
        setActionToConfirm(() => () => performMarkPresence(newPresence));
        setIsPasswordModalOpen(true);
    }
  };
  
  const handleOpenEditModal = (guard: GuardPresence) => {
    const center = HEALTH_CENTERS.find(c => c.id === guard.healthCenterId);
    if (!center || !authenticatedMacro) return; // Do not allow edit if not authenticated

    if (authenticatedMacro === center.macro) {
        setEditingGuard(guard);
    } else {
        setMacroForAuth(center.macro);
        setActionToConfirm(() => () => setEditingGuard(guard));
        setIsPasswordModalOpen(true);
    }
  };
  
  const handleCloseEditModal = () => {
    setEditingGuard(null);
  };

  const handleUpdatePresence = (updatedGuard: GuardPresence) => {
    const { id, ...presenceData } = updatedGuard;
    const updates: { [key: string]: any } = {};
    updates[`/posts/${id}`] = {
        ...presenceData,
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

  const handleAuthenticationSuccess = () => {
    if (actionToConfirm) {
        actionToConfirm();
    }
    setIsPasswordModalOpen(false);
    setActionToConfirm(null);
    setMacroForAuth(null);
  };

  const handleClosePasswordModal = () => {
    setIsPasswordModalOpen(false);
    setActionToConfirm(null);
    setMacroForAuth(null);
  };

  const handleFilterChange = (filter: 'Todos' | MacroKey) => {
    if (filter === 'Todos') {
        setActiveMacro('Todos');
        setAuthenticatedMacro(null);
    } else {
        setMacroForAuth(filter);
        setActionToConfirm(() => () => {
            setActiveMacro(filter);
            setAuthenticatedMacro(filter);
        });
        setIsPasswordModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <main className="p-4 sm:p-6 lg:p-8">

        <StatsAndFilters
          totalCount={filteredHealthCenters.length}
          presentCount={filteredPresentGuards.length}
          activeFilter={activeMacro}
          onFilterChange={handleFilterChange}
          macros={MACROS}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1 space-y-8">
            <GuardForm 
              healthCenters={activeHealthCenters} 
              inspectorates={filteredInspectorates}
              ranks={GUARD_RANKS}
              onMarkPresence={handleMarkPresence}
              isFormDisabled={!authenticatedMacro}
            />
             <Dashboard
              healthCenters={activeHealthCenters}
              inspectorates={INSPECTORATES}
              presentGuards={filteredPresentGuards}
              onEditRequest={handleOpenEditModal}
            />
          </div>

          <div className="lg:col-span-2">
            <HealthCenterMap 
              healthCenters={filteredHealthCenters}
              presentGuards={filteredPresentGuards}
              inspectorates={INSPECTORATES}
              onPinClick={handleOpenEditModal}
            />
          </div>

        </div>
      </main>
      
      {isPasswordModalOpen && macroForAuth && (
        <PasswordModal
            macroName={MACROS[macroForAuth].name}
            correctPassword={MACROS[macroForAuth].password}
            onClose={handleClosePasswordModal}
            onSuccess={handleAuthenticationSuccess}
        />
      )}

      {editingGuard && (
        <EditGuardModal
          guard={editingGuard}
          inspectorates={filteredInspectorates}
          healthCenters={HEALTH_CENTERS}
          onSave={handleUpdatePresence}
          onClose={handleCloseEditModal}
        />
      )}
    </div>
  );
}

export default App;
