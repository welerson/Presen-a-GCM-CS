
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
import { ref, onValue, update, remove, set, get } from "firebase/database";

type MacroKey = keyof typeof MACROS;

const FIREBASE_DATA_PATH = 'gcm-presence/posts';

function App() {
  const [presentGuards, setPresentGuards] = useState<GuardPresence[]>([]);
  const [editingGuard, setEditingGuard] = useState<GuardPresence | null>(null);
  const [activeMacro, setActiveMacro] = useState<'Todos' | MacroKey>('Todos');
  const [authenticatedMacro, setAuthenticatedMacro] = useState<MacroKey | null>(null);
  
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [actionToConfirm, setActionToConfirm] = useState<(() => void) | null>(null);
  const [macroForAuth, setMacroForAuth] = useState<MacroKey | null>(null);

  // Helper to get consistent YYYY-MM-DD string in Brasilia Time
  const getSaoPauloDateString = (dateInput: number | Date | string) => {
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
    // sv-SE locale formats as YYYY-MM-DD
    return new Intl.DateTimeFormat('sv-SE', {
      timeZone: 'America/Sao_Paulo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);
  };

  useEffect(() => {
    const checkAndResetData = async () => {
      try {
        // Fix: Removed .info/serverTimeOffset usage which caused "Invalid token in path" error.
        // We use client date converted explicitly to Sao Paulo timezone.
        const todayStr = getSaoPauloDateString(new Date());

        // 3. Check the Last Reset Date tracker
        const lastResetRef = ref(database, 'gcm-presence/util/lastResetDate');
        const lastResetSnap = await get(lastResetRef);
        const lastResetDate = lastResetSnap.val();

        let shouldClear = false;

        // Condition A: We have passed midnight compared to the last stored reset
        if (lastResetDate && lastResetDate !== todayStr) {
          console.log(`Virada de dia detectada (Último reset: ${lastResetDate}, Hoje: ${todayStr}). Limpando dados...`);
          shouldClear = true;
        } 
        // Condition B: No reset date stored (first run) OR validation check
        // We assume that if the tracker is missing, we must verify the data itself.
        else {
           const postsRef = ref(database, FIREBASE_DATA_PATH);
           const snapshot = await get(postsRef);
           
           if (snapshot.exists()) {
             const data = snapshot.val();
             // Check if there is ANY data from a previous day
             // This handles cases where the reset might have failed or the app wasn't opened
             for (const key in data) {
                if (data[key].timestamp) {
                   const recordDateStr = getSaoPauloDateString(new Date(data[key].timestamp));
                   if (recordDateStr !== todayStr) {
                      console.log(`Dados antigos encontrados no banco (Data registro: ${recordDateStr}, Hoje: ${todayStr}). Limpando dados...`);
                      shouldClear = true;
                      break; // Found one old record, that's enough to trigger clear
                   }
                }
             }
           } else {
             // Database is empty, just ensure the tracker is up to date
             if (lastResetDate !== todayStr) {
               await set(lastResetRef, todayStr);
             }
           }
        }

        // 4. Execute Clear safely
        if (shouldClear) {
          // Wipe the posts
          await set(ref(database, FIREBASE_DATA_PATH), null);
          // Update the tracker to today so it doesn't clear again until tomorrow
          await set(lastResetRef, todayStr);
          console.log("Limpeza diária concluída com sucesso.");
        }

      } catch (error) {
        console.error("Erro na verificação diária:", error);
      }
    };

    // Run immediately on load
    checkAndResetData();

    // Run every minute to catch the 00:00 transition if the app is left open
    const intervalId = setInterval(checkAndResetData, 60000);
    
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const postsRef = ref(database, FIREBASE_DATA_PATH);
    const unsubscribe = onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const guardsArray: GuardPresence[] = Object.keys(data).map(key => ({
          ...data[key],
          id: key,
          timestamp: new Date(data[key].timestamp),
        }));
        setPresentGuards(guardsArray);
      } else {
        setPresentGuards([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleActionRequiringAuth = (macroKey: MacroKey, action: () => void) => {
    if (authenticatedMacro === macroKey) {
      action();
    } else {
      setMacroForAuth(macroKey);
      setActionToConfirm(() => action);
      setIsPasswordModalOpen(true);
    }
  };

  const handlePasswordSuccess = () => {
    if (actionToConfirm) {
      actionToConfirm();
    }
    setAuthenticatedMacro(macroForAuth);
    setIsPasswordModalOpen(false);
    setActionToConfirm(null);
    setMacroForAuth(null);
  };
  
  const handleMarkPresence = (presence: Omit<GuardPresence, 'id' | 'timestamp'>) => {
    const center = HEALTH_CENTERS.find(c => c.id === presence.healthCenterId);
    if (!center) return;

    const macroKey = center.macro;
    const action = () => {
        const newId = `guard_${Date.now()}`;
        const newPresence: GuardPresence = {
            ...presence,
            id: newId,
            timestamp: new Date(),
        };

        const updates: { [key: string]: any } = {};
        updates[`${FIREBASE_DATA_PATH}/${newId}`] = { ...newPresence, timestamp: newPresence.timestamp.toISOString() };
        update(ref(database), updates).catch(error => console.error("Failed to mark presence:", error));
    };

    handleActionRequiringAuth(macroKey, action);
  };

  const handleSaveGuard = (updatedGuard: GuardPresence) => {
    const center = HEALTH_CENTERS.find(c => c.id === updatedGuard.healthCenterId);
    if (!center) return;

    const macroKey = center.macro;
    const action = () => {
        const updates: { [key: string]: any } = {};
        updates[`${FIREBASE_DATA_PATH}/${updatedGuard.id}`] = { ...updatedGuard, timestamp: updatedGuard.timestamp.toISOString() };
        update(ref(database), updates)
            .then(() => setEditingGuard(null))
            .catch(error => console.error("Update failed:", error));
    };
    
    handleActionRequiringAuth(macroKey, action);
  };

  const handleDeleteGuard = (guardId: string, healthCenterId: string) => {
    const center = HEALTH_CENTERS.find(c => c.id === healthCenterId);
    if (!center) return;
    
    const macroKey = center.macro;
    const action = () => {
        const guardRef = ref(database, `${FIREBASE_DATA_PATH}/${guardId}`);
        remove(guardRef)
            .then(() => setEditingGuard(null))
            .catch(error => console.error("Delete failed:", error));
    };

    handleActionRequiringAuth(macroKey, action);
  };

  const handleOpenEditModal = (guard: GuardPresence) => {
      const center = HEALTH_CENTERS.find(c => c.id === guard.healthCenterId);
      if (!center) return;
      const macroKey = center.macro;

      handleActionRequiringAuth(macroKey, () => {
          setEditingGuard(guard);
      });
  };

  const { filteredHealthCenters, filteredInspectorates, filteredGuards, totalCount } = useMemo(() => {
    const activeHealthCenters = HEALTH_CENTERS.filter(c => c.status !== 'inactive');
    
    if (activeMacro === 'Todos') {
      // Clean 'ghost' guards: guards pointing to healthCenterIds that no longer exist or are inactive
      const cleanedGuards = presentGuards.filter(g => 
        activeHealthCenters.some(c => c.id === g.healthCenterId)
      );

      return {
        filteredHealthCenters: activeHealthCenters,
        filteredInspectorates: INSPECTORATES,
        filteredGuards: cleanedGuards,
        totalCount: activeHealthCenters.length,
      };
    }
    const filteredCenters = activeHealthCenters.filter(c => c.macro === activeMacro);
    const filteredInsps = INSPECTORATES.filter(i => i.macro === activeMacro);
    const filteredGs = presentGuards.filter(g => {
        const center = activeHealthCenters.find(c => c.id === g.healthCenterId);
        return center && center.macro === activeMacro;
    });

    return {
      filteredHealthCenters: filteredCenters,
      filteredInspectorates: filteredInsps,
      filteredGuards: filteredGs,
      totalCount: filteredCenters.length,
    };
  }, [activeMacro, presentGuards]);

  const presentPostsCount = useMemo(() => {
    const presentCenterIds = new Set(filteredGuards.map(guard => guard.healthCenterId));
    return presentCenterIds.size;
  }, [filteredGuards]);

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <StatsAndFilters 
          totalCount={totalCount}
          presentCount={presentPostsCount}
          activeFilter={activeMacro}
          onFilterChange={setActiveMacro}
          macros={MACROS}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
            <GuardForm 
              healthCenters={filteredHealthCenters}
              inspectorates={filteredInspectorates}
              ranks={GUARD_RANKS}
              onMarkPresence={handleMarkPresence}
              isFormDisabled={activeMacro === 'Todos'}
            />
            <Dashboard 
              healthCenters={filteredHealthCenters}
              inspectorates={filteredInspectorates}
              presentGuards={filteredGuards}
              onEditRequest={handleOpenEditModal}
            />
          </div>
          <div className="lg:col-span-2">
             <HealthCenterMap
              healthCenters={filteredHealthCenters}
              presentGuards={filteredGuards}
              inspectorates={filteredInspectorates}
              onPinClick={handleOpenEditModal}
            />
          </div>
        </div>
      </main>

      {editingGuard && (
        <EditGuardModal
          guard={editingGuard}
          inspectorates={INSPECTORATES.filter(i => i.macro === HEALTH_CENTERS.find(c => c.id === editingGuard.healthCenterId)?.macro)}
          healthCenters={HEALTH_CENTERS}
          onSave={handleSaveGuard}
          onDelete={handleDeleteGuard}
          onClose={() => setEditingGuard(null)}
        />
      )}
      
      {isPasswordModalOpen && macroForAuth && (
        <PasswordModal 
          macroName={MACROS[macroForAuth].name}
          correctPassword={MACROS[macroForAuth].password}
          onClose={() => setIsPasswordModalOpen(false)}
          onSuccess={handlePasswordSuccess}
        />
      )}
    </div>
  );
}

export default App;
