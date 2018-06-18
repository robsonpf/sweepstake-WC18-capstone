import React from 'react';
import Teams from './Teams';

const TeamsList = ({ teams }) => {
  let listOfTeamsFlags = teams.map(team => <Teams key={team.id} team={team} emoji={team.emoji.slice(5)}/>)

  return <div>{listOfTeamsFlags}</div>
};

export default TeamsList;
