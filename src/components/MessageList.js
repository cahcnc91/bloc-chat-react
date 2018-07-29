import React, { Component } from 'react';
import './style-bloc-chat.css';

class MessageList extends Component {
    constructor(props) {
        super(props);
    
        this.state = { 
          messages: [],
          newMessage: {
              username: '',
              content: '',
              sentAt:'',
              roomId:''
          }
        };
    
        this.messagesRef = this.props.firebase.database().ref('messages');
    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat( message ) })
        });
    }

    handleSendMessage() {

    }


    render() {
        return (
            <div className="message-list">
              <h2> {this.props.activeRoom.name} </h2>
              <ul>
                { this.state.messages.map( (message, index) => {
                    if (this.props.activeRoom.roomId === message.roomId) {
                        return <li key={index} style={{ background: index % 2 === 0 ? 'rgba(213, 210, 239, 0.82)' : "none" }}> 
                                 <div id="username-line" style={{ fontWeight: 'bold'}}> {message.username}</div>
                                 <div id="time-line">{message.time}</div>
                                 <div> says: {message.content} </div>
                               </li>
                    }}
                )}
              </ul>
              <h2>Message</h2>
              
            </div>
        );
    }
}

export default MessageList;