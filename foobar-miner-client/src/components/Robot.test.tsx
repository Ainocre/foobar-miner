import { render, fireEvent, screen } from '@testing-library/react'
import Robot from './Robot'

test('Robot name display', () => {
  render(
    <Robot
      robotIndex={3}
      onCollect={() => {}}
    />
  )

  const robotName = document.querySelector('.robot__name')
  expect(robotName?.textContent).toBe(`Robot ${4}`)
})

test('Oisif status at creation', () => {
  render(
    <Robot
      robotIndex={3}
      onCollect={() => {}}
    />
  )

  const robotStatus = document.querySelector('.robot__status')
  expect(robotStatus?.textContent).toBe('Oisif')
})

test('moving status on action click', () => {
  render(
    <Robot
      robotIndex={3}
      onCollect={() => {}}
    />
  )

  const mineFooButton = screen.getByText('Miner foo', { exact: false })
  fireEvent.click(mineFooButton)

  const robotStatus = document.querySelector('.robot__status')
  expect(robotStatus?.textContent).toBe('En déplacement (5s)')
})
