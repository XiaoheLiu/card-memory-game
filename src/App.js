import React, { Component } from 'react';
import Shuffle from 'shuffle-array';
import NavBar from './NavBar.js';
import Card from './Card.js';
import './App.css';

/* A card can be in 1 of 3 CardStates
  - HIDING: the card is not being shown
  - SHOWING: the card is being shown but does not have a match yet
  - MATCHING: the card is being shown and has a match.
  The card should never move from MATCHING to another state during one game.
*/
const CardState = {
  HIDING: 0,
  SHOWING: 1,
  MATCHING: 2
}

class App extends Component {
  constructor(props){
    super(props);

    let cards = [
      {id: 0, cardState: CardState.HIDING, backgroundColor: 'red'},
      {id: 1, cardState: CardState.HIDING, backgroundColor: 'red'},
      {id: 2, cardState: CardState.HIDING, backgroundColor: 'navy'},
      {id: 3, cardState: CardState.HIDING, backgroundColor: 'navy'},
      {id: 4, cardState: CardState.HIDING, backgroundColor: 'green'},
      {id: 5, cardState: CardState.HIDING, backgroundColor: 'green'},
      {id: 6, cardState: CardState.HIDING, backgroundColor: 'yellow'},
      {id: 7, cardState: CardState.HIDING, backgroundColor: 'yellow'},
      {id: 8, cardState: CardState.HIDING, backgroundColor: 'black'},
      {id: 9, cardState: CardState.HIDING, backgroundColor: 'black'},
      {id: 10, cardState: CardState.HIDING, backgroundColor: 'purple'},
      {id: 11, cardState: CardState.HIDING, backgroundColor: 'purple'},
      {id: 12, cardState: CardState.HIDING, backgroundColor: 'pink'},
      {id: 13, cardState: CardState.HIDING, backgroundColor: 'pink'},
      {id: 14, cardState: CardState.HIDING, backgroundColor: 'lightskyblue'},
      {id: 15, cardState: CardState.HIDING, backgroundColor: 'lightskyblue'}
    ];
    cards = Shuffle(cards);
    this.state = {cards, noClick: false};
    
    this.handleNewGame = this.handleNewGame.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleNewGame() {
    let cards = this.state.cards.map((card) => ({
      ...card,
      cardState: CardState.HIDING
    }));
    cards = Shuffle(cards);
    this.setState({cards});
  }

  handleClick(id) {
    /* mapCardsState: change the cardState of the cards among idsToChange to newCardState, retunrs the updated cards array. */
    const mapCardState = (cards, idsToChange, newCardState) => {
      return cards.map(c => {
        if (idsToChange.includes(c.id)) {
          return {
            ...c,
            cardState: newCardState
          };
        }
        return c;
      });
    }
    /* Find the card with clicked id. N.B.:should not use filter() instead of find() because filter will return an array of card obj, not one card obj. */
    const clickedCard = this.state.cards.find(c => (c.id === id));
    /* If the clickedCard is already showing, no need to update anything: */
    if (this.state.noClick || clickedCard.cardState !== CardState.HIDING) {
      return;
    }
    /* If there are 2 non matched showing, the user cannot click anymore: */ 
    let noClick = false;
    let cards = mapCardState(this.state.cards, [id], CardState.SHOWING);
    const showingCards = cards.filter(c => (c.cardState === CardState.SHOWING));
    /* ids of showing cards*/
    const ids = showingCards.map(c => c.id);

    /* If there are two matching cards showing: */
    if (showingCards.length===2 && showingCards[0].backgroundColor === showingCards[1].backgroundColor) {
      cards = mapCardState(cards, ids, CardState.MATCHING);
    } else if (ids.length===2) {
      /* Non-matched cards won't hide immediately. We'll make a note of these cards and hide them in setTimeout:*/
      let hidingCards = mapCardState(cards, ids, CardState.HIDING);
      /* User can not click anymore: */
      noClick = true; 
      /* We need a callback function after the setState is done for the first arg: */
      this.setState({cards, noClick}, () => {
        setTimeout(() => {
          this.setState({cards: hidingCards, noClick: false});
        }, 1300);
      });
      return;
    }
    this.setState({cards, noClick});

    // this.setState((prevState => {
    //   let cards = prevState.cards.map(c => (
    //     c.id === id ? {
    //       ...c,
    //       cardState: c.cardState === CardState.HIDING ? CardState.MATCHING : CardState.HIDING
    //     } : c
    //   ));
    //   return {cards};
    // }));
  }
  
 

  render() {
    const cards = this.state.cards.map((card) => (
      < Card
        key={card.id}
        backgroundColor={card.backgroundColor}
        onClick={() => this.handleClick(card.id)}
        isShowing={card.cardState !== CardState.HIDING}
      />
    ));
    return (
      <div className="App">
        <NavBar onNewGame={this.handleNewGame}/>
        <div className="cards-container">
          {cards}
        </div>
      </div>
    );
  }
}

export default App;
