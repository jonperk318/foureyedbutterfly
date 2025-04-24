import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuill } from "react-quilljs-vite-fix";
import "quill/dist/quill.snow.css";
import axios from "axios";
import dayjs from "dayjs";
import Quill from "quill";

import { errorUtils } from "@/utils/errorUtils";

const Write = () => {
  const state = useLocation().state;
  const navigate = useNavigate();
  const { quill, quillRef } = useQuill();
  const [title, setTitle] = useState(state?.title || "");
  const [content, setContent] = useState(state?.content || "");
  const [oldFiles, setOldFiles] = useState(state?.img || null);
  const [files, setFiles] = useState(null);
  const [fileLimit, setFileLimit] = useState(false);
    const [publishDisabled, setPublishDisabled] = useState(false);

  React.useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(content);
      quill.on(Quill.events.TEXT_CHANGE, (delta, oldDelta, source) => {
        setContent(quill.root.innerHTML);
      });
    }
  }, [quill]);

  const upload = async () => {
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });
      const res = await axios.post("/api/upload", formData);
      return res.data;
    } catch (err) {
      console.log(errorUtils.getError(err));
    }
  };

  const handlePublish = async (e) => {

    e.preventDefault();
      setPublishDisabled(true);

    if (files) {
      const imgUrl = await upload();
      try {
        state
          ? await axios.put(`/api/posts/${state.pid}`, {
              title,
              content: content,
              img: imgUrl,
              oldFiles: oldFiles,
            })
          : await axios.post(`/api/posts/`, {
              title,
              content: content,
              img: imgUrl,
              date: dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            });
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        state
          ? await axios.put(`/api/posts/${state.pid}`, {
              title,
              content: content,
            })
          : await axios.post(`/api/posts/`, {
              title,
              content: content,
              date: dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            });
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
    setPublishDisabled(false);
  };

  const handleUploadFiles = (files) => {
    const uploaded = [...files];
    let limitExceeded = false;
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded.length === MAX_COUNT) setFileLimit(true);
        if (uploaded.length > MAX_COUNT) {
          alert(`You can only add a maximum of ${MAX_COUNT} files`);
          setFileLimit(false);
          limitExceeded = true;
          return true;
        }
      }
    });
    if (!limitExceeded) setFiles(uploaded);
  };

  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
    setFiles(chosenFiles);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts/${state.pid}`);
      navigate("/");
    } catch (err) {
      console.log(errorUtils.getError(err));
    }
  };

  let count = 0;
  let deleteButton = document.getElementById("deleteButton");

  if (deleteButton) {
    deleteButton.addEventListener("click", function () {
      count++;
      if (count === 1) {
        deleteButton.innerHTML = "Are you sure?";
        deleteButton.className = "orange";
      } else if (count === 2) {
        deleteButton.innerHTML = "LAST CHANCE!";
        deleteButton.className = "red";
      } else {
        handleDelete();
      }
    });
  }

  return (
    <div className="write-post">
      <div className="upload-container">
        <h1>Pictures & Videos</h1>
        <div className="uploads">
          <ol>
            {files
              ? files.map(
                  (
                    file, // display names of uploaded files on page
                  ) => <li key={file.name}>{file.name}</li>,
                )
              : oldFiles &&
                oldFiles
                  .split(", ")
                  .map((oldFile) => (
                    <li key={oldFile}>{oldFile.replace(/\d{13}/, "")}</li>
                  ))}
          </ol>
        </div>
      </div>
      <div className="write-container">
        <div className="content">
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <div className="editor-container">
            <div ref={quillRef} className="editor" />
          </div>
        </div>
        <div className="menu">
          <div className="instructions">
            <h1>Separate text field submissions by 3 pipes |||</h1>
            <h1>The layout alternates between images and text entries</h1>
            <h1>Publishing new files will completely replace old ones</h1>
          </div>
          <div className="upload-buttons">
            <input
              style={{ display: "none" }}
              type="file"
              multiple
              id="file"
              name="file"
              accept="image/jpeg,image/png"
              onChange={handleFileEvent}
            />
            <label className="brown" htmlFor="file">
              Select Pictures & Videos
            </label>
            {oldFiles && (
              <label className="brown" id="deleteButton">
                Delete Post
              </label>
            )}
          </div>
          <div className="save-buttons">
            {oldFiles ? (
              <button onClick={handlePublish}>Update</button>
            ) : (
              <button onClick={handlePublish} disabled={publishDisabled}>
                Publish
            </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
