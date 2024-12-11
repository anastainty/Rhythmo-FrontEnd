import React, { useState, useRef, useEffect } from "react";
import "./Chats.scss";

const contacts = [
  { id: 1, name: "Maria Smirnova", lastMessage: "You: Guf - Ice Baby", online: true },
  { id: 2, name: "Julia", lastMessage: "Thank you so mush, hope so", online: false },
  { id: 3, name: "Ralph Edwards", lastMessage: "I will text you later", online: false },
  { id: 4, name: "Rhythmo", lastMessage: "New options are added!", online: false },
];

const initialMessages = {
  1: [
    { text: "Oh, Ira, did you see? We have a new Karaoke Mode! 😍 I just sang my favorite BTS song", sender: "Maria", time: "1:22 PM" },
    { text: "Машка, ты чего на инглише базаришь, я не поняла", sender: "me", time: "1:23 PM" },
    { text: "You can play any song, and the lyrics pop up, just like in real karaoke. It even highlights the lines as you sing along. It’s amazing!", sender: "Maria", time: "1:29 PM" },
    { text: "Cant wait!! 😉🎤✨", sender: "me", time: "1:33 PM" },
  ],
  4: [],
};

const Chats = () => {
  const [activeChat, setActiveChat] = useState(1); // ID текущего открытого чата
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(initialMessages);

  const chatSocket = useRef(null);
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

  useEffect(() => {
    if (activeChat === 4) {
      chatSocket.current = new WebSocket("ws://localhost:8001/ws/chat/");

      chatSocket.current.onmessage = (event) => {
        const data = JSON.parse(event.data);

        setMessages((prevMessages) => ({
          ...prevMessages,
          4: [
            ...prevMessages[4],
            { text: data.message,
              sender: "rhythmo",
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), },
          ],
        }));
      };

      chatSocket.current.onclose = () => {
        console.error("Chat WebSocket closed unexpectedly.");
      };

      return () => {
        if (chatSocket.current) {
          chatSocket.current.close();
        }
      };
    }
  }, [activeChat]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const currentTime = new Date().toLocaleTimeString();

      setMessages((prevMessages) => ({
        ...prevMessages,
        [activeChat]: [
          ...prevMessages[activeChat],
          { text: newMessage, sender: "me", time: currentTime },
        ],
      }));

      if (activeChat === 4 && chatSocket.current) {
        chatSocket.current.send(JSON.stringify({ message: newMessage }));
      }

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
              src={`avatar-${contacts.find((contact) => contact.id === activeChat)?.id}.jpeg`}
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
