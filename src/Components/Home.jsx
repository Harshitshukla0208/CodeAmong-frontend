import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {v4 as uuidv4, validate} from 'uuid';
import {Toaster, toast} from 'react-hot-toast';
import logo from '../assets/logo.svg'
import { Flex } from '@chakra-ui/react'
import './Home.css'
import githubLogo from '../assets/github-logo.png'; 
import linkedinLogo from '../assets/linkedin-logo.png'; 

const Home = () => {

    const navigate = useNavigate();
    const [roomId, setRoomId] = useState("")
    const [username, setUsername] = useState("")

    function handleRoomSubmit(e){
        e.preventDefault()
        if(!validate(roomId)){
            toast.error("Incorrect room ID");
            return
        }
        username && navigate(`/room/${roomId}`, {state: {username}})
    }

    function createRoomId(e){
        try {
            setRoomId(uuidv4())
        } catch (error) {
            console.log("error occured in generation of room id")
        }
    }

    return (
        <div className='joinBoxWrapper'>
            <div className='title-logo'>
                <img src={logo} alt="Logo" className="title-img" />
                <h1>CodeAmong</h1>
            </div>
            <form className='joinBox' onSubmit={handleRoomSubmit}>
                <p>Paste you invitation code down below</p>
                <div className="joinBoxInputWrapper">
                    <input 
                        className='joinBoxInput'
                        type='text'
                        placeholder='Enter room ID'
                        required
                        onChange={(e) => {setRoomId(e.target.value)}}
                        value={roomId}
                    />
                </div>
                <div className="joinBoxInputWrapper">
                    <input
                        className="joinBoxInput"
                        type="text"
                        placeholder="Enter Guest Username"
                        required
                        value={username}
                        onChange={e => { setUsername(e.target.value) }}
                    />
                </div>
                <button className='joinBoxBtn'>Join</button>
                <p>Don't have an invite code?</p>
                <p className='createown'> Create your <span
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                    onClick={createRoomId}
                >own room</span></p>
            </form>
            <p className='footer'>Created by: Harshit Shukla</p>
            <Flex mt={3}>
                <a href="https://github.com/Harshitshukla0208/Codelogs" target="_blank" rel="noopener noreferrer">
                    <img src={githubLogo} alt="GitHub Logo" width="30" height="30" style={{ marginRight: '10px' }} />
                </a>
                <a href="https://www.linkedin.com/in/harshit-shukla-9a5950239/" target="_blank" rel="noopener noreferrer">
                    <img src={linkedinLogo} alt="LinkedIn Logo" width="30" height="30" />
                </a>
            </Flex>
            <Toaster />
        </div>
    )
}

export default Home
