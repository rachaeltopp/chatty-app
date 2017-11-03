import React, {Component} from 'react';

class OlderMessage extends Component {
  render() {
    return (
      <div className="message">
        <span className="message-username">{this.props.username}</span>
        <span className="message-content" dangerouslySetInnerHTML={{__html: this.props.content}}></span>
      </div>
    );
  }
}

const OldMessage = (props) => {
  return (
    <div className="message">
      <span className="message-username">{props.username}</span>
      <span className="message-content">{props.content}</span>
    </div>
  )
}

const Message = ({ username, content }) => {
  return (
    <div className="message">
      <span className="message-username">{username}</span>
      <span className="message-content" dangerouslySetInnerHTML={{__html: content}}></span>
    </div>
  )
}

export default Message;