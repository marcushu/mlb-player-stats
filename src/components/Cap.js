import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import playerImg from '../images/icons8-baseball-player-100.png';

function Cap() {
  return (
    <Row className="py-4" style={{ backgroundColor: "white", color: "rgb(1, 5, 66)" }}>
      <Col>
        <div>
          <span>
            <img src={playerImg} alt="player" />
          </span>
          <span className="align-text-top">
            M.L.B.
            <span style={{ fontSize: "48px" }}>Stats</span>
          </span>

        </div>
      </Col>
    </Row>
  )
}

export default Cap;