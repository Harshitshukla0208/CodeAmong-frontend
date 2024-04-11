import React, { useState } from 'react'
import io from 'socket.io-client'

const socket = io.connect("http://localhost:3001")

const Chats = () => {

    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");

    const joinRoom = () => {
        if(username !== "" && room !== ""){
            socket.emit("join_room", room); //inside room it is sending the room id
        }
    }

    const sendMessage = () => {
        socket.emit()
    }
    return (
        <div>
            <h3>Join A Chat</h3>
            <input type="text" placeholder='UserName..' onChange={(e) => {setUsername(e.target.value)}}/>
            <input type="text" placeholder='Room Id..' onChange={(e) => {setRoom(e.target.value)}}/>
            <button onClick={joinRoom}>Send Message</button>
        </div>
    )
}

export default Chats
