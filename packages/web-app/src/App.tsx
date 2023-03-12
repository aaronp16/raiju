
import Header from './components/Header';
import usePower from './hooks/usePower';
import React, { useCallback, useEffect, useState } from 'react';
import DeviceMenu from './components/DeviceMenu';
import usePC from './hooks/usePC';
import { PowersType, POWER_OFF, POWER_ON } from '@raiju/types';

function App() {
  const { wakePC, sleepPC } = usePC();
  const { powerCheck } = usePower();

  console.log(POWER_ON, POWER_OFF);

  const [pcPower, setPcPower] = useState<PowersType>(POWER_OFF);

  useEffect(() => {
    powerCheck.call();
  }, []);
  
  useEffect(() => {
    if (powerCheck.responseData) {
      setPcPower(powerCheck.responseData.pc);
    }
  }, [powerCheck.responseData]);

  useEffect(() => {
    if (wakePC.responseData) {
      setPcPower(wakePC.responseData.pc);
    }
  }, [wakePC.responseData]);

  useEffect(() => {
    if (sleepPC.responseData) {
      setPcPower(sleepPC.responseData.pc);
    }
  }, [sleepPC.responseData]);


  const handleWake = () => {
    wakePC.call();
  };

  const handleSleep = () => {
    sleepPC.call();
  };

  const handlePcPower = useCallback(() => {
    if (!wakePC.isLoading && !sleepPC.isLoading) {
      if (pcPower === POWER_ON) {
        handleSleep();
      } else {
        handleWake();
      }
    }
  }, [pcPower, sleepPC.isLoading, wakePC.isLoading]);

  return (
    <div className="App">
      <Header />
      <DeviceMenu loading={wakePC.isLoading || sleepPC.isLoading} name="Computer" on={pcPower === POWER_ON} powerToggle={handlePcPower}>Hello, how are you</DeviceMenu>
    </div>
  );
}

export default App;
