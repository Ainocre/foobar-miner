import PropTypes from 'prop-types'
import {
  Card,
  CardContent,
  Subtitle2,
  CardAction,
  H5,
  ProgressLinear,
  ToggleButtonGroup,
  ToggleButton,
} from 'ui-neumorphism'

import { useRobot } from '../utils/customHooks'
import { rules } from '../utils/config'
import type { Stock } from '../utils/sharedTypes'


type robotProps = {
  robotIndex: number,
  onCollect (newStock: Stock): void
}

function Robot ({ robotIndex, onCollect }: robotProps) {
  // All robot logic and render loop is in this custom hook "useRobot"
  const {
    loopData,
    action,
  } = useRobot({ onCollect })

  function handleChangeStatus ({ value: newStatus }: { value: 'move' | 'mineFoo' | 'mineBar' | 'craftFooBar' }) {
    if (!loopData || loopData.status !== newStatus) {
      action(newStatus)
    }
  }

  const robotStatusLabel = loopData ? rules[loopData.status].label : 'Oisif'

  return (
    <div className="robot" style={{ padding: 8 }}>
      <Card style={{ padding: 8 }}>
        <CardContent>
          <H5 className="robot__name">
            Robot {robotIndex + 1}
          </H5>
          <Subtitle2 className="robot__status" secondary style={{ margin: '6px 0' }} >
            {robotStatusLabel}
          </Subtitle2>
          <ProgressLinear
            fillHeight
            height={12}
            value={loopData ? loopData.progress : 0}
          />
        </CardContent>
        <CardAction style={{ flexDirection: 'column' }}>
          <ToggleButtonGroup value={loopData ? loopData.status : null}>
            <ToggleButton onClick={handleChangeStatus} value='mineFoo' style={{ width: '100%', marginBottom: 8 }}>
              Miner foo
            </ToggleButton>
            <ToggleButton onClick={handleChangeStatus} value='mineBar' style={{ width: '100%', marginBottom: 8 }}>
              Miner du bar
            </ToggleButton>
            <ToggleButton onClick={handleChangeStatus} value='craftFooBar' style={{ width: '100%', marginBottom: 8 }}>
              Crafter du foobar
            </ToggleButton>
          </ToggleButtonGroup>
        </CardAction>
      </Card>
    </div>
  )
}

Robot.propTypes = {
  robotIndex: PropTypes.number,
};

export default Robot