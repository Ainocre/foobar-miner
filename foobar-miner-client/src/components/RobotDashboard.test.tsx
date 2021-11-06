import { render } from '@testing-library/react'
import RobotDashboard from './RobotDashboard'

test('display the good number of robots', () => {
  render(
    <RobotDashboard
      robotNb={3}
      onRobotCollect={() => {}}
    />
  )

  const robotEls = document.querySelectorAll('.robot')
  expect(robotEls.length).toBe(3)
})