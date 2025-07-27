import { useState } from "react";
import "./ChatList.css"
type ChatListProps = {
  sendRoomToParent: (roomName: string,roomNumber: number) => void;
};

function ChatList({ sendRoomToParent }: ChatListProps){
    const [room,setRoom] = useState(0)
    const [selectedItem,setSelectedItem] = useState(0)
   const chatRooms: string[]= ["General", "Support", "Gaming"];

   function switchRoom(index:number){
    setSelectedItem(index)
    setRoom(index);
    const currentRoom = chatRooms[index]
    sendRoomToParent(currentRoom,index)
   }


    return <>
    <div className="chat-list-box"> 
        <ul className="chat-list">
          {chatRooms.map((roomName,index)=>
            <li key={index} className={`list-items ${selectedItem===index ? "selected" : ""}`} onClick={() => switchRoom(index)}>{roomName}</li>
          )}
        </ul>
    </div>
    </>
}
export default ChatList