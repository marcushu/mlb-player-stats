import React from 'react';
import PlayerDetails from './PlayerDetails';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';

import './roster.css';

class Roster extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPlayerID: null,
      hittingStats: null,
      seasonHittingStats: null,
      pitchingStats: null,
      seasonPitchingState: null
    }

    Roster.propTypes = {
      roster: PropTypes.array.isRequired
    }
  }

  highlightPlayer = async playerId => {
    const hittingRes = await axios.get(`https://lookup-service-prod.mlb.com/json/named.sport_career_hitting.bam?league_list_id=%27mlb%27&game_type=%27R%27&player_id=%27${playerId}%27`);
    const pitchingRes = await axios.get(`https://lookup-service-prod.mlb.com/json/named.sport_career_pitching.bam?league_list_id=%27mlb%27&game_type=%27R%27&player_id=%27${playerId}%27`);
    const seasonHittingRes = await axios.get(`https://lookup-service-prod.mlb.com/json/named.sport_hitting_tm.bam?league_list_id=%27mlb%27&game_type=%27R%27&season=%272017%27&player_id=%27${playerId}%27`);
    const seasonPitchingRes = await axios.get(`https://lookup-service-prod.mlb.com/json/named.sport_pitching_tm.bam?league_list_id=%27mlb%27&game_type=%27R%27&season=%272017%27&player_id=%27${playerId}%27`);

    this.setState({
      selectedPlayerID: playerId,
      hittingStats: hittingRes.data.sport_career_hitting.queryResults,
      seasonHittingStats: seasonHittingRes.data.sport_hitting_tm.queryResults,
      pitchingStats: pitchingRes.data.sport_career_pitching.queryResults,
      seasonPitchingState: seasonPitchingRes.data.sport_pitching_tm.queryResults
    });
  }

  render() {
    return (
      <Row>
        <Col>
        <div className="table-responsive">
          <Table size="sm">
            <thead>
              <tr style={{backgroundColor: "rgb(212, 225, 255)"}}>
                <th></th>
                <th>Position</th>
                <th>Height</th>

                <th>Weight</th>
                <th>Pro Debut</th>
              </tr>
            </thead>
            <tbody>
              {this.props.roster.map(player =>
                <React.Fragment key={player.player_id}>
                  <tr>
                    <td>
                      <button onClick={(e) => this.highlightPlayer(player.player_id, e)}>
                        {player.name_display_first_last} 
                        <span id="number"> {player.jersey_number}</span> 
                      </button>
                    </td>
                    <td>
                      {player.position_txt}
                    </td>
                    <td>
                      {player.height_feet}'{player.height_inches}"
                    </td>

                    <td>
                      {player.weight}
                    </td>
                    <td>
                      {player.pro_debut_date.substr(0, 4)}
                    </td>
                  </tr>
                  {/* conditional */}
                  {player.player_id === this.state.selectedPlayerID ?
                    <tr>
                      <td colSpan={5}>
                        <PlayerDetails
                          hitting={this.state.hittingStats}
                          pitching={this.state.pitchingStats}
                          seasonHitting={this.state.seasonHittingStats}
                          seasonPitching={this.state.seasonPitchingState}
                        />
                      </td>
                    </tr> : <></>
                  }
                </React.Fragment>
              )}
            </tbody>
          </Table>
          </div>
        </Col>
      </Row >
    )
  }

}



export default Roster;