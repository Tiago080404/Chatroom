import { useState } from "react";
import "./Input.css"

type InputProps = {
  onSendMessage: (username: string, message: string) => void;
};function Input({onSendMessage}:InputProps){
    const [nameInput,setNameInput]=useState<string>("")
    const[messageInput,setMessageInput] = useState<string>("")

    function handleChangeName(event: React.ChangeEvent<HTMLInputElement>){
        setNameInput(event.target.value)
    }

    function handleChangeMessage(event: React.ChangeEvent<HTMLInputElement>){
        setMessageInput(event.target.value)
    }

    function submitMessage(){
        onSendMessage("tiago",messageInput)
        setMessageInput("")
    }
    

    return <>
    <div className="message-input-container">
      <input type="text" className="message-input-field" placeholder="Your Message..." onChange={handleChangeMessage} value={messageInput} ></input>
        <button className="send-btn" onClick={submitMessage}>⮞</button>
    </div>
    <p>{nameInput}</p>
    </>
}

export default Input