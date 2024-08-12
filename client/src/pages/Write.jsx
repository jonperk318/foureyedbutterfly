import React, {useState, useCallback} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {useQuill} from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import axios from 'axios';

const Write = () => {

  const state = useLocation().state;
  const navigate = useNavigate();
  const {quill, quillRef} = useQuill();
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState(null);

  let updateList = function() {
    let input = document.getElementById('file');
    let output = document.getElementById('fileList');
    let children = "";
    for (let i = 0; i < input.files.length; ++i) {
        children += '<li>' + input.files.item(i).name + '</li>';
    }
    output.innerHTML = '<ol>'+children+'</ol>';
}
  
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
      formData.append("files", files);
      const res = await axios.post("/api/upload", formData);
      console.log(res.data);
    } catch(err) {
      console.log(err);
  }};

  const handlePublish = async e => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`/api/posts/${state.id}`, {
            title,
            content: value,
            img: file ? imgUrl : "",
          })
        : await axios.post(`/api/posts/`, {
            title,
            content: value,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
          navigate("/")
    } catch (err) {
      console.log(err);
    }
  }
  
  return (
    <div className="write-post">
        <div className="upload-container">
            <h1>Pictures & Videos</h1>
            <div className='uploads' id='fileList'>
            </div>
        </div>
        <div className="write-container">
          <div className="content">
              <input type="text" placeholder="Title" onChange={e=>setTitle(e.target.value)} />
              <div className="editor-container">
                  <div ref={quillRef} value={value} onChange={setValue}/>
              </div>
          </div>
          <div className="menu">
              <div className="instructions">
                <h1>Separate text field submissions by entering 3 times.</h1>
                <h1>A single image will inset between each text field, and remaining images will be at the end.</h1>
              </div>
              <div className="upload-buttons">
                  <input style={{display: "none"}} type="file" multiple id="file" name="file" onChange={(e) => {setFiles(e.target.files); updateList()}} />
                  <label htmlFor="file">Select Pictures & Videos</label>
                  <label>Upload Pictures & Videos</label>
              </div>
              <div className="save-buttons">
                  <button>Save as a Draft</button>
                  <button onClick={handlePublish} className="publish">Publish</button>
              </div>
          </div>
        </div>
    </div>
  )
}

export default Write;