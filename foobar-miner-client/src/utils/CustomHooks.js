import { useRef, useEffect, useState } from 'react'
import { rules, frameDuration} from './config'

const moveLoops = rules.move.iterations()

// This custom hook implement js setInterval with react preserving state between renderings
export function useInterval(callback, delay) {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

// This is the robot logic, game loop and observers
export function useRobot ({ onCollect }) {
  // This is the state of the robot game loop
  const [loopData, setLoopData] = useState(null)

  // Launch the game loop with the framerate in config
  useInterval(() => {
    // If robot have a job
    if (loopData) {
      // And if there is remainings loading iterations
      if (loopData.iterations) {

        // We set up the new progression %
        setLoopData({
          ...loopData,
          iterations: loopData.iterations - 1,
          progress: Math.round((loopData.totalIterations - loopData.iterations) / loopData.totalIterations * 100),
        })

      } else {
        // Here is when the wainting time end's up

        // Collect current status rewards
        const currentStatusRules = rules[loopData.status]
        if (currentStatusRules.collect) {
          onCollect(currentStatusRules.collect())
        }

        const totalIterations = rules[loopData.nextLoopStatus].iterations()

        // Launch the next loop
        setLoopData({
          status: loopData.nextLoopStatus,
          iterations: totalIterations,
          totalIterations,
          nextLoopStatus: loopData.nextLoopStatus, // Will do the same job indefinitely
          progress: 0,
        })
      }
    }
  }, frameDuration)

  // This function handle changing robot job
  // It cut the current loop by replacing with the new one
  async function action (newStatus) {
    setLoopData({
      status: 'move', // It will first set moving status
      iterations: moveLoops,
      totalIterations: moveLoops,
      nextLoopStatus: newStatus, // And there will be the next job after the move is complete
      progress: 0,
    })
  }

  return {
    loopData,
    action,
  }
}