import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Write = () => {

    const [value, setValue] = useState('');
    console.log(value);

  return (
    <div className="write-post">
        <div className="upload-container">
            <h1>Content Layout</h1>
            <div className="uploads"></div>
        </div>
        <div className="write-container">
          <div className="content">
              <input type="text" placeholder="Title" />
              <div className="editor-container">
                  <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
              </div>
          </div>
          <div className="menu">
              <h1>Publish</h1>
              <div className="spans">
                  <span>
                    <b>Status: </b> Draft
                  </span>
                  <span>
                    <b>Visibility: </b> Public
                  </span>
              </div>
              <div className="upload-buttons">
                  <label>Submit Text</label>
                  <input style={{display: "none"}} type="file" id="file" name=""/>
                  <label htmlFor="file">Upload Image or Video</label>
              </div>
              <div className="save-buttons">
                  <button>Save as a Draft</button>
                  <button>Update</button>
              </div>
          </div>
        </div>
    </div>
  )
}

export default Write