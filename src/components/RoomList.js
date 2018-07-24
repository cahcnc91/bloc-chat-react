import React, { Component } from 'react';
import * as firebase from 'firebase';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      rooms: [],
      newRoomName: ''
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
      this.roomsRef.on('child_added', snapshot => {
        const room = snapshot.val();
        room.key = snapshot.key;
        this.setState({ rooms: this.state.rooms.concat( room ) })
      });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ newRoomName: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.createRoom(this.state.newRoomName);
  }

  createRoom(newRoomName) {
    this.roomsRef.push({
      name: newRoomName
    });
    this.setState({ newRoomName: ''});
  }



  render() {
      return (
        <div className="RoomList">
          { this.state.rooms.map( (room, index) =>
            <li key={index}>
              {room.name}
            </li>
          )} 
          <section className='newRoom'>
          <h2>New room</h2>
          <form>
            <input type="text" id="new-room-name" value={ this.state.newRoomName } onChange={ (e) => this.handleChange(e) } />
            <label for="new-room-name">New room's name</label>
            <button onClick={ (e) => this.handleSubmit(e) }>Create</button>
          </form>
          </section>
        </div>
      );
  }
}

export default RoomList;