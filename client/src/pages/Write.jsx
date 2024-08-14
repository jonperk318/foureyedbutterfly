import React, {useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {useQuill} from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import axios from 'axios';
import dayjs from 'dayjs';
import Quill from 'quill';


const Write = () => {


  const state = useLocation().state;
  const navigate = useNavigate();
  const {quill, quillRef} = useQuill();
  const [title, setTitle] = useState(state?.title || "");
  const [content, setContent] = useState(state?.content || "");
  const [files, setFiles] = useState(state?.img || []);
  const [fileLimit, setFileLimit] = useState(false);


  let updateList = function() { // display names of uploaded files on page
    let input = document.getElementById('file');
    let output = document.getElementById('fileList');
    let children = "";
    for (let i = 0; i < input.files.length; ++i) {
        children += '<li>' + input.files.item(i).name + '</li>';
    }
    output.innerHTML = '<ol>'+children+'</ol>';
  }


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
      console.log(files.length)
      files.forEach(file => {
        formData.append("files", file);
      });
      console.log(formData);
      const res = await axios.post("/api/upload", formData);
      //console.log(res.data.join(", "));
      //return res.data.join(", ");
    } catch(err) {
      console.log(err);
  }};


  const handlePublish = async e => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`/api/posts/${state.pid}`, {
            title,
            content: content,
            img: files ? imgUrl : "",
          })
        : await axios.post(`/api/posts/`, {
            title,
            content: content,
            img: files ? imgUrl : "",
            date: dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
          navigate("/")
    } catch (err) {
      console.log(err);
    }
  }


  const handleUploadFiles = files => {
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
    })
    if (!limitExceeded) setFiles(uploaded)
  }


  const handleFileEvent = (e) => {

    const chosenFiles = Array.prototype.slice.call(e.target.files)
    handleUploadFiles(chosenFiles);

    setFiles(chosenFiles);
    updateList();
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
              <input type="text" placeholder="Title" onChange={e=>setTitle(e.target.value)} value={title} />
              <div className="editor-container">
                  <div ref={quillRef} />
              </div>
          </div>
          <div className="menu">
              <div className="instructions">
                <h1>Separate text field submissions by entering 3 times.</h1>
                <h1>A single image will inset between each text field, and remaining images will be at the end.</h1>
              </div>
              <div className="upload-buttons">
                  <input style={{display: "none"}} type="file" multiple id="file" name="file" onChange={handleFileEvent} />
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