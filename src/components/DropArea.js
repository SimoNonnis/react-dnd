import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

import uploadIcon  from '../../web/uploadIcon.svg';

const style = {
    parent: {
      border: '2px dashed #bfbfbf',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '3em',
      transition: 'background-color .5s',
      cursor: 'pointer'
    },
    child: {
      padding: '1em',
      textAlign: 'center'
    },
    button: {
      padding: '.8em 1.5em',
      color: '#009fda',
      border: '1px solid #009fda',
      borderRadius: '3px',
      textDecoration: 'none'
    },
    icon: {
      width: '60px'
    },
    paragraph: {
      marginBottom: '0'
    }
};

class DropArea extends Component {
  constructor (props) {
    super(props);

    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(acceptedFiles) {
    this.props.uploadFiles(acceptedFiles);
  }

  render() {
      return (
        <div>
          <Dropzone onDrop={this.onDrop} accept={'image/png, image/jpeg, application/pdf'} style={{...style.parent}}>
            <div style={{...style.child}}>
              <img style={{...style.icon}} src={uploadIcon} alt=""/>
              <p style={{...style.paragraph}} >Drag and drop your files here</p>
            </div>
            <div style={{...style.child}}>
              <a style={{...style.button}} href="#">or select from your computer</a>
            </div>
          </Dropzone>
          <p>We accept the following file types jpg, jpeg, png, pdf</p>

        </div>
      )
  }
}

export default DropArea;
