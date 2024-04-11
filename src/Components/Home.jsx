import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <h1>Welcome to CodeAmong !!</h1>
            <hr />
            <Link to='/editor'><button>Try Now...</button></Link>
        </div>
    )
}

export default Home
