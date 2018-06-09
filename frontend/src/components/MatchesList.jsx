import React from 'react';
import CardMatch from './CardMatch';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const MatchesList = ({ matches }) => {
  let listOfMatches = matches.map(match => <CardMatch match={match} />)

  return <div>{listOfMatches}</div>
};

const mapStateToProps = (state, props) => {
  console.log("matches in MatchesList = ", props.matches);

  return {

  }
}

export default connect(mapStateToProps, null)(MatchesList);
