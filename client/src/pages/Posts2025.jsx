import React, {useState} from "react";
import {Link} from 'react-router-dom'
import {useEffect} from "react";
import axios from "axios";

const Posts2025 = () => {

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

    function findFile(post) {
        const extension = (post.img).split(", ")[0].split(".").pop;
        if (extension === "mov" || extension === "mp4") {
            return "video"
        }
        else return "image"
    }

    return (
        <div className="posts">
            {Posts && Posts.toReversed().map(post => (
                <div className="post" key={post.pid}>
                    <div className="image">
                        <Link className="link" to={`/post/${post.pid}`}>
                            {findFile(post) === "video" ? (
                                <video contols="controls loop" alt="video">
                                    <source src={new URL(`../img/${("" + post.img).split(", ")[0]}`, import.meta.url).href} type="video" />
                                </video>
                            ) : (
                                <img src={new URL(`../img/${("" + post.img).split(", ")[0]}`, import.meta.url).href} alt="image"/>
                            )}
                        </Link>
                    </div>
                    <div className="content">
                        <Link className="link" to={`/post/${post.pid}`}>
                            <h1>{post.title}</h1>
                            <p>{(new Intl.DateTimeFormat('en-US').format(new Date(post.date)))}</p>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Posts2025;
