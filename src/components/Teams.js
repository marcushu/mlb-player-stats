import React from 'react';
import PropTypes from 'prop-types';

function Teams(props) {

  return (
    <>
        {props.teamsArray.map(team =>
          <span key={team.team_id} style={{cursor: "pointer"}}>
            <img
              src={require(`../images/${team.gif}`)}
              style={{ width: "60px" }}
              alt={team.gif}
              onClick={() => props.callBack(team.team)}
            />
          </span>
        )}
      </>
  )
}

Teams.propTypes = {
  callBack: PropTypes.func.isRequired,
  teamsArray: PropTypes.array.isRequired
}

export default Teams;