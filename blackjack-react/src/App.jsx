import {useState} from 'react';


function createDeck() {
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  const ranks = [
    {rank: "A", value: 11},
    {rank: "2", value: 2},
    {rank: "3", value: 3},
    {rank: "4", value: 4},
    {rank: "5", value: 5},
    {rank: "6", value: 6},
    {rank: "7", value: 7},
    {rank: "8", value: 8},
    {rank: "9", value: 9},
    {rank: "10", value: 10},
    {rank: "J", value: 10},
    {rank: "Q", value: 10},
    {rank: "K", value: 10},
  ];

  const deck = []; //starts empty, then we will fill it with cards

  for(let suit of suits) { // Loop through each suit
    for (let card of ranks) { // Loop through each rank and create a card object for each combination of suit and rank
      deck.push({
        suit: suit,
        rank: card.rank,
        value: card.value,
      });
    }
  }
  return deck;
}

function App() {
  const [deck, setDeck] = useState(createDeck()); // Create a new deck of cards

  return (
    <main>
      <h1>Blackjack</h1>
      <p>Cards in deck: {deck.length}</p>
    </main>
  );
}

export default App;