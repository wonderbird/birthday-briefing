import { useState } from 'react'
import FirstTimeSetup from './components/FirstTimeSetup'
import MainScreen from './components/MainScreen'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('setup')

  const handleSetupComplete = () => {
    setCurrentView('main')
  }

  const handleEditConfig = () => {
    setCurrentView('setup')
  }

  return (
    <>
      {currentView === 'setup' && <FirstTimeSetup onComplete={handleSetupComplete} />}
      {currentView === 'main' && <MainScreen onEditConfig={handleEditConfig} />}
    </>
  )
}

export default App
