import React, { useState, useEffect } from "react";
import axios from "axios";
import DOMPurify from "dompurify";

import CldImage from "@/components/CldImage";

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
        <CldImage publicId={"half-moon-bay_lcaz8f"} />
      </div>
      <div className="about-container">
        <CldImage publicId={"fish_fxm2ym"} />
        <div className="quote">
          <h1>
            "I remembered that the real world was wide, and that a varied field
            of hopes and fears, of sensations and excitements, awaited those who
            had the courage to go fourth into its expanse, to seek real
            knowledge of life amidst its perils."
          </h1>
          <p>&#8212; Jane Eyre</p>
        </div>
        <CldImage publicId={"bio-pic_nc7e9l"} />
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
