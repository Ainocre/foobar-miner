import { renderHook, act } from '@testing-library/react-hooks'
import { useRobot } from './customHooks'

test('should not call onCollect', () => {
  const onCollect = jest.fn()
  const { result } = renderHook(() => useRobot({ onCollect }))

  act(() => {
    result.current.action('mineFoo')
  })

  expect(onCollect.mock.calls.length).toBe(0)
})
