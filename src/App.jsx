import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {loading: false};
  }

  componenetDidMount() {
    setTimeout(() => {
      this.setState({loading: true})
    }, 500)
  }

  render() {
    if(this.state.loading) {
      return <h1>Loading...</h1>
    } else {
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
}
export default App;
