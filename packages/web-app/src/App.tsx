
import Header from './components/Header';
import usePower from './hooks/usePower';
import React, { useCallback, useEffect, useState } from 'react';
import DeviceMenu from './components/DeviceMenu';
import usePC from './hooks/usePC';

function App() {
  const { wakePC, sleepPC } = usePC();
  const { powerCheck } = usePower();

  const [pcPower, setPcPower] = useState<'on' | 'off'>('off');

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
      setPcPower(wakePC.responseData.power);
    }
  }, [wakePC.responseData]);

  useEffect(() => {
    if (sleepPC.responseData) {
      setPcPower(sleepPC.responseData.power);
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
      if (pcPower === 'on') {
        handleSleep();
      } else {
        handleWake();
      }
    }
  }, [pcPower, sleepPC.isLoading, wakePC.isLoading]);

  return (
    <div className="App">
      <Header />
      <DeviceMenu loading={wakePC.isLoading || sleepPC.isLoading} name="Computer" on={pcPower === 'on'} powerToggle={handlePcPower}>Hello, how are you</DeviceMenu>
    </div>
  );
}

export default App;
