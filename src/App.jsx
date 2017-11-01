import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Bob'}, 
      messages: []
    }
    this.createMessage = this.createMessage.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = (event) => {
      console.log("Connected to server");
    }
    this.socket.onmessage = (event) => {
      let newMessages = [];
      newMessages.push(JSON.parse(event.data));
      this.setState({
        messages: newMessages
      })
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
    const newMessage = {
      username: this.state.currentUser.name,
      content: content
    }
    this.socket.send(JSON.stringify(newMessage));
  }
}

export default App;
