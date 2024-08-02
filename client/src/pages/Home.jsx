import React from 'react'
import Flowers from "../img/flowers.png"

const Home = () => {
  return (
    <div className="home">
        <div className="title-container">
            <h1><span className="first-letter">B</span>ASHFUL</h1>
            <h2>-ruby m.</h2>
        </div>
        <div className="flowers">
            <img src={Flowers} alt="Flowers" />
        </div>
    </div>
  )
}

export default Home