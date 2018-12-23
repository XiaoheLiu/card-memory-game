import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NavBar.css';

class NavBar extends Component {
    static propTypes = {
        onNewGame: PropTypes.func.isRequired
    }

    render() {
        return(
            <header>
                <h1>Match The Cards!</h1>
                <nav>
                    <li><a onClick={this.props.onNewGame}>New Game</a></li>
                </nav>
            </header>
        );
    }
}

export default NavBar;