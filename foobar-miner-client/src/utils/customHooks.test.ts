import { renderHook, act } from '@testing-library/react-hooks'
import { useRobot } from './customHooks'

jest.setTimeout(15000)

test('should not call onCollect', () => {
  const onCollect = jest.fn()
  const { result } = renderHook(() => useRobot({ onCollect }))

  act(() => {
    result.current.action('mineFoo')
  })

  expect(onCollect.mock.calls.length).toBe(0)
})
