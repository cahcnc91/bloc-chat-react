import React, { Component } from 'react';
import './style-bloc-chat.css';

class MessageList extends Component {
    constructor(props) {
        super(props);
    
        this.state = { 
          messages: [],
          content: '',
          username:'',
          sentAt: '',
          roomId: ''
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

    handleMessageChange(e) {
        e.preventDefault();
        this.setState({ 
            content: e.target.value,       
        });
    }

    convert(x) {
        var date = new Date(x*1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
      
        if(hours > 12) {
            return hours-12 + ':' + minutes.substr(-2) + 'pm';
          } 
          return hours + ':' + minutes.substr(-2) + 'am';
      }

    handleMessageSubmit(e) {
        e.preventDefault();
        const messageItems = this.messagesRef.push({
            username: this.props.user.displayName,
            content: this.state.content,
            sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
            roomId: this.props.activeRoom.roomId
        });
        this.setState({
            username: '',
            content: '',
            sentAt: '',
            roomId: ''
        }); 
          
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
                                 <div id="time-line">{this.convert(message.sentAt)}</div>
                                 <div> says: {message.content} </div>
                               </li>
                    }}
                )}
              </ul>
              <div className="form-or-choose-room">
                {this.props.activeRoom ?
                  <div className="new-messages-div"> 
                    <form>
                        <textarea 
                        placeholder="Write your message here" 
                        value={ this.state.content }
                         onChange={ (e) => this.handleMessageChange(e) } />
                        <button onClick={ (e) => this.handleMessageSubmit(e) }>Send</button>
                    </form> 
                  </div>
                  : 
                  <h2>Choose a Room</h2>
                } 
              </div>
            </div>
        );
    }
}

export default MessageList;