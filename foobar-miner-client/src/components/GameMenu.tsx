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
  <Row className="game-menu" style={{ position: 'fixed', width: '100%', backgroundColor: 'var(--light-bg)' }} end="md" middle="md">
    <Col className="game-menu__robotNb" style={{ padding: 20 }}>
      <strong>Robots : </strong> <span>{robotNb}</span>
    </Col>
    <Col className="game-menu__foo" style={{ padding: 20 }}>
      <strong>Foo : </strong> <span>{foo}</span>
    </Col>
    <Col className="game-menu__bar" style={{ padding: 20 }}>
      <strong>Bar : </strong> <span>{bar}</span>
    </Col>
    <Col className="game-menu__foobar" style={{ padding: 20 }}>
      <strong>Foobar : </strong> <span>{foobar}</span>
    </Col>
    <Col style={{ padding: 20 }}>
      <Button onClick={onBuyRobot}>Acheter un nouveau robot (3 foobar + 6 foo)</Button>
    </Col>
  </Row>
)

export default GameMenu
