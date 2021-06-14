import React from 'react';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';

import './playerDetails.css';

function PlayerDetails(props) {
  const stats = props
  const pitching = ["era","np", "avg", "r","so", "h", "hr9","ip", "w", "gs", "sv"];
  const hittingStats = ["avg", "ab", "h", "r",  "hr", "rbi", "slg", "bb", "sb", "d", "t", "tb",];


  return (
    <div className="p-2 py-3">
      {stats.hitting.totalSize > 0 &&
        <>
          <span className="statHeader">Career Hitting</span><br />
          <Table size="sm">
            <thead className="hittingHeader">
              <tr>
                {hittingStats.map(x => (<th key={x + "h1"} className="hittingStatNames">{x}</th>))}
              </tr>
            </thead>
            <tbody>
              <tr className="tableRowFigs">
                {hittingStats.map(x => (<td key={x + "h2"} className="figures">{stats.hitting.row[x]}</td>))}
              </tr>
            </tbody>
          </Table>
        </>}

      {stats.seasonHitting.totalSize > 0 &&
        <>
          <span className="statHeader">Season Hitting</span><br />
          <Table size="sm">
            <thead className="hittingHeader">
              <tr>
                {hittingStats.map(x => (<th key={x + "sh1"}className="hittingStatNames">{x}</th>))}
              </tr>
            </thead>
            <tbody>
              <tr className="tableRowFigs">
                {hittingStats.map(x => (<td key={x + "sh2"} className="figures">{stats.seasonHitting.row[x]}</td>))}
              </tr>
            </tbody>
          </Table>
        </>}

      {stats.pitching.totalSize > 0 &&
        <>
          <span className="statHeader">Career Pitching</span><br />
          <Table size="sm">
            <thead className="pitchingHeader">
              <tr>
                {pitching.map(x => (<th key={x + "cp1"} className="pitchingStatNames">{x}</th> ))}
              </tr>
            </thead>
            <tbody>
              <tr className="tableRowFigs">
                {pitching.map(x => (<td  key={x + "cp2"} className="figures">{stats.pitching.row[x]}</td>))}
              </tr>
            </tbody>
          </Table>
        </>}

      {stats.seasonPitching.totalSize > 0 &&
        <>
         <span className="statHeader">Season Pitching</span><br />
          <Table size="sm">
            <thead className="pitchingHeader">
              <tr>
                {pitching.map(x => (<th key={x + "p2"} className="pitchingStatNames">{x}</th> ))}
              </tr>
            </thead>
            <tbody>
              <tr className="tableRowFigs">
                {pitching.map(x => (<td  key={x + "p2"} className="figures">{stats.seasonPitching.row[x]}</td>))}
              </tr>
            </tbody>
          </Table>
        </>}
    </div>
  );

}

PlayerDetails.propTypes = {
  seasonHitting: PropTypes.object.isRequired,
  hitting: PropTypes.object.isRequired,
  pitching: PropTypes.object.isRequired,
  seasonPitching: PropTypes.object.isRequired
}

export default PlayerDetails