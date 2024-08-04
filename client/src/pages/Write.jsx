import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Write = () => {

    const [value, setValue] = useState('');
    console.log(value);

  return (
    <div className="write-post">
        <div className="write-container">
          <div className="content">
              <input type="text" placeholder="Title" />
              <div className="editor-container">
                  <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
              </div>
          </div>
          <div className="menu">
              <div className="item">
                  <h1>Publish</h1>
                  <span>
                    <b>Status: </b> Draft
                </span>
                  <span>
                    <b>Visibility: </b> Public
                </span>
                  <input style={{display:"none"}} type="file" id="file" name="" />
                  <label htmlFor="file">Upload Image or Video</label>
                  <div className="buttons">
                      <button>Save as a draft</button>
                      <button>Update</button>
                  </div>
              </div>
          </div>
        </div>
    </div>
  )
}

export default Write