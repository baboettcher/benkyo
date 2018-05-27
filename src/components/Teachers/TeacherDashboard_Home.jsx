import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, MenuItem, Dropdown, Container } from 'semantic-ui-react';


@connect((store) => {
  return {
    user_cred: store.authentication.user_cred
  }
})


class HomePage extends Component {

  render(){

    const { user_cred } = this.props;
    console.log("user_cred", user_cred);

    return (
      <div>
        <ul>
          <h2>Benkyo2.0 Teacher Dashboard</h2>
          <img src={user_cred.photoURL} alt="placeholder" height="42" width="42" />
          <li>Teacher name: {user_cred.displayName}</li>
          <li>Last Login:{user_cred.metadata.lastSignInTime}</li>
          <li>Current class:</li>
          <li>Number of students:</li>
          <li>Active Assessments:</li>
          <li>Assessment set:</li>
        </ul>
      </div>
    )
  }
}
    
export default HomePage;
    
    
    
      