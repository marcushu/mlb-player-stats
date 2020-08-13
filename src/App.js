import React from 'react';
import Container from 'react-bootstrap/Container'
import Cap from './components/Cap';
import TeamHeader from './components/TeamHeader';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  return (
    <div className="App">
      <Container style={{backgroundColor: "white"}}>
        <Row>
          <Col>
            <Cap />
          </Col>
        </Row>
        <Row>
          <Col>
            <TeamHeader />
          </Col>
        </Row>
        <Row>
          <Col className="pt-4 pb-2 text-center"
               style={{color: "grey", backgroundColor: "rgb(1, 5, 66)"}}>
            Not affiliated with Major League Baseball. All images &#169; MLB
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
