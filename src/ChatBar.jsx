import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
  }

  onContent = (event) => {
    this.setState({content: event.target.value});
  }

  //function to handle when enter key is pressed
  onContentEnter = (event) => {
    if(event.key == 'Enter'){
      this.props.onNewPost('postMessage', this.props.currentUser.name, this.state.content)
      this.setState({
        content: ''
      })
    }
  } 
  
  onUserContent = (event) => {
    this.props.handler(event.target.value);
  }

  onUserEnter = (event) => {
    if(event.key == 'Enter') {
      this.props.onNewPost('postNotification', this.props.currentUser.name, '');
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          onChange={this.onUserContent}
          onKeyPress={this.onUserEnter}
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onChange={this.onContent}
          onKeyPress={this.onContentEnter}
          value={this.state.content}
        />
      </footer>
    );
  }
}

export default ChatBar;
  