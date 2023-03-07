import './App.css';
import io from "socket.io-client";
import { useState, useEffect } from "react";

const socket = io('http://localhost:4000')

function App() {

  const [message, setMessage] = useState('');
  const [ messages, setMessages] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('message', message);
    const newMessage = {
      body: message,
      from: "Me"
    };
    setMessages([newMessage, ...messages])
    setMessage('');
  };

  useEffect(() => {

    const receviedMessage = message => {
      setMessages([...messages, {
        body: message.body,
        from: message.from
      }])
    }

    socket.on('message', receviedMessage)

    return () => {
      socket.off('message', receviedMessage)
    }
  }, []);

  return (
    <div className="App">
      
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={e => setMessage(e.target.value)} value={message}/>
      <button>Send</button>
    </form>

    {messages.map((message, i) => (
      <div key={i}>
        <p>{message.from}: {message.body}</p>
      </div> 
    ))}
    </div>
  );
}

export default App;
