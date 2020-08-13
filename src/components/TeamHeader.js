import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Teams from './Teams';
import Roster from './Roster';
import axios from 'axios';
import { americanLeague, nationalLeague } from '../js/teamIds';


class TeamHeader extends React.Component {
  constructor() {
    super();

    this.state = {
      teamSelected: null,
      roster: []
    }
  }

  componentDidMount() {
    this.setTeam("San Diego Padres");
  }

  setTeam = async teamName => {
    const teamNum = [...americanLeague, ...nationalLeague]
      .find(({ team }) => team === teamName)
      .team_id;

    const res = await axios.get(`https://lookup-service-prod.mlb.com/json/named.roster_40.bam?team_id=%27${teamNum}%27`);

    this.setState({
      teamSelected: teamName,
      roster: res.data.roster_40.queryResults.row
    });
  }

  render() {
    const mlbTeams = [...americanLeague, ...nationalLeague];

    return (
      <>
        <Row style={{ backgroundColor: "rgb(1, 5, 66)" }}>
          <Col className="text-right p-4">
            <span style={{ color: "white", padding: "10px", fontSize: "40px", fontStyle: "italic" }}>
              {this.state.teamSelected}
            </span>
          </Col>
        </Row>
        <Row className="pt-4 pb-2">
          <Col className="d-flex justify-content-around py-3">
            <Teams callBack={this.setTeam} teamsArray={mlbTeams.slice(0, 5)} />
          </Col>
          <Col className="d-flex justify-content-around py-3">
            <Teams callBack={this.setTeam} teamsArray={mlbTeams.slice(5, 10)} />
          </Col>
        </Row>
        <Row className=" pb-2">
          <Col className="d-flex justify-content-around py-3">
            <Teams callBack={this.setTeam} teamsArray={mlbTeams.slice(10, 15)} />
          </Col>
          <Col className="d-flex justify-content-around py-3">
            <Teams callBack={this.setTeam} teamsArray={mlbTeams.slice(15, 20)} />
          </Col>
        </Row>
        <Row className=" pb-2">
          <Col className="d-flex justify-content-around py-3">
            <Teams callBack={this.setTeam} teamsArray={mlbTeams.slice(20, 25)} />
          </Col>
          <Col className="d-flex justify-content-around py-3">
            <Teams callBack={this.setTeam} teamsArray={mlbTeams.slice(25, 30)} />
          </Col>
        </Row>
        
        <Row className="py-3">
          <Col>
            <Roster roster={this.state.roster} />
          </Col>

        </Row>
      </>
    )
  }

}

export default TeamHeader;