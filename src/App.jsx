import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx';

const ANONYMOUS = 'Anonymous';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: ANONYMOUS }, 
      messages: [],
      usersConnected: 0
    }
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.onopen = (event) => {
      console.log("Connected to server");
    }

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch(data.type) {
        case 'postMessage':
          data.type = 'incomingMessage'
          break;
        case 'postNotification': 
          data.type = 'incomingNotification'
          //eventually make it so that Someone is the previous state
          data.content = `Someone changed their name to ${data.username}`
          break;
        case 'newUser':
          this.setState({
            usersConnected: data.count
          })
          break;
        case 'lostUser':
          this.setState({
            usersConnected: data.count
          })
          break;
        default:
          // show an error if the message type is unknown
          throw new Error("Unknown event type " + data.type);
      }

      const newMessages = this.state.messages.concat(data);
      this.setState({
        messages: newMessages
      })
    }
  }

  handleNameChange = (newName) => {
    this.setState({ currentUser: { name: newName }})
  }

  createMessage = (type, currentUsername, content) => {
    let username = currentUsername;
    if (currentUsername === '') {
      username = ANONYMOUS
    }
    const newMessage = {
      type,
      username,
      content
    }
    this.socket.send(JSON.stringify(newMessage));
  }

  render() {
    // destructuring assignment
    const {
      currentUser,
      messages
    } = this.state;

    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <p className="userCount">People Online: {this.state.usersConnected}</p>
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
