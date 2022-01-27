window.addEventListener('DOMContentLoaded', function() {
    // Execute after page load
    const deal = document.querySelector('#deal-button');
    deal.addEventListener('click', dealCards);
  
    const hit = document.querySelector('#hit-button');
    hit.addEventListener('click', hitMe);
  })
  
  let suit = ['diamonds', 'clubs', 'hearts', 'spades'];
  let rank = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];
  let deck = new Array();
  let dealerHand = new Array();
  let playerHand = new Array();
  let playerPoint = 0;
  let dealerPoint = 0;
  
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
      console.log('Player Points: ' + playerPoint);
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
      console.log('Dealer Points: ' + dealerPoint);    
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
  