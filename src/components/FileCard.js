import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';

import ItemTypes from '../itemTypes';


const style = {
  width: '200px',
  boxShadow: '0px 2px 2px 0px #a0a0a0',
	margin: '.5em',
	backgroundColor: 'white',
	cursor: 'move',
  transition: 'opacity .2s'
};

const imgStyle = {
  display: 'block',
  maxWidth: '100%'
};

const copyStyle = {
  margin: '0',
  padding: '.5em',
  cursor: 'pointer'
}

class FileCard extends Component {
  render() {
    const { index, removeCard, card, isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;
    const deleteFile = () => removeCard(index);

    return connectDragSource(connectDropTarget(
      <div ref={node => this.node = node} style={{ ...style, opacity }}>
          <img style={imgStyle} src={card.image} alt=""/>
          <p style={copyStyle} onClick={deleteFile}>
              Remove ID:{card.id}
          </p>
      </div>
    ))
  }
}

const cardSource = {
  	beginDrag({ index, listId, card }) {
    		return {
      			index: index,
            listId: listId,
      			card: card
    		}
  	},

    endDrag({ removeCard }, monitor) {
    		const item = monitor.getItem();
    		const dropResult = monitor.getDropResult();

    		if ( dropResult && dropResult.listId !== item.listId ) {
    			   removeCard(item.index);
    		}
  	}
};

const cardTarget = {
  	hover({ index, listId, card, moveCard }, monitor, component) {
    		const dragIndex = monitor.getItem().index;
    		const hoverIndex = index;
        const sourceListId = monitor.getItem().listId;

        // Don't replace items with themselves
    		if (dragIndex === hoverIndex) {
    			   return;
    		}

        if ( listId === sourceListId ) {
            moveCard(dragIndex, hoverIndex);
            monitor.getItem().index = hoverIndex;
        }
  	}
};

function collectDragSource (connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

function collectDropTarget (connect) {
    return {
        connectDropTarget: connect.dropTarget()
    }
}

export default DragSource(ItemTypes.CARD, cardSource, collectDragSource)(DropTarget(ItemTypes.CARD, cardTarget, collectDropTarget)(FileCard));
