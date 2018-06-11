// import React Component from 'react'
// import { Card } from 'semantic-ui-react'
// mport { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { fetchTeams } from '../redux/actions/matches';
//
// const src = '/assets/images/wireframe/white-image.png'
//
// const allTems = (props) => {
//   console.log('up props', props);
//   return (
//       render() {
//         <div>
//           <TopNav history={props.history}/>
//           <Container>
//             <Card.Group itemsPerRow={4}>
//               <Card color='orange' image={src} />
//               <Card color='yellow' image={src} />
//               <Card color='olive' image={src} />
//               <Card color='green' image={src} />
//               <Card color='teal' image={src} />
//               <Card color='blue' image={src} />
//               <Card color='violet' image={src} />
//               <Card color='purple' image={src} />
//               <Card color='pink' image={src} />
//               <Card color='brown' image={src} />
//               <Card color='grey' image={src} />
//             </Card.Group>
//           </Container>
//         </div>
//       }
//     }
//   }
//
// const mapStateToProps = (state, props) => {
//   console.log(state);
//   return {
//     team: state.matches.allTeams.find(team => props.match.homeTeam === team.id) || {},
//   }
// }
// const mapDispatchToProps = dispatch => bindActionCreators({ fetchTeams }, dispatch)
//
// export default connect(mapDispatchToProps, mapDispatchToProps)(Teams);
