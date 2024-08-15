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
            axios.get(`/api/posts/${(parseInt(postID) - 1).toString()}`), 
            axios.get(`/api/posts/${postID}`), 
            axios.get(`/api/posts/${(parseInt(postID) + 1).toString()}`)
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
          <img src={`../src/img/${images[i + 1]}`} alt="Image" />
        </div>
      )}
      </React.Fragment>
    )
  }

  return (
    <div className="single">
      <div className="post" key={post.pid}>
        <div className="title">
          <h1>{post.title}</h1>
        </div>
        <div className="image">
          <img src={`../src/img/${images[0]}`} alt="Image"/>
        </div>
        <div>{segments}</div>
        <div className="bottom">
          {prevPost && ( // check if previous post exists
          <Link className="hvr-underline-from-left" to={`/post/${prevPost.pid}`}>
            <h2>{prevPost.title}</h2>
          </Link>
          )}
          {currentUser.id === post.uid && (
          <div className="edit">
            <Link to={`/write?edit=${post.pid}`} state={post}>
              <IconContext.Provider value={{className: "icon"}}>
                <FaRegEdit style={{color: "white", fontSize: "40px"}}/>
              </IconContext.Provider>
            </Link>
          </div>
          )}
          {nextPost && ( // check if next post exists
          <Link className="hvr-underline-from-left" to={`/post/${nextPost.pid}`}>
            <h2>{nextPost.title}</h2>
          </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Single