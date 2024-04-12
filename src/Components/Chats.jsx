import React, { useEffect, useState } from 'react'
import ScrollToBottom from "react-scroll-to-bottom";

function Chats({socket, username, room}){
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setmessageList] = useState([]);

    const sendMessage = async() => {
        if(currentMessage !==""){
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            await socket.emit("send_message", messageData);
            setmessageList((list) => [...list, messageData]); //by this user can see his own message
            setCurrentMessage("");
        }
    }

    useEffect(() => {
            socket.off("receive_message").on("receive_message", (data) => {
                setmessageList((list) => [...list, data]);
            });
        }, [socket]);
    return (
        <div className='chat-window'>
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {messageList.map((messageContent) => {
                        return <div className={`message ${username === messageContent.author ? "you" : "other"}`}>
                            <div>
                                <div className="message-content">
                                    <p>{messageContent.message}</p>
                                </div>
                                <div className="message-meta">
                                    <p className='time'>{messageContent.time}</p>
                                    <p className='author'>{messageContent.author}</p>
                                </div>
                            </div>
                        </div>
                    })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input type="text" placeholder='Hey...' onChange={(e)=>{setCurrentMessage(e.target.value)}} onKeyPress={(event) => {event.key === "Enter" && sendMessage()}} value={currentMessage} />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default Chats

