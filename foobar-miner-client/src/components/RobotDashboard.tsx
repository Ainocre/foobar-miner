import { Row, Col } from 'react-flexbox-grid'
import { Stock } from '../utils/sharedTypes'
import Robot from './Robot'

type RobotDashboardProps = {
  robotNb: number,
  onRobotCollect(newStock: Stock): void
}

const RobotDashboard = ({ robotNb, onRobotCollect }: RobotDashboardProps) => (
  <Row style={{ padding: 20, paddingTop: 90 }}>
    {Array(robotNb).fill(null).map((_, robotIndex) => (
      <Col md={3} key={robotIndex}>
        <Robot 
          robotIndex={robotIndex}
          onCollect={onRobotCollect}
        />
      </Col>
    ))}
  </Row>
)

export default RobotDashboard
