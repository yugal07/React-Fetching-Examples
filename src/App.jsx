import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CountryExplorer from './components/CountryExplorer'
import IPLViewer from './components/IPLViewer'

function App() {
  return (
    // <CountryExplorer /> // Un comment to See country data
    <IPLViewer />
  )
}

export default App
