const section = document.querySelector('[data-section]');

//get the HTML span element and set the number of lives at the begining of the game
let remainingLives = document.querySelector('[data-span]');
let startingLives = 7;
remainingLives.textContent = startingLives;

//create an array with the images to put on the front of the cards
const getData = () => [
  {
    imgSrc: 'img/black-sea-nettle.jpg',
    name: 'black sea nettle',
  },
  {
    imgSrc: 'img/sea-walnut__romain-huneau.jpg',
    name: 'sea walnut jellyfish',
  },
  { imgSrc: 'img/cannonball-jelly__dylan-shaw.jpg', name: 'cannonball jelly' },
  {
    imgSrc: 'img/crystal jellyfish__mick-haupt.jpg',
    name: 'crystal jellyfish',
  },
  { imgSrc: 'img/flower-hat-jellyfish.jpg', name: 'flower hat jellyfish' },
  { imgSrc: 'img/fried-egg-jellyfish.jpg', name: 'fried egg jellyfish' },
  { imgSrc: 'img/moom-jelly__mark-boss.jpg', name: 'moon jelly' },
  {
    imgSrc: 'img/white-spot-jellyfish__kanyon-bollinger.jpg',
    name: 'white spot jellyfish',
  },
  {
    imgSrc: 'img/black-sea-nettle.jpg',
    name: 'black sea nettle',
  },
  {
    imgSrc: 'img/sea-walnut__romain-huneau.jpg',
    name: 'sea walnut jellyfish',
  },
  { imgSrc: 'img/cannonball-jelly__dylan-shaw.jpg', name: 'cannonball jelly' },
  {
    imgSrc: 'img/crystal jellyfish__mick-haupt.jpg',
    name: 'crystal jellyfish',
  },
  { imgSrc: 'img/flower-hat-jellyfish.jpg', name: 'flower hat jellyfish' },
  { imgSrc: 'img/fried-egg-jellyfish.jpg', name: 'fried egg jellyfish' },
  { imgSrc: 'img/moom-jelly__mark-boss.jpg', name: 'moon jelly' },
  {
    imgSrc: 'img/white-spot-jellyfish__kanyon-bollinger.jpg',
    name: 'white spot jellyfish',
  },
];

//function to randomize an array
const shuffleFisherYates = (array) => {
  let i = array.length;
  while (i--) {
    const ri = Math.floor(Math.random() * i);
    [array[i], array[ri]] = [array[ri], array[i]];
  }
  return array;
};

//randomize the array of images
const randomize = () => {
  const data = getData();
  const suffledData = shuffleFisherYates(data);
  return suffledData;
};

//generate the front and back of each card
const generateCards = () => {
  const images = randomize();
  images.forEach((image) => {
    //generate the HTML
    const card = document.createElement('div');
    const front = document.createElement('div');
    const back = document.createElement('div');
    const img = document.createElement('img');
    card.classList.add('card');
    front.classList.add('front');
    back.classList.add('back');
    img.classList.add('img');

    //set the source attibute of the image
    img.src = image.imgSrc;
    card.dataset.name = image.name;

    //append the elements on the HTML
    front.append(img);
    section.append(card);
    card.append(front);
    card.append(back);

    //add event listener to every card
    card.addEventListener('click', (e) => {
      card.classList.toggle('toggle');
      checkCards(e);
    });
  });
};

//check if the images match
const checkCards = (e) => {
  const clickedCard = e.target;

  clickedCard.classList.add('flipped');
  const flippedCards = document.querySelectorAll('.flipped');

  const correctCards = document.querySelectorAll('.toggle');

  if (flippedCards.length === 2) {
    if (flippedCards[0].dataset.name === flippedCards[1].dataset.name) {
      flippedCards.forEach((flippedCard) => {
        flippedCard.classList.remove('flipped');
        flippedCard.style.pointerEvents = 'none';
      });
    } else {
      flippedCards.forEach((flippedCard) => {
        flippedCard.classList.remove('flipped');
        setTimeout(() => flippedCard.classList.remove('toggle'), 1000);
      });
      startingLives--;
      remainingLives.textContent = startingLives;
      if (startingLives === 0) {
        restartGame('You lost.. try again!');
      }
    }
  }

  //check if we won the game

  if (correctCards.length === 16) {
    restartGame('You won! Good job!');
  }
};

const restartGame = (text) => {
  const images = randomize();
  const cards = document.querySelectorAll('.card');
  const imgElement = document.querySelectorAll('img');
  section.style.pointerEvents = 'none';

  images.forEach((image, i) => {
    cards[i].classList.remove('toggle');
    setTimeout(() => {
      cards[i].style.pointerEvents = 'all';
      imgElement[i].src = image.imgSrc;
      cards[i].dataset.name = image.name;
      section.style.pointerEvents = 'all';
    }, 1000);
  });

  startingLives = 7;
  remainingLives.textContent = startingLives;
  setTimeout(() => window.alert(text), 100);
};

generateCards();
