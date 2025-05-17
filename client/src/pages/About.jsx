import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const content = ("" + post.content).split("|||");

  const segments = [];
  const maxLength = Math.max(images.length, content.length);

  for (let i = 0; i < maxLength; i++) {
    segments.push(
      <React.Fragment key={i}>
        {content[i] && (
          <div className="content">
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(content[i]),
              }}
            ></p>
          </div>
        )}
        {images[i + 1] && (
          <div className="image">
            <img
              src={new URL(`../assets/${images[i + 1]}`, import.meta.url).href}
              alt="image"
            />
          </div>
        )}
      </React.Fragment>,
    );
  }

  return (
    <div className="about">
      <div className="half-moon-bay">
        <img src="https://res.cloudinary.com/difdjam1a/image/upload/v1744891374/half-moon-bay_lcaz8f.jpg" alt="Half Moon Bay" />
      </div>
      <div className="about-container">
        <img src="https://res.cloudinary.com/difdjam1a/image/upload/v1744891374/fish_fxm2ym.jpg" alt="Fish" />
        <div className="quote">
          <h1>
            "I remembered that the real world was wide, and that a varied field
            of hopes and fears, of sensations and excitements, awaited those who
            had the courage to go fourth into its expanse, to seek real
            knowledge of life amidst its perils."
          </h1>
          <p>&#8212; Jane Eyre</p>
        </div>
        <img src="https://res.cloudinary.com/difdjam1a/image/upload/v1747514256/bio-pic_uo7ynn.jpg" alt="Bio pic" />
      </div>
      <div className="post" key={post.pid}>
        <div className="post-container">
          <div className="title">
            <h1>{post.title}</h1>
          </div>
          <div className="image">
            <img
              src={new URL(`../assets/${images[0]}`, import.meta.url).href}
              alt="image"
            />
          </div>
          <div>{segments}</div>
        </div>
      </div>
    </div>
  );
};

export default About;
