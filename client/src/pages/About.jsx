import React from 'react'
import HalfMoonBay from "../img/half-moon-bay.jpg"
import BioPic from "../img/bio-pic.jpg"
import Quote from "../img/quote.png"
import Fish from "../img/fish.jpeg"

const About = () => {
    return (
        <div className="about">
            <div className="half-moon-bay">
                <img src={HalfMoonBay} alt="Half Moon Bay" />
            </div>
            <div className="about-container">
                <img src={BioPic} alt="Bio Pic" />
                <img src={Quote} alt="Quote" />
                <img src={Fish} alt="Fish" />
            </div>
        </div>
    )
}

export default About