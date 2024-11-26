import React, { useState, useRef, useEffect } from "react";
import "./Chats.scss";

const contacts = [
  { id: 1, name: "Maria Smirnova", lastMessage: "You: Guf - Ice Baby", online: true },
  { id: 2, name: "Julia", lastMessage: "Thank you so mush, hope so", online: false },
  { id: 3, name: "Ralph Edwards", lastMessage: "I will text you later", online: false },
  { id: 4, name: "Rhythmo", lastMessage: "New options are added!", online: false },
];

const messages = {
  1: [
    { text: "Hello! Is it true what they say about ...?", sender: "me", time: "1:22 PM" },
    { text: "Hi! Yeeees, I’m really shocked. This song describes the situation)", sender: "Maria", time: "1:43 PM" },
  ],
};

const Chats = () => {
  const [activeChat, setActiveChat] = useState(1); // ID текущего открытого чата
  const [newMessage, setNewMessage] = useState("");


  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth", 
      });
    }
  };


  useEffect(() => {
    scrollToBottom();
  }, [messages[activeChat]]);


  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const updatedMessages = [...messages[activeChat], { text: newMessage, sender: "me", time: "Now" }];
      messages[activeChat] = updatedMessages;
      setNewMessage("");
    }
  };


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };


  return (
    <div className="chat-page">
      <div className="chat-contacts">
        <div className="chat-contacts-searcher">
          <input type="text" placeholder="Search messages..." className="search-input" />
        </div>
        <div className="chat-contacts-list">
          {contacts.map((contact) => (
            <li
              key={contact.id}
              className={`contact-item ${activeChat === contact.id ? "active" : ""}`}
              onClick={() => setActiveChat(contact.id)}
            >
              <div className="contact-info">
                <img
                  src={`avatar-${contact.id}.jpeg`}
                  alt={`${contact.name}'s Avatar`}
                  className="contact-avatar"
                />
                <div className="contact-text">
                  <p className="contact-name">{contact.name}</p>
                  <p className="contact-last-message">{contact.lastMessage}</p>
                </div>
                {contact.online && <span className="online-indicator"></span>}
              </div>
            </li>
          ))}
        </div>
      </div>


      <div className="chat-messages">
        <div className="chat-header">
          <div className="avatar-container">
            <img
              src={`maria.jpeg`}
              alt="User Avatar"
              className="avatar"
            />
          </div>
          <div className="user-info">
            <h3 className="user-name">{contacts.find((contact) => contact.id === activeChat)?.name}</h3>
            <span className="user-status">
              {contacts.find((contact) => contact.id === activeChat)?.online ? "Online" : "Last seen recently"}
            </span>
          </div>
        </div>

        <div className="messages-container" ref={messagesContainerRef}>
          {messages[activeChat]?.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === "me" ? "sent" : "received"}`}
            >
              <p>{msg.text}</p>
              <span className="message-time">{msg.time}</span>
            </div>
          ))}
        </div>


        <div className="message-input-container">
          <input
            type="text"
            placeholder="Type something..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSendMessage}>
            <img src={`icon_send.png`} className="icon-send" alt="Send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chats;
