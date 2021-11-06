import { Row, Col } from 'react-flexbox-grid'
import Robot from './Robot'

type RobotDashboardProps = {
  robotNb: number,
  onRobotCollect(newStock: {
    foo?: number,
    bar?: number,
    foobar?: number,
    test: string,
  }): void
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
