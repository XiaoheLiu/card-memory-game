import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Card.css';

class Card extends Component {
    static propTypes = {
        backgroundColor: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
        isShowing: PropTypes.bool.isRequired
    }

    render() {
        const {backgroundColor} = this.props;
        let style = {};
        if (this.props.isShowing) {
            style = {background: backgroundColor};
        }   
        return(
            <div 
                className="card"
                style = {style}
                onClick = {this.props.onClick} 
            />
        );
    }
}

export default Card;