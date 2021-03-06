window.addEventListener('DOMContentLoaded', function() {
    // Execute after page load
    const deal = document.querySelector('#deal-button');
    deal.addEventListener('click', dealCards);

    const hit = document.querySelector('#hit-button');
    hit.addEventListener('click', hitMe);

    const stand = document.querySelector('#stand-button');
    stand.addEventListener('click', iStand);

    const playAgain = document.querySelector('#playAgain-button');
    playAgain.addEventListener('click', restart);
    playAgain.disabled = true;
  })

  //Variables
let suit = ['diamonds', 'clubs', 'hearts', 'spades'];
let rank = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];
let deck = new Array();
let dealerHand = new Array();
let playerHand = new Array();
let playerPoint = 0;
let dealerPoint = 0;
let message = "";

//Deals Cards
function dealCards(event){
  buildDeck();
  playerHand = new Array();
  dealerHand = new Array();
  
  for (let i = 0; i < 2; i++){
    let card = deck.pop();
    playerHand.push(card);
    for (let j = 0; j < 1; j++){
      let card = deck.pop();
      dealerHand.push(card);
    }
  }
  render(playerHand);
  render(dealerHand);
  document.querySelector('#deal-button').disabled = true;
}

//Deals Hit Cards
function hitMe(event){
  let player = document.querySelector('#player-hand');
  let dealer = document.querySelector('#dealer-hand');
  
  if(dealerPoint < 17){
    let playerHitCard = deck.pop();
    let newPlayerCard = getCardImage(playerHitCard);
    playerHand.push(playerHitCard);
    playerPoint = calculatePoints(playerHand);
    player.append(newPlayerCard);
    document.querySelector('#player-points').textContent = playerPoint;
    
    let dealerHitCard = deck.pop();
    let newDealerCard = getCardImage(dealerHitCard);
    dealerHand.push(dealerHitCard);
    dealerPoint = calculatePoints(dealerHand);
    dealer.append(newDealerCard);
    document.querySelector('#dealer-points').textContent = dealerPoint;
    
  } else {
    let playerHitCard = deck.pop();
    let newPlayerCard = getCardImage(playerHitCard);
    playerHand.push(playerHitCard);
    playerPoint = calculatePoints(playerHand)
    player.append(newPlayerCard);
    document.querySelector('#player-points').textContent = playerPoint;
  }
}

//Player Stands
function iStand(event){
  let dealer = document.querySelector('#dealer-hand');
  
  if(dealerPoint < 17){
    let dealerHitCard = deck.pop();
    let newDealerCard = getCardImage(dealerHitCard);
    dealerHand.push(dealerHitCard);
    dealerPoint = calculatePoints(dealerHand);
    dealer.append(newDealerCard);
    document.querySelector('#dealer-points').textContent = dealerPoint;
  }
}

//Shuffle Cards
function shuffleDeck(deck) {
  let currentIndex = deck.length, randomIndex;
  
  while (currentIndex != 0){
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    
    [deck[currentIndex], deck[randomIndex]] = [deck[randomIndex], deck[currentIndex]];
  }
  return deck;
}

//Render Cards and Points
function render(Array){
  let player = document.querySelector('#player-hand');
  let dealer = document.querySelector('#dealer-hand');

  if(Array == playerHand){
    for(let i = 0; i < playerHand.length; i++){
      let card = playerHand[i];
      let newCard = getCardImage(card);
      player.append(newCard);
    }
    playerPoint = calculatePoints(playerHand);
    document.querySelector('#player-points').textContent = playerPoint;
  } else {
    for(let j = 0; j < dealerHand.length; j++){
      let card = dealerHand[j];
      let newCard = getCardImage(card);
      dealer.append(newCard); 
    }
    dealerPoint = calculatePoints(dealerHand);
    document.querySelector('#dealer-points').textContent = dealerPoint;
  }
}

//Builds Deck
function buildDeck() {
  deck = new Array();
  for (let i = 0; i < rank.length; i++){
    for (let j = 0; j < suit.length; j++){
      let card = { rank: rank[i], suit: suit[j]};
      deck.push(card);
    }
  }
  deck = shuffleDeck(deck);
}
//End Game
function gameOver(){
  
  if(dealerPoint >= 17 || playerPoint >= 17){
    if(dealerPoint >= 17 && playerPoint >= 17){
      if(dealerPoint > playerPoint){
        message = "Dealer Wins!";
      } 
      else if(playerPoint > dealerPoint){
        message = "Player Wins!";
      } 
      else if(playerPoint == dealerPoint) {
        message = "Draw!";
      }
      document.querySelector('#playAgain-button').disabled = false;
      document.querySelector('#hit-button').disabled = true;
      document.querySelector('#stand-button').disabled = true;
    }
    if(playerPoint > 21 || dealerPoint > 21){
      if(playerPoint > 21 && dealerPoint > 21){
        message = "Player and Dealer Bust";
      }
      else if (playerPoint > 21){
        message = "Player Bust! You Lose!";
      } 
      else {
        message = "Dealer Bust! You Win!";
      }
      document.querySelector('#playAgain-button').disabled = false;
      document.querySelector('#hit-button').disabled = true;
      document.querySelector('#stand-button').disabled = true;
    }
  }
  document.querySelector('#messages').textContent = message;
}

//Restart Game
function restart(){
  let player = document.querySelector('#player-hand');
  let dealer = document.querySelector('#dealer-hand');

  playerHand = [];
  playerPoint = 0;  
  dealerHand = [];
  dealerPoint = 0;
  message = "";

  document.querySelector('#messages').textContent = message;
  player.textContent = '';
  dealer.textContent = '';

  document.querySelector('#hit-button').disabled = false;
  document.querySelector('#stand-button').disabled = false;
  document.querySelector('#playAgain-button').disabled = true;
  dealCards();
}
  

//Calculates Points
function calculatePoints(Array) {

  if(Array == playerHand){
    playerPoint = 0;
    for(i = 0; i < playerHand.length; i++){
      let playerCard = playerHand[i];
      let points = parseInt(playerCard.rank);
      if(points > 10){
        points = 10;
      }
      playerPoint += points;
    }
    gameOver();
    return playerPoint;
  }else {
    dealerPoint = 0;
    for(i = 0; i < dealerHand.length; i++){
      let dealerCard = dealerHand[i];
      let points = parseInt(dealerCard.rank);
      if(points > 10){
        points = 10;
      }
      dealerPoint += points;
    }
    gameOver();
    return dealerPoint;
  }
}

//Assigns Card Images
function getCardImage(card){
  let rank = card.rank;

  switch(rank){
    case '1': rank = 'ace';
    break;
    case '11': rank = 'jack';
    break;
    case '12': rank = 'queen';
    break;
    case '13': rank = 'king';
    break
  }

  const image = document.createElement('img');
  image.src = `/images/${rank}_of_${card.suit}.png`;
  return image;
} 
