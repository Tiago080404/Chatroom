
type Message={
    username : string
    message: string;
}
type MessageListProps = {
  messages: Message[];
};
import "./Chat.css"
function Chat({messages}:MessageListProps){
    console.log(messages)
    return (
    <div className="message-list-box">
      {messages.map((msg, index) => (
        <p className="messages" key={index}>
          <strong>{msg.username}:</strong> {msg.message}
        </p>
      ))}
    </div>
  );
}
export default Chat