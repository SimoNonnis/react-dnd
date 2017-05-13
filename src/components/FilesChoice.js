import React, { Component } from 'react';
import update from 'immutability-helper';
import { DropTarget } from 'react-dnd';

import ItemTypes from '../itemTypes';

import FileCard from './FileCard';

const style = {
    minHeight: '350px',
    border: '2px dashed #bfbfbf',
    display: 'flex',
    flexWrap: 'wrap',
    padding: '.5em',
    alignItems: 'flex-start',
    transition: 'background-color .5s'
};

class FilesChoice extends Component {
    constructor (props) {
        super(props);

        this.state = {
            cards: props.list
        }

        this.removeCard = this.removeCard.bind(this);
        this.moveCard = this.moveCard.bind(this);
    }

    pushCard(card) {
        this.setState(update(this.state, {
            cards: {
                $push: [ card ]
            }
        }));
    }

    removeCard(index) {
        this.setState(update(this.state, {
            cards: {
                $splice: [
                    [index, 1]
                ]
            }
        }));
    }

    moveCard(dragIndex, hoverIndex) {
  		const { cards } = this.state;
  		const dragCard = cards[dragIndex];

  		this.setState(update(this.state, {
    			cards: {
    				$splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard]
    				]
    			}
  		}));
  	}

    render() {
      const { cards } = this.state;
      const { connectDropTarget, canDrop, isOver } = this.props;
      const isActive = canDrop && isOver;
      const backgroundColor = isActive ? '#e6e6e6' : '#FFF';
      const CardsList = cards.map((card, i) => (
          <FileCard
              key={card.id}
              index={i}
              listId={this.props.id}
              card={card}
              removeCard={this.removeCard}
              moveCard={this.moveCard}
          />
        ));

      return connectDropTarget(
          <div style={{...style, backgroundColor}}>
              { CardsList }
          </div>
      )
    }
}

const cardTarget = {
  	drop({ id }, monitor, component ) {
    		const sourceObj = monitor.getItem();

    		if ( id !== sourceObj.listId ) {
            return component.pushCard(sourceObj.card)
        }

    		return {
    			   listId: id
    		};
  	}
}

function collectDropTarget (connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    }
}

export default DropTarget(ItemTypes.CARD, cardTarget, collectDropTarget)(FilesChoice);
