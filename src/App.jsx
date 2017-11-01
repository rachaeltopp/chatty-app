import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      idCounter: 3,
      currentUser: {name: 'Bob'}, 
      messages: [
        { id: 1,
          username: 'Bob',
          content: 'Has anyone seen my marbles?',
        },
        { id: 2,
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        }
      ]
    }
    this.createMessage = this.createMessage.bind(this);
  }

  componentDidMount() {
    var socket = new WebSocket('ws://localhost:3001');
    socket.onopen = (event) => {
      console.log("Connected to server");
    }
  }

  render() {
      return (
        <div>
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
          </nav>
          <MessageList messages={this.state.messages}/>
          <ChatBar currentUser={this.state.currentUser} onNewPost={this.createMessage}/>
        </div>
      );
  }

  createMessage = (content) => {
    const newId = this.state.idCounter+1
    const newMessage = {
      id: newId,
      username: this.state.currentUser.name,
      content: content
    }
    let messages = this.state.messages
    messages.push(newMessage)
    this.setState({messages: messages,
    idCounter: newId
    })
  }
}
export default App;
