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

function shuffleDeck(deck) {
  const shuffledDeck = [...deck]; // Create a copy of the original deck

  for (let i = shuffledDeck.length - 1; i > 0; i--) { //starting at end of the deck and moving backwards, we will swap each card with a random card that comes before it in the deck
    const randomIndex = Math.floor(Math.random() * (i + 1)); // Generate a random index from 0 to i

    const currentCard = shuffledDeck[i]; // Get the current card at index i. Creates a temp variable so we dont lose the value
    shuffledDeck[i] = shuffledDeck[randomIndex]; // Swap the current card with the card at the random index
    shuffledDeck[randomIndex] = currentCard; // Place the current card at the random index
  }

  return shuffledDeck; // Return the shuffled deck
}

function App() {
  const [deck, setDeck] = useState(shuffleDeck(createDeck())); // Create a new deck of cards

  return (
    <main>
      <h1>Blackjack</h1>
      <p>Cards in deck: {deck.length}</p>

      <h2>First 5 cards:</h2>
      <ul>
        {deck.slice(0, 5).map((card, index) => (
          <li key={`${card.rank}-${card.suit}-${index}`}>
            {card.rank} of {card.suit}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;