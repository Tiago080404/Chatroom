import { useEffect, useRef, useState } from 'react'
import './App.css'
import ChatList from './components/ChatsList'
import Input from './components/Input'
import Chat from "./components/Chat"
function App() {
  const [room, setCurrentRoom]=useState<string>('');
  const [roomIndex,setRoomIndex] = useState<number>(0);
  const [messages, setMessages] = useState<{username:string;message:string}[]>([])
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(()=>{
    const socket = new WebSocket("ws://localhost:8080")
    socketRef.current = socket;

    socket.onopen = ()=>{
      console.log("Websocket connected")
      socket.send(JSON.stringify({/* msg:"hey",username:"tiago" */room:roomIndex}))
    }

    socket.onmessage=(event)=>{
       const data = JSON.parse(event.data);
      console.log("Received:", data);
      setMessages(prev=>[...prev, {username:data.username,message:data.msg}])
    }
  },[]);

  const handleSendMessage = (username:string,message:string)=>{

    if(socketRef.current?.readyState===WebSocket.OPEN){
      socketRef.current.send(JSON.stringify({msg:message,username,room:roomIndex}))
    }
  }



  const handleChildData = (data: string,index:number) => {
    setCurrentRoom(data);
    setRoomIndex(index)
  };
  return <div>
    <div className='welcome-box'>
      <h1 className='welcome-msg'>You are Chatting in Room: {room}</h1>
    </div>
    <div className='message-container-wrapper'>
          <Chat messages={messages}></Chat>
    </div>
    <Input onSendMessage={handleSendMessage} ></Input>
  <ChatList sendRoomToParent={handleChildData} ></ChatList>
  </div>
}

export default App
