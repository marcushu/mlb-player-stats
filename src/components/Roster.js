import React from 'react';
import PlayerDetails from './PlayerDetails';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';

import './roster.css';
import { useState } from 'react';


const Roster = ({ roster }) => {
  const [selectedPlayerId, setselectedPlayerId] = useState();
  const [hittingStats, sethittingStats] = useState();
  const [seasonHittingStats, setseasonHittingStats] = useState();
  const [pitchingStats, setpitchingStats] = useState();
  const [seasonPitchingState, setseasonPitchingState] = useState();
  const [loading, setloading] = useState(false);

  const highlightPlayer = async playerId => {
    setselectedPlayerId(playerId);
    setloading(true);

    try {
      const hittingRes = await axios.get(`https://lookup-service-prod.mlb.com/json/named.sport_career_hitting.bam?league_list_id=%27mlb%27&game_type=%27R%27&player_id=%27${playerId}%27`);
      const pitchingRes = await axios.get(`https://lookup-service-prod.mlb.com/json/named.sport_career_pitching.bam?league_list_id=%27mlb%27&game_type=%27R%27&player_id=%27${playerId}%27`);
      const seasonHittingRes = await axios.get(`https://lookup-service-prod.mlb.com/json/named.sport_hitting_tm.bam?league_list_id=%27mlb%27&game_type=%27R%27&season=%272017%27&player_id=%27${playerId}%27`);
      const seasonPitchingRes = await axios.get(`https://lookup-service-prod.mlb.com/json/named.sport_pitching_tm.bam?league_list_id=%27mlb%27&game_type=%27R%27&season=%272017%27&player_id=%27${playerId}%27`);

      sethittingStats(hittingRes.data.sport_career_hitting.queryResults)
      setseasonHittingStats(seasonHittingRes.data.sport_hitting_tm.queryResults);
      setpitchingStats(pitchingRes.data.sport_career_pitching.queryResults);
      setseasonPitchingState(seasonPitchingRes.data.sport_pitching_tm.queryResults);
      //setselectedPlayerId(playerId);

      setloading(false);
    } catch (error) {
      console.error(error);
    }

  }

  return (
    <Row>
      <Col>
        <div className="table-responsive">
          <Table size="sm">
            <thead>
              <tr style={{ backgroundColor: "rgb(212, 225, 255)" }}>
                <th></th>
                <th>Position</th>
                <th>Height</th>
                <th>Weight</th>
                <th>Pro Debut</th>
              </tr>
            </thead>
            <tbody>
              {roster.map(player =>
                <React.Fragment key={player.player_id}>
                  <tr>
                    <td>
                      <button onClick={(e) => highlightPlayer(player.player_id, e)}>
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
                  {player.player_id === selectedPlayerId ?
                    loading === false ?
                      <tr>
                        <td colSpan={5}>
                          <PlayerDetails
                            hitting={hittingStats}
                            pitching={pitchingStats}
                            seasonHitting={seasonHittingStats}
                            seasonPitching={seasonPitchingState}
                          />
                        </td>
                      </tr> :
                      <tr>
                        <td className="text-center">
                          <span style={{ color: "red", fontSize: "20px", padding: "10px" }}>
                            LOADING STATS...
                        </span>
                        </td>
                      </tr>
                    : <></>
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

Roster.propTypes = {
  roster: PropTypes.array.isRequired
}

export default Roster;