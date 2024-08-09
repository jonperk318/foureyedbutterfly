import React, { useState, useEffect, useContext } from 'react'
import {Link, useLocation} from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { IconContext } from "react-icons";
import { AuthContext } from "../context/authContext.jsx";
import axios from 'axios';

/*
const Posts = [
  {
    id: 2,
    title: "All the World's a Stage",
    date: "2/11/24",
    img: IMG1,
    content: "Offline by Alex Kozobolis\n" +
        "\n" +
        "I think ambition can be something of an impacted tooth. It grows with small movements underneath the disguise of having more time and then suddenly, without your expectation, you are under amnesia soon to be washing blood and throw-up out of your gum holes.",
    img2: IMG1a
  }
]

const Posts = [
  {
    id: 1,
    title: "Enjoying the Mundane",
    date: "2/9/24",
    img: IMG2,
    content: "The Secret Life Of Daydreams by Dario Marianelli \n" +
        "\n" +
        "I’m not a creature of habit and if you say you are, I envy you. \n" +
        "\n" +
        "Of course there has to be some consistency in life, or else you’ll fall off the edge. And then of course, some people like that falling feeling. I am not one of those people either. ",
    img2: IMG2a
  }
  ]

  */


const Single = () => {

  const [post, setPost] = useState({});
  const [nextPost, setNextPost] = useState({});
  const location = useLocation();
  const postID = location.pathname.split("/")[2]; // get ID from URL
  const {currentUser} = useContext(AuthContext);
  
  useEffect(() => {
    const fetchData = async() => {
        try {
            const [res, nextRes] = await Promise.all([
              axios.get(`/api/posts/${postID}`), 
              axios.get(`/api/posts/${postID + 1}`)
            ]);
            setPost(res.data);
            setNextPost(nextRes.data);
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
          {post.id - 1 !== 0 && ( // check if previous post exists
          <Link className="hvr-underline-from-left" to={`/post/${post.id - 1}`}>
            <h2>Previous</h2>
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
          {nextPost && ( // check if next post exists
          <Link className="hvr-underline-from-left" to={`/post/${nextPost.id}`}>
            <h2>Next</h2>
          </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Single