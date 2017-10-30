import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx';

class App extends Component {
  render() {
    console.log('Rendering <App/>');
    return (
      <body>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList />
        <ChatBar />
      </body>
    );
  }
}
export default App;
