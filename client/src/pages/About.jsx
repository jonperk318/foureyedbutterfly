import React, { useState, useEffect } from 'react'
import HalfMoonBay from "../img/half-moon-bay.jpg"
import BioPic from "../img/bio-pic.jpg"
import Quote from "../img/quote.png"
import Fish from "../img/fish.jpeg"
import axios from 'axios';
import DOMPurify from "dompurify";

const About = () => {

    const [post, setPost] = useState({});
    const postID = 1;

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get(`/api/posts/${postID}`);
            setPost(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        fetchData();
    }, [postID]);

    const images = ("" + post.img).split(", ");
    const content = ("" + post.content).split("<p><br></p><p><br></p>");

    const segments = [];
    let count = 0;
    const maxLength = Math.max(images.length, content.length);

    for (let i = 0; i < maxLength; i++) {
        segments.push(
        <React.Fragment key={i}>
        {content[i] && (
            <div className="content">
            <p dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(content[i]),
            }}></p>
            </div>
        )}
        {images[i + 1] && (
            <div className="image">
                <img src={new URL(`../img/${images[i + 1]}`, import.meta.url).href} alt="image" />
            </div>
        )}
        </React.Fragment>
        )
    }

    return (
        <div className="about">
            <div className="half-moon-bay">
                <img src={HalfMoonBay} alt="Half Moon Bay" />
            </div>
            <div className="about-container">
                <img src={Fish} alt="Fish" />
                <img src={Quote} alt="Quote" />
                <img src={BioPic} alt="Bio Pic" />
            </div>
            <div className="post" key={post.pid}>
                <div className="title">
                    <h1>{post.title}</h1>
                </div>
                <div className="image">
                    <img src={new URL(`../img/${images[0]}`, import.meta.url).href} alt="image" />
                </div>
                <div>{segments}</div>
            </div>
        </div>
    )
}

export default About