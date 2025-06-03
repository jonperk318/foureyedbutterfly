import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { IconContext } from "react-icons";
import axios from "axios";
import DOMPurify from "dompurify";

import { AuthContext } from "@/context/authContext.jsx";

const Single = () => {
  const [prevPost, setPrevPost] = useState({});
  const [post, setPost] = useState({});
  const [nextPost, setNextPost] = useState({});
  const location = useLocation();
  const postID = location.pathname.split("/")[2]; // get ID from URL
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.get(`/api/posts/${postID}`)
        .then(res => {
          res.data.forEach((post => {
            post.pid === (Number(postID) - 1)
              ? setPrevPost(post)
            : post.pid === Number(postID)
              ? setPost(post)
            : post.pid === (Number(postID) + 1)
              ? setNextPost(post)
            : None;
          }))
        })
      } catch(err) {
          console.log(err);
        };
      };
    fetchData();
  }, [postID]);

  function findFile(file) {
    const extension = file.split(".").pop();
    if (extension === "mov" || extension === "mp4") {
      return "video";
    } else return "image";
  }

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
            {findFile(images[i + 1]) === "video" ? (
              <video controls="controls autoplay loop" alt="video">
                <source
                  src={
                    new URL(`../../../api/assets/${images[i + 1]}`, import.meta.url).href
                  }
                  type="video"
                />
              </video>
            ) : (
              <img
                src={
                  new URL(`../../../api/assets/${images[i + 1]}`, import.meta.url).href
                }
                alt="image"
              />
            )}
          </div>
        )}
      </React.Fragment>,
    );
  }

  return (
    <div className="single">
      <div className="post" key={post.pid}>
        <div className="post-container">
          <div className="title">
            <h1>{post.title}</h1>
            {Boolean(post.draft) && <h2>***DRAFT***</h2>}
          </div>
          <div className="image">
            {findFile(images[0]) === "video" ? (
              <video controls="autoplay" alt="video">
                <source
                  src={new URL(`../../../api/assets/${images[0]}`, import.meta.url).href}
                  type="video"
                />
              </video>
            ) : (
              <img
                src={new URL(`../../../api/assets/${images[0]}`, import.meta.url).href}
                alt="image"
              />
            )}
          </div>
          <div>{segments}</div>
          <div className="bottom">
            {prevPost && ( // check if previous post exists
              <Link
                to={`/post/${prevPost.pid}`}
                onClick="window.scroll(0, 0);"
              >
                <h2 className="underline">{prevPost.title}</h2>
              </Link>
            )}
            {currentUser && currentUser.uid === post.uid && (
              <div className="edit">
                <IconContext.Provider value={{ className: "icon" }}>
                  <Link to={`/write?edit=${post.pid}`} state={post}>
                    <FaRegEdit style={{ color: "#fa5537", fontSize: "40px" }} />
                  </Link>
                </IconContext.Provider>
              </div>
            )}
            {nextPost && ( // check if next post exists
              <Link
                to={`/post/${nextPost.pid}`}
                onClick="window.scroll(0, 0);"
              >
                <h2 className="underline">{nextPost.title}</h2>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
