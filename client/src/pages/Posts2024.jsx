import React from "react";
import {Link} from 'react-router-dom'
import IMG1 from "../img/all-the-worlds-a-stage.jpg"
import IMG2 from "../img/enjoying-the-mundane.jpg"
import IMG1a from "../img/soo.jpg"
import IMG2a from "../img/carlowe.jpg"

const Posts = [
    {
        id: 2,
        title: "All the World's a Stage",
        date: "2/11/24",
        img: IMG1,
        content: "Offline by Alex Kozobolis\n" +
            "\n" +
            "I think ambition can be something of an impacted tooth. It grows with small movements underneath the disguise of having more time and then suddenly, without your expectation, you are under amnesia soon to be washing blood and throw-up out of your gum holes.",
        endImg: IMG1a
    },
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
        endImg: IMG2a
    }
]

const Posts2024 = () => {

    return (
        <div className="posts">
            {Posts.map(post=>(
                <div className="post" key={post.id}>
                    <div className="image">
                        <Link className="link" to={`/post/${post.id}`}>
                            <img src={post.img} alt="Image"/>
                        </Link>
                    </div>
                    <div className="content">
                        <Link className="link" to={`/post/${post.id}`}>
                            <h1>{post.title}</h1>
                            <p>{post.date}</p>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Posts2024;