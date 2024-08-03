import React from 'react'
import IMG1 from "../img/all-the-worlds-a-stage.jpg";
import IMG2 from "../img/enjoying-the-mundane.jpg";
import IMG1a from "../img/soo.jpg";
import IMG2a from "../img/carlowe.jpg";
import {Link} from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";

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

/*
* ,
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
* */

const Single = () => {
  return (
    <div className="single">
      {Posts.map(post=>(
          <div className="post" key={post.id}>
            <div className="title">
              <h1>{post.title}</h1>
            </div>
            <div className="image">
              <img src={post.img} alt="Image"/>
            </div>
            <div className="content">
              <p>{post.content}</p>
            </div>
            <div className="image">
              <img src={post.img2} alt="Second Image"/>
            </div>
            <div className="bottom">
              <Link className="link" to={`/post/${post.id - 1}`}>
                <h2>PREVIOUS</h2>
              </Link>
              <div className="edit">
                <Link to={`/write?edit=${post.id}`}>
                  <FaRegEdit style={{color: "#FA5537", fontSize: "40px"}}/>
                </Link>
              </div>
              <Link className="link" to={`/post/${post.id + 1}`}>
                <h2>NEXT</h2>
              </Link>
            </div>
          </div>
      ))}
    </div>
  )
}

export default Single