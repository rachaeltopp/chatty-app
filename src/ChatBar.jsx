import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.onEnter} onChange={this.contentChanged} value={this.state.content}/>
      </footer>
    );
  }

  contentChanged = (event) => {
    this.setState({content: event.target.value});
  }

  //function to handle when enter key is pressed
  onEnter = (event) => {
    const newMessage = this.state.content;
    if(event.key == 'Enter'){
      this.props.onNewPost(newMessage)
      this.setState({content: ''})
    }
  }  
}

export default ChatBar;
  