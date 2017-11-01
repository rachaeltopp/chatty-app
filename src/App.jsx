import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx';

const ANONYMOUS = 'Anonymous';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: ANONYMOUS }, 
      messages: []
    }

    this.handleNameChange = this.handleNameChange.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = (event) => {
      console.log("Connected to server");
    }
    this.socket.onmessage = (event) => {
      const newMessages = this.state.messages.concat(JSON.parse(event.data));
      this.setState({
        messages: newMessages
      })
    }
  }

  handleNameChange(newName) {
    this.setState({
      currentUser: { name: newName }
    });
  }

  createMessage = (currentUsername, content) => {
    let username = currentUsername;
    if (currentUsername === '') {
      username = ANONYMOUS
    }
    const newMessage = {
      username,
      content
    }
    this.socket.send(JSON.stringify(newMessage));
  }

  render() {
    // assigning state to local variables (OLD)
    // const currentUser = this.state.currentUser;
    // const messages = this.state.messages;

    // destructuring assignment
    const {
      currentUser,
      messages
    } = this.state;

    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={messages}/>
        <ChatBar
          currentUser={currentUser}
          onNewPost={this.createMessage}
          handler={this.handleNameChange}
        />
      </div>
    );
  }
}

export default App;
