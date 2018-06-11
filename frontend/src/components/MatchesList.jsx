import React from 'react';
import CardMatch from './CardMatch';

const MatchesList = ({ matches }) => {
  let listOfMatches = matches.map(match => <CardMatch match={match} />)

  return <div>{listOfMatches}</div>
};

export default MatchesList;
