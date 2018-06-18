import React from 'react';
import UserTable from './UserTable';

const UserTableList = ({ matches }) => matches.map(match => (<UserTable key={match.matchId} match={match} />));

export default UserTableList;
