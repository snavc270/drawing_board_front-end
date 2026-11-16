import { useEffect, useState } from "react";
import { socket } from "./socket";
import Toolbar from "./Toolbar";
import Canvas from "./Canvas";

export default function App() {
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(4);
  const [tool, setTool] = useState("pen");
  const [userCount, setUserCount] = useState(1); 

  // The server sends "clear" back to everyone, including us
  const handleClear = () => socket.emit("clear");

  useEffect(() =>{
    //client telling our server we've joined 
    socket.on('users', setUserCount); 
    //checking with the server to see if others have joined
    socket.emit("getUsers"); 
    //handle when I disconnect from server 
    return () => socket.on('users', setUserCount); 
  }, []); 

  return (
    <main>
      <h1>Shared Drawing Board</h1>
      <p>Online: {userCount}</p>
      <Toolbar
        color={color}
        setColor={setColor}
        size={size}
        setSize={setSize}
        onClear={handleClear}
        tool={tool}
        setTool={setTool}
      />
      <Canvas tool={tool} color={color} size={size} />
    </main>
  );
}
