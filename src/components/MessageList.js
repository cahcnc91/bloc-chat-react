import React, { Component } from 'react';
import './style-bloc-chat.css';

class MessageList extends Component {
    constructor(props) {
        super(props);
    
        this.state = { 
          messages: []
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


    render() {

        return (
            <div className="message-list">
              <ul>
                { this.state.messages.map( (message, index) =>
                  <li key={index} >
                   {message.roomid} {message.text}
                  </li>
                )}
              </ul>
            </div>
        );
    }
}

export default MessageList;