import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

describe('My game', () => {
  test('must have 1 robot at start', () => {
    render(
      <App />
    )
  
    const robotNbEl = document.querySelector('.game-menu__robotNb span')
    expect(robotNbEl?.textContent).toBe('1')

    const robotEls = document.querySelectorAll('.robot')
    expect(robotEls.length).toEqual(1)
  })
    
  test('cannot buy robot at start because of not enough resources', () => {
    render(
      <App />
    )
  
    const buyRobotButton = screen.getByText('Acheter un nouveau robot (3 foobar + 6 foo)')
    fireEvent.click(buyRobotButton)
    
    const robotNbEl = document.querySelector('.game-menu__robotNb span')
    expect(robotNbEl?.textContent).toBe('1') // same as game start
  })
})
