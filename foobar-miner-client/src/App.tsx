import { useState } from 'react';
import 'ui-neumorphism/dist/index.css'
import { Grid } from 'react-flexbox-grid';

import './App.css';
import GameMenu from './components/GameMenu'
import WinnerScreen from './components/WinnerScreen'
import RobotDashboard from './components/RobotDashboard'

// Give direct resources to help debug
const TEST_MODE = false

function App() {
  const [userWon, setUserWon] = useState(false)
  const [robotNb, setRobotsNb] = useState(TEST_MODE ? 3 : 1)
  const [stock, setStock] = useState({
    foo: TEST_MODE ? 200 : 0,
    bar: TEST_MODE ? 200 : 0,
    foobar: TEST_MODE ? 200 : 0,
  })

  // Detect end of game
  if (!userWon && robotNb === 20) {
    setUserWon(true)
    // kill the robots to stop setIntervals
    setRobotsNb(0)
  }

  function buyRobotHandler () {
    if (stock.foobar >= 3 && stock.foo >= 6) {
      setRobotsNb(robotNb + 1)
      setStock({
        ...stock,
        foobar: stock.foobar - 3,
        foo: stock.foo - 6,
      })
    }
  }

  function handleRobotCollect ({ foo = 0, bar = 0, foobar = 0 }) {
    const newStock = {
      foo: stock.foo + foo,
      bar: stock.bar + bar,
      foobar: stock.foobar + foobar,
    }

    // If action have a cost and user doesn't have enough resources then do not effect gains
    if (newStock.foo >= 0 && newStock.bar >= 0 && newStock.foobar >= 0) {
      setStock(newStock)
    }
  }

  return (
    <Grid fluid>
      <GameMenu {...stock} onBuyRobot={buyRobotHandler} robotNb={robotNb} />

      <main>
        {!userWon
          ? <RobotDashboard robotNb={robotNb} onRobotCollect={handleRobotCollect} />
          : <WinnerScreen />}
      </main>

      <footer style={{ position: 'fixed', bottom: 0, right: 0, padding: 20 }}>
        Repo git du projet : 
        <a
          href="https://github.com/Ainocre/foobar-miner"
          target="_blank"
          rel="noreferrer"
        >
          https://github.com/Ainocre/foobar-miner
        </a>
      </footer>
    </Grid>
  );
}

export default App;
