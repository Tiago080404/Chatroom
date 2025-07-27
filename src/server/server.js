import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });
let clientIdCounter = 0;
let rooms = {}; // { roomName: Set of usersIds }
const users = {}; // { clientId: { ws, room } }
wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  clientIdCounter++
  const userId = clientIdCounter
  users[userId] = {ws,room:null}
  //console.log(users)


  ws.on("message", function message(data, isBinary) {
   const {msg,username,room}=JSON.parse(data)

   users[userId].room = room

    if(!rooms[room]){
      rooms[room] = new Set()

    }
    rooms[room].add(userId)
    console.log(rooms)

     rooms[room].forEach((id) => {
      if (id !== userId) {
        if (users[id].ws.readyState === WebSocket.OPEN) {
          users[id].ws.send(data, { binary: isBinary });
        }
      }
    });

  });
});
/* wss.clients.forEach(function each(client) {
  if (client !== ws && client.readyState === WebSocket.OPEN) {
    client.send(data, { binary: isBinary });
  }
}); */
