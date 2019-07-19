import React, {Component} from 'react';
import Toast from "../Toast";
import cl from "./dragnDrop.module.scss";
import axios from "axios";

class DragAndDrop extends Component {
  state = {
    dragging: false,
    files: [],
    progress: {
      starts: false,
      value: 0
    },
    showToast: false,
    level: "",
    message: ""
  };
  dropRef = React.createRef();
  selectFile = React.createRef();

  showToast(level, message) {
    this.setState({
      showToast: true,
      level: level,
      message: message
    }, () => {
      setTimeout(() =>
              this.setState({showToast: false})
          , 3000)
    })
  }

  checkMimeType = () => {
    //getting file object
    let files = this.state.files;
    //define message container
    let err = '';
    // list allow mime type
    const types = ['image/png', 'image/jpeg', 'image/gif'];
    // loop access array
    for (let x = 0; x < files.length; x++) {
      // compare file type find doesn't matach
      if (types.every(type => files[x].type !== type)) {
        // create error message and assign to container
        err += files[x].type + ' is not a supported format\n';
      }
    }

    if (err !== '') { // if message not same old that mean has error
      this.setState({files: []}) // discard selected file
      console.log(err)
      return {success: false, error: err};
    } else return {success: true, error: null};
  }
  checkFileSize = () => {
    let files = this.state.files;
    let size = 1048576// 1 mb in bytes
    let err = "";
    for (let x = 0; x < files.length; x++) {
      if (files[x].size > size) {
        err += files[x].type + 'is too large, please pick a smaller file\n';
      }
    }
    ;
    if (err !== '') {
      this.setState({files: []})
      console.log(err)
      return {success: false, err: err}
    }

    return {success: true, err: null};

  }
  handleUpload = async () => {
    let data = new FormData();
    if (this.state.files.length > 0) {
      this.state.files.forEach((image, i) => {
        data.append('file', image)
      });
      try {
        let res = await axios.post('/api/users/images-upload', data, {
          onUploadProgress: ProgressEvent => {
            console.log(ProgressEvent, ProgressEvent.loaded)
            this.setState({
              progress: {
                starts: true,
                value: (ProgressEvent.loaded / ProgressEvent.total * 100),
              }
            })
          },
        })
        if (res) {
          this.setState({
            files: [],
            progress: {starts: false, value: 0}
          }, () => this.showToast("success", "uploaded successfully"))
        }
      } catch (e) {
        console.log(e)
      }
    }

  }

  handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }
  handleDragIn = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.dragCounter++
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({dragging: true})
    }
  }
  handleDragOut = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.dragCounter--
    if (this.dragCounter === 0) {
      this.setState({dragging: false})
    }
  };
  handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({dragging: false})
    console.log(e)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      this.setState(prevState => {
        return {files: [...prevState.files, ...e.dataTransfer.files]}
      })
      if (this.state.files.length > 3 || !this.checkMimeType().success || !this.checkFileSize().success) {
        let div = document.createElement('div')
        div.style.cssText = `
        color:red;
        padding:16px;
        alignItem:center;
        `;
        div.innerText = `More than 3 files not allowed, and only .jpg, .jpeg, .png, .gif extension are allowed.
          ${!this.checkMimeType().success ? `${this.checkMimeType().error}` : this.checkFileSize().success ? "" : this.checkFileSize().err}       
        `;

        document.querySelector("#root-container").insertAdjacentElement('beforeend', div)
        setTimeout(() => {
          div.remove()
        }, 5000)
        this.setState({files: []})
        return
      }
      let img = document.querySelectorAll('img');  // $('img')[0]
      let imagesElement = Array.from(img)
      this.state.files.forEach((image, i) => {
        imagesElement[i].src = URL.createObjectURL(this.state.files[i]); // set src to file url
      });
      //img.src = URL.createObjectURL(e.target.files[0]); // set src to file url
      //this.props.handleDrop(e.dataTransfer.files)
      e.dataTransfer.clearData()
      this.dragCounter = 0
    }
  };
  handleImageSelect = (e) => {

    console.log(e)
    if (e.target.files && e.target.files[0]) {
      this.setState(prevState => {
        return {files: [...prevState.files, ...e.target.files]}
      }, () => {
        let img = document.querySelectorAll('img');  // $('img')[0]
        this.state.files.forEach((file, i) => {
          img[i].src = URL.createObjectURL(file); // set src to file url

        })
        //img.onload = this.imageIsLoaded; // optional onload event listener
      })

    }
  }
  handleDropZoneClick = (e) => {
    this.selectFile.current.click()
    //document.querySelector("input[type='file']").click()
  }

  componentDidMount() {
    let div = this.dropRef.current
    div.addEventListener('dragenter', this.handleDragIn)
    div.addEventListener('dragleave', this.handleDragOut)
    div.addEventListener('dragover', this.handleDrag)
    div.addEventListener('drop', this.handleDrop)
    div.addEventListener('click', this.handleDropZoneClick)
    document.querySelector('input[type="file"]').addEventListener('change', this.handleImageSelect);
  }

  componentWillUnmount() {
    let div = this.dropRef.current
    div.removeEventListener('dragenter', this.handleDragIn)
    div.removeEventListener('dragleave', this.handleDragOut)
    div.removeEventListener('dragover', this.handleDrag)
    div.removeEventListener('drop', this.handleDrop)
    div.addEventListener('click', this.handleDropZoneClick)
    document.querySelector('input[type="file"]').removeEventListener('change', this.handleImageSelect);
  }

  render() {
    console.log(this.state)
    return (
        <div id={"root-container"} className={cl.container}>
          <div className={cl["container-drop-box"]}
               ref={this.dropRef}
          >
            {!this.state.dragging && <h4 align="center">Drag and drop to upload</h4>}
            {this.state.dragging &&
            <div className={cl.overlay}>
              <div className={cl["overlay-content"]}>
                <div>drop here :)</div>
              </div>
            </div>
            }
            <label className={cl.label} htmlFor={"id"}>or click to select</label>
            <input className={cl["file-input"]} ref={this.selectFile} id={"id"} type={"file"}/>
          </div>
          <div style={{height: "100%", width: "100%"}}>

            {this.state.files.map((file, i) =>
                <img style={{height: "120px", width: "100px"}}
                     key={i} src={""}/>
            )}
          </div>
          {this.state.progress.starts ? <progress value={this.state.progress.value} max="100"></progress> : null}
          <button onClick={this.handleUpload}>Upload</button>
          <Toast
              level={this.state.level}
              message={this.state.message}
              visible={this.state.showToast}
          />
        </div>

    )
  }
}

export default DragAndDrop