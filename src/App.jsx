import { useState, useEffect } from 'react'
import FirstTimeSetup from './components/FirstTimeSetup'
import MainScreen from './components/MainScreen'
import { isConfigured, loadConfig } from './utils/storage'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('setup')
  const [config, setConfig] = useState(null)

  useEffect(() => {
    if (isConfigured()) {
      const loadedConfig = loadConfig();
      setConfig(loadedConfig);
      setCurrentView('main');
    }
  }, []);

  const handleSetupComplete = () => {
    setCurrentView('main')
  }

  const handleEditConfig = () => {
    setCurrentView('setup')
  }

  return (
    <>
      {currentView === 'setup' && <FirstTimeSetup onComplete={handleSetupComplete} />}
      {currentView === 'main' && <MainScreen config={config} onEditConfig={handleEditConfig} />}
    </>
  )
}

export default App
