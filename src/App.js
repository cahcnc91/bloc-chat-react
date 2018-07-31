import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';
import './components/style-bloc-chat.css';
import MessageList from './components/MessageList';
import User from './components/User.js';


var config = {
  apiKey: "AIzaSyBCeCdMyGLpFwc28p1egBTID4Vg0xaTf1o",
  authDomain: "bloc-chat-react-3354c.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-3354c.firebaseio.com",
  projectId: "bloc-chat-react-3354c",
  storageBucket: "bloc-chat-react-3354c.appspot.com",
   messagingSenderId: "521781433743"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeRoom: '',
      user: null
    };

    this.setActiveRoom = this.setActiveRoom.bind(this);

  }

  setActiveRoom(room) {
    this.setState({ activeRoom: room});
  }

  setUser(user) {
    this.setState({
      user: user,
      activeRoom: ''
    })
    console.log(user);
  }

  render() {
    return (
      <div className="App" className="container-fluid">
        <div className="row content">
          <div className="col-sm-3 sidenav">
            <div className="roomlist-component">
              <RoomList 
              firebase={firebase} 
              setActiveRoom = {this.setActiveRoom}
              activeRoom = {this.state.activeRoom} />
            </div>
            <div className="user-component">
              <User firebase={firebase}
                setUser={(user) => this.setUser(user)}
                user={this.state.user}
              />
            </div>
          </div>
          <div className="col-sm-9">
            <MessageList 
              firebase={firebase}
              activeRoom = {this.state.activeRoom} 
              user = {this.state.user}
            />
          </div>
        </div>
        
      </div>
    );
  }
}

export default App;
