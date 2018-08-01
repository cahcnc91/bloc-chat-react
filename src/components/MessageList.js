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
        
    handleMessageSubmit(e) {
        e.preventDefault();
        var timeStamp = Date.now();
        function convertTimestamp(x) {	
            var d = new Date(x),	
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),	
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),		
            ampm = 'AM',
            time;
                
            if (hh > 12) {
                h = hh - 12;
                ampm = 'PM';
            } else if (hh === 12) {
                h = 12;
                ampm = 'PM';
            } else if (hh == 0) {
                h = 12;
            }
        
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;
            
        return time;
        }
        const timeConverted = convertTimestamp(timeStamp);

        const messageItems = this.messagesRef.push({
            username: this.props.user.displayName,
            content: this.state.content,
            sentAt: timeConverted,
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
                                 <div id="time-line">{message.sentAt}</div>
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