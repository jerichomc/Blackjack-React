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

function dealInitialHands(deck) {
  const playerHand = [deck[0], deck[2]]; // Give the player the first and third card from the deck
  const dealerHand = [deck[1], deck[3]]; // Give the dealer the second and fourth card from the deck
  const remainingDeck = deck.slice(4); // Remove the first four cards from the deck

  return {
    playerHand: playerHand,
    dealerHand: dealerHand,
    remainingDeck: remainingDeck,
  };

  
}

function calculateHandValue(hand) {
    let totalValue = 0;

    let aceCount = 0; // Count the number of aces in the hand

    for (let card of hand) {  // Loop through each card in the hand
      totalValue += card.value; // Add the value of the card to the total value
      if (card.rank === "A") {
        aceCount++; // Increment the ace count if the card is an ace
      }
    }

    // Adjust for aces if the total value is over 21
    while (totalValue > 21 && aceCount > 0) {
      totalValue -= 10; // Treat an ace as 1 instead of 11
      aceCount--; // Decrement the ace count
    }

    return totalValue;
  }

  function dealCardToHand(deck, hand) {
    const newCard = deck[0]; // Get the top card from the deck
    const newHand = [...hand, newCard];

    const newDeck = deck.slice(1); // Remove the top card from the deck

    return {
      newHand: newHand,
      newDeck: newDeck,
    }
  }

  function playDealerTurn(deck, dealerHand) { // Function to play the dealer's turn
    let newDeck = [...deck]; // Create a copy of the deck to avoid mutating the original deck
    let newDealerHand = [...dealerHand]; // Create a copy of the dealer's hand to avoid mutating the original hand

    while (calculateHandValue(newDealerHand) < 17) { // Keep hitting until the dealer's hand value is 17 or higher
      const nextCard = newDeck[0]; // Get the top card from the deck

      newDealerHand = [...newDealerHand, nextCard]; // Add the next card to the dealer's hand
      newDeck = newDeck.slice(1); // Remove the top card from the deck
    }

    return { // Return the updated deck and dealer's hand
      newDeck: newDeck, // Return the updated deck after the dealer's turn
      newDealerHand: newDealerHand, // Return the updated dealer's hand after the dealer's turn
    };
  }

function App() {
  const startingDeck = shuffleDeck(createDeck()); // Create and shuffle a new deck of cards
  const initialDeal = dealInitialHands(startingDeck); // Deal the initial hands to the player and dealer

  const [deck, setDeck] = useState(initialDeal.remainingDeck); // Create a new deck of cards
  const [playerHand, setPlayerHand] = useState(initialDeal.playerHand); // Create a state variable for the player's hand
  const [dealerHand, setDealerHand] = useState(initialDeal.dealerHand); // Create a state variable for the dealer's hand

  const playerScore = calculateHandValue(playerHand); // Calculate the player's score
  const dealerScore = calculateHandValue(dealerHand); // Calculate the dealer's score
  

  const [gameMessage, setGameMessage] = useState(''); // Create a state variable for the game message
  function handleStand() {
    const result = playDealerTurn(deck, dealerHand); // Play the dealer's turn

    const finalDealerScore = calculateHandValue(result.newDealerHand); // Calculate the dealer's final score

    setDeck(result.newDeck); // Update the deck after the dealer's turn
    setDealerHand(result.newDealerHand); // Update the dealer's hand after the dealer's turn

    if(finalDealerScore > 21) {
      setGameMessage('Dealer busts! You win!');
    } else if (playerScore > finalDealerScore) {
      setGameMessage('You win!');
    } else if (playerScore < finalDealerScore) {
      setGameMessage('Dealer wins!');
    } else {
      setGameMessage("Push. It's a tie!")
    }
  }

  const playerHasBlackjack = playerScore === 21 && playerHand.length === 2; // Check if the player has blackjack
  const dealerHasBlackjack = dealerScore === 21 && dealerHand.length === 2; // Check if the dealer has blackjack
  const playerIsBust = playerScore > 21; // Check if the player is bust

  let displayMessage = gameMessage; // Initialize displayMessage with the current game message
  if(playerHasBlackjack && dealerHasBlackjack) {
    displayMessage = "Both you and the dealer have blackjack! It's a tie!";
  } else if (playerHasBlackjack) {
    displayMessage = "You have blackjack! You win!";
  } else if (dealerHasBlackjack) {
    displayMessage = "Dealer has blackjack! Dealer wins!";
  } else if (playerIsBust) {
    displayMessage = "You bust! Dealer wins!";
  }

  const roundIsOver =
  playerIsBust || playerHasBlackjack || dealerHasBlackjack || gameMessage !== "";

  return (
    <main>
      <h1>Blackjack</h1>

      <section>
        <h2>Dealer</h2>
        <p>Score: {dealerScore}</p>
        <ul>
          {dealerHand.map((card, index) => (
            <li key={`${card.rank}-${card.suit}-${index}`}>
              {card.rank} of {card.suit}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Player</h2>
        <p>Score: {playerScore}</p>
        <p>{displayMessage}</p>
        <ul>
          {playerHand.map((card, index) => (
            <li key={`${card.rank}-${card.suit}-${index}`}>
              {card.rank} of {card.suit}
            </li>
          ))}
        </ul>

        <button disabled={roundIsOver} onClick={() => {
          const result = dealCardToHand(deck, playerHand);
          setDeck(result.newDeck);
          setPlayerHand(result.newHand);
        }}>
          Hit
        </button>
        <button disabled={roundIsOver} onClick={handleStand}>Stand</button>
      </section>

      <p>Cards left in deck: {deck.length}</p>
    </main>
  );
}
export default App;