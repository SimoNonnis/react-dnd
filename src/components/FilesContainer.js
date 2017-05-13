import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import store  from '../store';
import FilesChoice from './FilesChoice';
import DropArea from './DropArea';

class FilesContainer extends Component {
  constructor (props) {
    super(props);

    this.state = {
      photos: {
          active: store.photos,
          inactive: []
      }
    }

    this.uploadFiles = this.uploadFiles.bind(this);
  }

  uploadFiles(acceptedFiles) {
    const filesList = acceptedFiles.map(file => ({name: file.name, size: file.size, type: file.type}))
    console.log('Received files: ', filesList, acceptedFiles);
  }

  render() {
    const activeCards = this.state.photos.active;
    const inactiveCards = this.state.photos.inactive;

    return (
      <div>
          <DropArea uploadFiles={this.uploadFiles} />
          <div>
            <h4>Show on advert</h4>
            <FilesChoice id={1} list={activeCards} />
          </div>
          <div>
            <h4>Don't show on advert</h4>
            <FilesChoice id={2} list={inactiveCards} />
          </div>
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(FilesContainer);
