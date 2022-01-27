window.addEventListener('DOMContentLoaded', function() {
    // Execute after page load
    const deal = document.querySelector('#deal-button');
    deal.addEventListener('click', dealCards);
  
    const hit = document.querySelector('#hit-button');
    hit.addEventListener('click', hitDealer);
    hit.addEventListener('click', hitPlayer);
  })
  
  let suit = ['diamonds', 'clubs', 'hearts', 'spades'];
  let rank = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];
  let deck = new Array();
  let dealerHand = new Array();
  let playerHand = new Array();
  
  function dealCards(event){
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
  }
  
  function hitDealer(event){
    const image = document.createElement('img');
    image.src = '/images/2_of_clubs.png';
  
    document.querySelector('#dealer-hand').appendChild(image);
  }
  
  function hitPlayer(event){
    const image = document.createElement('img');
    image.src = '/images/2_of_clubs.png';
  
    document.querySelector('#player-hand').appendChild(image);
  }
  
  
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
  
  function shuffleDeck(deck) {
    let currentIndex = deck.length, randomIndex;
  
    while (currentIndex != 0){
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [deck[currentIndex], deck[randomIndex]] = [deck[randomIndex], deck[currentIndex]];
    }
    return deck;
  }
  
  function calculatePoints(Array) {
  
    let playerPoint = 0;
    let dealerPoint = 0;

    if(Array == playerHand){
      for(i = 0; i < 2; i++){
        let playerCard = playerHand[i];
        let points = parseInt(playerCard.rank);
        if(points > 10){
          points = 10;
        }
        playerPoint += points;
      }
      console.log('Player Points: ' + playerPoint);
      return playerPoint;
    }else{
      for(i = 0; i < 2; i++){
        let dealerCard = dealerHand[i];
        let points = parseInt(dealerCard.rank);
        if(points > 10){
          points = 10;
        }
        dealerPoint += points;
      }
      console.log('Dealer Points: ' + dealerPoint);    
      return dealerPoint;
    }
  }
  
  
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
  
  function render(Array){
    let player = document.querySelector('#player-hand');
    let dealer = document.querySelector('#dealer-hand');
  
    if(Array == playerHand){
      for(let i = 0; i < playerHand.length; i++){
        let card = playerHand[i];
        let newCard = getCardImage(card);
        player.appendChild(newCard);
      }
      playerPoint = calculatePoints(playerHand);
      document.querySelector('#player-points').append(playerPoint);
    } else {
      for(let j = 0; j < dealerHand.length; j++){
        let card = dealerHand[j];
        let newCard = getCardImage(card);
        dealer.appendChild(newCard); 
     }
      dealerPoint = calculatePoints(dealerHand);
      document.querySelector('#dealer-points').append(dealerPoint);
    }


  }
  
  
  buildDeck();
  console.log(deck);