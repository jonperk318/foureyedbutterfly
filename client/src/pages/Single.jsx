import React, { useState, useEffect, useContext } from 'react'
import {Link, useLocation} from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { IconContext } from "react-icons";
import { AuthContext } from "../context/authContext.jsx";
import axios from 'axios';

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
          /*
          const [prevRes, res, nextRes] = await Promise.allSettled([
            axios.get(`/api/posts/${postID - 1}`),
            axios.get(`/api/posts/${postID}`), 
            axios.get(`/api/posts/${postID + 1}`)
          ]);
          setPrevPost(prevRes.data);
          setPost(res.data);
          setNextPost(nextRes.data);
          */
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

  return (
    <div className="single">
      <div className="post" key={post.id}>
        <div className="title">
          <h1>{post.title}</h1>
        </div>
        <div className="image">
          <img src={`../src/img/${post.img}`} alt="Image"/>
        </div>
        <div className="content">
          <p>{post.content}</p>
        </div>
        {post.img2 && (
        <div className="image">
          <img src={`../src/img/${post.img2}`} alt="Second Image"/>
        </div>
        )}
        {post.content2 && (
        <div className="content">
          <p>{post.content2}</p>
        </div>
        )}
        {post.img3 && (
        <div className="image">
          <img src={`../src/img/${post.img3}`} alt="Third Image"/>
        </div>
        )}
        {post.img4 && (
        <div className="image">
          <img src={`../src/img/${post.img4}`} alt="Fourth Image"/>
        </div>
        )}
        {post.content3 && (
        <div className="content">
          <p>{post.content3}</p>
        </div>
        )}
        <div className="bottom">
          {post.id > 1 && ( // check if previous post exists
          <Link className="hvr-underline-from-left" to={`/post/${post.id - 1}`}>
            <h2>{prevPost.title}</h2>
          </Link>
          )}
          {currentUser.id === post.uid && (
          <div className="edit">
            <Link to={`/write?edit=${post.id}`}>
              <IconContext.Provider value={{className: "icon"}}>
                <FaRegEdit style={{color: "white", fontSize: "40px"}}/>
              </IconContext.Provider>
            </Link>
          </div>
          )}
          {nextPost !== null && ( // check if next post exists
          <Link className="hvr-underline-from-left" to={`/post/${nextPost.id}`}>
            <h2>{nextPost.title}</h2>
          </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Single