import { useRef, useEffect, useState } from 'react'
import { rules, frameDuration } from './config'
import type { Status } from '../utils/sharedTypes'

const moveLoops = rules.move.iterations()

// This custom hook implement js setInterval with react preserving state between renderings
export function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current()
      }
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

type UseRobot = {
  onCollect (newStock: {
    foo?: number,
    bar?: number,
    foobar?: number,
  }): void
}

type LoopData = {
  status: Status,
  iterations: number,
  totalIterations: number,
  nextLoopStatus: Status,
  progress: number,
}

// This is the robot logic, game loop and observers
export function useRobot ({ onCollect }: UseRobot) {
  // This is the state of the robot game loop
  const [loopData, setLoopData] = useState<LoopData>()

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

      } else { // Here is when the wainting time end's up
        // Collect current status rewards
        const { collect } = rules[loopData.status]

        if (collect) {
          onCollect(collect())
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
  function action (newStatus: Status) {
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