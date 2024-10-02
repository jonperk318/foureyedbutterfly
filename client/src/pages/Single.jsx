import React, { useState, useEffect, useContext } from 'react'
import {Link, useLocation} from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { IconContext } from "react-icons";
import { AuthContext } from "../context/authContext.jsx";
import axios from 'axios';
import DOMPurify from "dompurify";

const Single = () => {

  const [prevPost, setPrevPost] = useState({});
  const [post, setPost] = useState({});
  const [nextPost, setNextPost] = useState({});
  const location = useLocation();
  const postID = location.pathname.split("/")[2]; // get ID from URL
  const {currentUser} = useContext(AuthContext);
  
  useEffect(() => {
    const fetchData = async() => {
        try {
          axios.all([
            axios.get(`/api/posts/prev/${postID}`), 
            axios.get(`/api/posts/${postID}`), 
            axios.get(`/api/posts/next/${postID}`)
          ])
          .then(axios.spread((prevRes, res, nextRes) => {
            setPrevPost(prevRes.data);
            setPost(res.data);
            setNextPost(nextRes.data);
          }));
        } catch(err) {
          console.log(err);
        }
    };
    fetchData();
  }, [postID]);

  function findFile(file) {
    const extension = file.split(".").pop();
    if (extension === "mov" || extension === "mp4") {
        return "video"
    }
    else return "image"
  }

  const images = ("" + post.img).split(", ");
  const content = ("" + post.content).split("|||");

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
          {findFile(images[i + 1]) === "video" ? (
            <video controls="controls autoplay loop" alt="video">
              <source src={new URL(`../img/${images[i + 1]}`, import.meta.url).href} type="video" />
            </video>
          ) : (
            <img src={new URL(`../img/${images[i + 1]}`, import.meta.url).href} alt="image" />
          )}
        </div>
      )}
      </React.Fragment>
    )
  }

  return (
    <div className="single">
      <div className="post" key={post.pid}>
        <div className='post-container'>
          <div className="title">
            <h1>{post.title}</h1>
          </div>
          <div className="image">
            {findFile(images[0]) === "video" ? (
                <video controls="autoplay" alt="video">
                  <source src={new URL(`../img/${images[0]}`, import.meta.url).href} type="video" />
                </video>
              ) : (
                <img src={new URL(`../img/${images[0]}`, import.meta.url).href} alt="image" />
              )}
          </div>
          <div>{segments}</div>
          <div className="bottom">
            {nextPost && ( // check if next post exists
              <Link className="hvr-underline-from-left" to={`/post/${nextPost.pid}`}>
                <h2>{nextPost.title}</h2>
              </Link>
            )}
            {currentUser && currentUser.id === post.uid && (
              <div className="edit">
                <IconContext.Provider value={{ className: "icon" }}>
                  <Link to={`/write?edit=${post.pid}`} state={post}>
                    <FaRegEdit style={{ color: "white", fontSize: "40px" }} />
                  </Link>
                </IconContext.Provider>
              </div>
            )}
            {prevPost && ( // check if previous post exists
              <Link className="hvr-underline-from-left" to={`/post/${prevPost.pid}`}>
                <h2>{prevPost.title}</h2>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Single
