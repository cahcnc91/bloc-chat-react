import React, { Component } from 'react';
import './style-bloc-chat.css';

class User extends Component {
  
signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    //prompt user to sign in
    this.props.firebase.auth().signInWithPopup(provider);
}

signOut() {
    this.props.firebase.auth().signOut();
}

componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
      this.props.setUser(user);
    })
  }

  render() {
      return (
        <div className="UserLogin">
          <div className="button-login-out">
            {this.props.user ?
            <button onClick={() => this.signOut()}>
                Log Out
            </button>
            :
            <button onClick={() => this.signIn()}>Log In</button>
            }
          </div>
        <div>
            {this.props.user ? this.props.user.displayName : <h2>Guest</h2>}
        </div>

      </div>
      );
   }
}

export default User;