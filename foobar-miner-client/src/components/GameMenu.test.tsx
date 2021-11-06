import { render } from '@testing-library/react'
import GameMenu from './GameMenu'

test('display stock correctly', () => {
  render(
    <GameMenu
      foo={1}
      bar={2}
      foobar={3}
      robotNb={4}
      onBuyRobot={() => {}}
    />
  )

  const robotEle = document.querySelector('.game-menu__robotNb span')
  expect(robotEle?.textContent).toBe('4')

  const fooEle = document.querySelector('.game-menu__foo span')
  expect(fooEle?.textContent).toBe('1')

  const barEle = document.querySelector('.game-menu__bar span')
  expect(barEle?.textContent).toBe('2')

  const foobarEle = document.querySelector('.game-menu__foobar span')
  expect(foobarEle?.textContent).toBe('3')
})