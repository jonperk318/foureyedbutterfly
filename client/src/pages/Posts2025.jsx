import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

import { AuthContext } from "@/context/authContext.jsx";

const Posts2025 = () => {
  const [Posts, setPosts] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/posts");
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="posts">
      {Posts && Posts.filter((post) => !(Boolean(post.draft) && !currentUser))
      .toReversed().map((post) => (
        <div className="post" key={post.pid}>
          <div className="image">
            <Link className="link" to={`/post/${post.pid}`}>
              {post.img.split(", ")[0].split(".").pop ===
              ("mov" || "mp4") ? (
                <video
                  contols="controls loop"
                  alt="video"
                  className={Boolean(post.draft) ? "draft" : ""}
                >
                  <source
                    src={
                      new URL(
                        `../../../api/assets/${("" + post.img).split(", ")[0]}`,
                        import.meta.url,
                      ).href
                    }
                    type="video"
                  />
                </video>
              ) : (
                <img
                  className={Boolean(post.draft) ? "draft" : ""}
                  src={
                    new URL(
                      `../../../api/assets/${("" + post.img).split(", ")[0]}`,
                      import.meta.url,
                    ).href
                  }
                  alt="image"
                />
              )}
            </Link>
          </div>
          <div className="content">
            <Link className="link" to={`/post/${post.pid}`}>
              <h1>
                {post.title +
                  (Boolean(post.draft) ? " ***DRAFT***" : "")}
              </h1>
              <p>
                {new Intl.DateTimeFormat("en-US").format(
                  new Date(post.date),
                )}
              </p>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts2025;
