import React, {useState, useCallback} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {useQuill} from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import axios from 'axios';
import {useDropzone} from 'react-dropzone'

const Write = () => {

  const state = useLocation().state;
  const navigate = useNavigate();
  const {quill, quillRef} = useQuill();
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [components, setComponents] = useState(null);

  const [dataURL, setDataURL] = useState(null)
  const [uploadedURL, setUploadedURL] = useState(null)

  const onDrop = useCallback(acceptedFiles => { // display uploaded files
    acceptedFiles.forEach(file => {
      const reader = new FileReader()
      reader.onabort = () => console.log("file reading aborted")
      reader.onerror = () => console.log("file reading failed")
      reader.onload = () => {
        const binaryStr = reader.result
        setDataURL(binaryStr)
      }
      reader.readAsDataURL(file)
    })
  }, [])
  const {getRootProps, acceptedFiles, getInputProps, isDragActive} = useDropzone({onDrop})
  
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
  
  /*
  const count = 1;
  const quils = [];
  const handleTextClick = async e => {
    e.preventDefault();
    quils.push(
      <React.Fragment key={count}>
        <div ref={quillRef} />
      </React.Fragment>
    )
    count ++;
  }
  */

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
            <div {...getRootProps()} className="uploads">
              <img src={dataURL} />
              <div className="actions">
                  <input {...getInputProps({multiple: true})} />
              </div>
              {isDragActive && !uploadedURL ?
                <p>drop files here ...</p> :
                <p>drop files here, or click to select files</p>
              }
              {uploadedURL && <p>uploaded!</p>}
            </div>
        </div>
        <div className="write-container">
          <div className="content">
              <input type="text" placeholder="Title" onChange={e=>setTitle(e.target.value)} />
              <div className="editor-container">
                  <div ref={quillRef} />
              </div>
          </div>
          <div className="menu">
              <h1>separate text field submissions by entering 3 times</h1>
              <div className="upload-buttons" //onClick={uploadImage}
              >
                  <label onClick={() => setDataURL(null)}>Cancel Pictures & Videos</label>
                  <input style={{display: "none"}} type="file" id="components" name="components" onChange={e=>setComponents(e.target.files)} multiple />
                  <label htmlFor="components">Upload Pictures & Videos</label>
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