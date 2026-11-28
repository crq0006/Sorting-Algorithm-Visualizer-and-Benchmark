import { useState } from 'react'
import { ALGORITHMS } from './algorithms/index.js'
import { generateArray } from './data/arrayGenerator.js'
import ScreenCard from './components/ScreenCard.jsx'
import AlgorithmSelector from './components/AlgorithmSelector.jsx'
import Controls from './components/Controls.jsx'
import ComparisonPanel from './components/ComparisonPanel.jsx'
import './App.css'

const DEFAULT_SETTINGS = {size: 100, min: 1, max: 500, speed: 6, type: 'random'}

function App() {
  // The various screens for the application
  const [screen, setScreen] = useState('welcome') // Starting screen
  const [history, setHistory] = useState([]) // Previous screens we came from. Used by the back button
  const [first, setFirst] = useState(null) // Picks first algorithm
  const[second, setSecond] = useState(null) // Picks second algorithm, or null if running just one algorithm
  const[settings, setSettings] = useState(DEFAULT_SETTINGS)
  const[data, setData] = useState([]) // The array that gets sorted with the algorithms

  // Navigation
  const goTo = (next) => {
    setHistory((h) => [...h, screen])
    setScreen(next)
  }

  const goBack = () => { // Goes to last screen in history, or goes to welcome screen if there is none
    let previous = 'welcome'

    if (history.length > 0) {

      previous = history[history.length - 1]

    }

    setHistory((h) => h.slice(0, -1))

    // Undo the choice made on the algorithm selection screen if user backs out of screen
    if (screen === 'askAnother') setFirst(null)
    if (screen === 'pickSecond') setSecond(null)

    setScreen(previous)
  }

  const goToMainMenu = () => {
    setHistory([])
    setFirst(null)
    setSecond(null)
    setScreen('welcome')
  }

  // Button Actions
  const chooseFirst = (key) => {
    setFirst(key)
    goTo('askAnother')
  }

  const chooseSecond = (key) => {
    setSecond(key)
    goTo('settings')
  }

  const startSorting = () => {
    // Generate array here so both panels get the same data
    setData(generateArray(settings.size, {
      type: settings.type,
      min: settings.min,
      max: settings.max,
    }))
    
    goTo('visualize')
  }

  // Selects which screen to display
  switch(screen) {

    case 'welcome':
      return (
        <main>
          <ScreenCard title = "Welcome to Sorting Algorithm Visualizer!" subtitle = "Select from the following algorithms" onExit = {() => setScreen('exit')}>
            <AlgorithmSelector onSelect = {chooseFirst} />
          </ScreenCard>
        </main>
      )

    case 'askAnother':
      return (
        <main>
          <ScreenCard title = "Would you like to use another algorithm?" subtitle = {`You picked ${ALGORITHMS[first].name}! Run a second one side by side?`} onBack = {goBack}>
            <div className = "button-grid">
              <button type = "button" className = "button" onClick = {() => goTo('pickSecond')}>Yes</button>
              <button type = "button" className = "button" onClick = {() => {setSecond(null), goTo('settings')}}>No</button>
            </div>
          </ScreenCard>
        </main>
      )

    case 'pickSecond':
      return (
        <main>
          <ScreenCard title = "What is your second algorithm you would like to see?" onBack = {goBack}>
            <AlgorithmSelector onSelect = {chooseSecond} disabledKey = {first} />            
          </ScreenCard>
        </main>
      )

    case 'settings':
      return (
        <main>
          <ScreenCard title = "Select your values!" onBack = {goBack}>
            <Controls settings = {settings} onChange = {setSettings} onStart = {startSorting} />
          </ScreenCard>
        </main>
      )

    case 'visualize':
      return (
        <main>
          <ScreenCard title = "Sorting..." onBack = {goBack} wide>
            <ComparisonPanel first = {first} second = {second} data = {data} speed = {settings.speed} onMainMenu = {goToMainMenu}/>
          </ScreenCard>
        </main>
      )
      
    case 'exit':
      return (
        <main>
          <ScreenCard title = "Thanks for coming!" subtitle = "Close out of the tab or start over to pick another option.">
            <button type = "button" className = "button button-primary" onClick = {goToMainMenu}>Start Over</button>
          </ScreenCard>
        </main>
      )

    default:
      return null

    }
}

export default App