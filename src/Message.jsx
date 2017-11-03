import React from 'react';

const Message = ({ username, content }) => {
  return (
    <div className="message">
      <span className="message-username">{username}</span>
      <span className="message-content" dangerouslySetInnerHTML={{__html: content}}></span>
    </div>
  )
}

export default Message;