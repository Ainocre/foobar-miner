import { Row, Col } from 'react-flexbox-grid'
import { Button } from 'ui-neumorphism'

type GameMenuProps = {
  foo: number,
  bar: number,
  foobar: number,
  robotNb: number,
  onBuyRobot (): void,
}

const GameMenu = ({ foo, bar, foobar, robotNb, onBuyRobot }: GameMenuProps) => (
  <Row style={{ position: 'fixed', width: '100%', backgroundColor: 'var(--light-bg)' }} end="md" middle="md">
    <Col style={{ padding: 20 }}>
      <strong>Robots : </strong> {robotNb}
    </Col>
    <Col style={{ padding: 20 }}>
      <strong>Foo : </strong> {foo}
    </Col>
    <Col style={{ padding: 20 }}>
      <strong>Bar : </strong> {bar}
    </Col>
    <Col style={{ padding: 20 }}>
      <strong>Foobar : </strong> {foobar}
    </Col>
    <Col style={{ padding: 20 }}>
      <Button onClick={onBuyRobot}>Acheter un nouveau robot (3 foobar + 6 foo)</Button>
    </Col>
  </Row>
)

export default GameMenu
