import React from "react";
import {Link} from 'react-router-dom'
import IMG1 from "../img/all-the-worlds-a-stage.jpg"
import IMG2 from "../img/enjoying-the-mundane.jpg"

const Posts2024 = () => {

    const Posts = [
        {
            id: 2,
            title: "All the World's a Stage",
            date: "2/11/24",
            img: IMG1
        },
        {
            id: 1,
            title: "Enjoying the Mundane",
            date: "2/9/24",
            img: IMG2
        }
    ]

    return (
        <div className="posts">
            {Posts.map(post=>(
                <div className="post" key={post.id}>
                    <div className="image">
                        <Link className="link" to={`/post/${post.id}`}>
                            <img src={post.img} alt=""/>
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