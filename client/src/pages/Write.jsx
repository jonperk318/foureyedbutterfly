import React, {useState} from 'react';
import {useQuill} from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import axios from 'axios';

const Write = () => {

  const {quill, quillRef} = useQuill();
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [components, setComponents] = useState(null);
  
  /*
  React.useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        console.log('Text change!');
        console.log(quill.getText()); // Get text only
        console.log(quill.getContents()); // Get delta contents
        console.log(quill.root.innerHTML); // Get innerHTML using quill
        console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
      });
    }
  }, [quill]);
  */

  const upload = async () => {

  try {
    const formData = new FormData();
    formData.append("components", components);
    const res = await axios.post("/api/upload", formData);
    console.log(res.data);
  } catch(err) {
    console.log(err);
  }};

  const handleClick = async e => {
    e.preventDefault();
    upload();
  }
  
  return (
    <div className="write-post">
        <div className="upload-container">
            <h1>Content Layout</h1>
            <div className="uploads"></div>
        </div>
        <div className="write-container">
          <div className="content">
              <input type="text" placeholder="Title" onChange={e=>setTitle(e.target.value)} />
              <div className="editor-container">
                  <div ref={quillRef} />
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
                  <input style={{display: "none"}} type="file" id="components" name="components" onChange={e=>setComponents(e.target.files)} multiple />
                  <label htmlFor="components">Upload Image or Video</label>
              </div>
              <div className="save-buttons">
                  <button>Save as a Draft</button>
                  <button onClick={handleClick}>Publish</button>
              </div>
          </div>
        </div>
    </div>
  )
}

export default Write;