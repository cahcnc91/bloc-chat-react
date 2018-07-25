import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';
import './components/style-bloc-chat.css';


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
  render() {
    return (
      <div className="App">
        <header>
        </header>
        <div>
          <RoomList firebase={firebase} />
        </div>
      </div>
    );
  }
}

export default App;
