import React from 'react'
import Flowers from "../img/flowers.png"

const Home = () => {
  return (
    <div className="home">
        <div className="title-container">
            <h1>BASHFUL</h1>
            <h2>-ruby m.</h2>
        </div>
        <div className="flowers">
            <img src={Flowers} alt="flowers logo" />
        </div>
    </div>
  )
}

export default Home