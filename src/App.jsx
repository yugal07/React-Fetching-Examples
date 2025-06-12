import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CountryExplorer from './components/CountryExplorer'
import IPLViewer from './components/IPLViewer'
import NASAAstronomyExplorer from './components/NASAAstronomyExplorer'
import DailyBhajanFinder from './components/DailyBhajanFinder'
import RandomIndianFacts from './components/RandomIndianFacts'
import MovieList from './components/MovieList'

function App() {
  return (
    // <CountryExplorer /> // Un comment to See country data
    // <IPLViewer />
    // <NASAAstronomyExplorer />
    // <DailyBhajanFinder />
    // <RandomIndianFacts />
    <MovieList />
  )
}

export default App
