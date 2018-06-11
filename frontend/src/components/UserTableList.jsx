import React from 'react';
import MatchTable from './MatchTable';

const UserTableList = ({ matches }) => matches.map(match => (<MatchTable key={match.matchId} match={match} />));

export default UserTableList;
