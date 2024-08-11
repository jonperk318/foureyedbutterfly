import React, {useState} from "react";
import {Link} from 'react-router-dom'
import { useEffect } from "react";
import axios from "axios";

const Posts2024 = () => {

    const [Posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const res = await axios.get("/api/posts");
                setPosts(res.data);
            } catch(err) {
                console.log(err);
            }
        };
        fetchData();
    });

    return (
        <div className="posts">
            {Posts.map(post => (
                <div className="post" key={post.id}>
                    <div className="image">
                        <Link className="link" to={`/post/${post.id}`}>
                            <img src={`../src/img/${("" + post.img).split(", ")[0]}`} alt="Image"/>
                        </Link>
                    </div>
                    <div className="content">
                        <Link className="link" to={`/post/${post.id}`}>
                            <h1>{post.title}</h1>
                            <p>{(new Intl.DateTimeFormat('en-US').format(new Date(post.date)))}</p>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Posts2024;