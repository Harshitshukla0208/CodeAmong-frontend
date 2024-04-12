import React, { useState } from 'react'
import io from 'socket.io-client'
import Chats from './Chats';
import './css/SocketConnection.css'

const socket = io.connect("http://localhost:3001")

const Connections = () => {

    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false)

    const joinRoom = () => {
        if(username !== "" && room !== ""){
            socket.emit("join_room", room); //inside room it is sending the room id
            setShowChat(true);
        }
    }

    return (
        <div className='App'>
            {!showChat ?(
                    <div className="joinChatContainer">
                        <h3>Join A Chat</h3>
                        <input type="text" placeholder='UserName..' onChange={(e) => {setUsername(e.target.value)}}/>
                        <input type="text" placeholder='Room Id..' onChange={(e) => {setRoom(e.target.value)}}/>
                        <button onClick={joinRoom}>Join A Room</button>
                    </div>
                ) :(
                    <Chats socket={socket} username={username} room={room} />
                )
            }
        </div>
    )
}

export default Connections;
