import React, { Component } from 'react';
import './style-bloc-chat.css';
import { Button, Modal } from 'react-bootstrap';


class RoomList extends Component {
  constructor(props) {
    super(props);

    this.handleHide = this.handleHide.bind(this);

    this.state = { 
      rooms: [],
      newRoomName: '',
      show: false
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

  handleHide() {
    this.setState({ show: false });
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
    this.setState({ 
      newRoomName: '',
      show: false
  });
  }

  activeRoomClicked(room) {
    const activeRoomSelected = room;
    console.log(activeRoomSelected);
    this.props.setActiveRoom(room);
  }


  render() {
      return (
        <div className="room-list">
          
            <h2>Bloc Chat</h2>
            <div className="modal-container" style={{ height: 300 }}>
                <Button
                  bsStyle="primary"
                   bsSize="small"
                   onClick={() => this.setState({ show: true })}
                >
                   New Room
                </Button>
                <table>
                  <colgroup>
                    <col id="room-col" />
                  </colgroup>
                  <tbody>
                    { this.state.rooms.map( (room, index) =>
                    <tr key={index} 
                      onClick={() => this.activeRoomClicked (room)} style={{ background: this.props.activeRoom === room ? 'blue' : "none" }} >
                      <td>{room.name} {room.roomId}</td>    
                    </tr>
                    )}
                  </tbody>
                </table>

                <Modal
                  show={this.state.show}
                  onHide={this.handleHide}
                  container={this}
                  aria-labelledby="contained-modal-title"
                >
                  <Modal.Header>
                    <Modal.Title id="contained-modal-title">
                      Create new room
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Enter a room name
                    <form>
                      <input type="text" value={ this.state.newRoomName } onChange={ (e) => this.handleChange(e) } />
                    </form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.handleHide}>Close</Button>
                    <button onClick={ (e) => this.handleSubmit(e) }>Create room</button>
                  </Modal.Footer>
                </Modal>
              </div>

               
                
        </div>

      );
  }
}

export default RoomList;