'use strict';
let attemptEl = document.getElementById('attempts');
let container = document.getElementById('imageGroupContainer');

let leftImage = document.getElementById('leftImage');
let middleImage = document.getElementById('middleImage');
let rightImage = document.getElementById('rightImage');

let viewResults = document.getElementById('viewResults');
let result = document.getElementById('results');

let maxAttempts = 25;
let attempt = 1;

let productsUrl=['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];


// our image constructor
let image = [];
function itemsImg(itemsName) {
  this.imgName = itemsName.split('.')[0];
  this.img = `images/${itemsName}`;
  this.votes = 0;
  this.views = 0;
  image.push(this);
}

// for loop to add images from the array
for (let i = 0; i < productsUrl.length; i++) {
  new itemsImg(productsUrl[i]);
}

// function to create a random image
function randomImage() {
  return Math.floor(Math.random() * image.length);
}

let firstImage;
let secondImage;
let thirdImage;


// creating a function that renders our info
function renderImage() {
  firstImage = randomImage();
  secondImage = randomImage();
  thirdImage = randomImage();

  while (firstImage === secondImage || firstImage === thirdImage || secondImage === thirdImage) {
    leftImage = randomImage();
    secondImage = randomImage();
  }

  leftImage.setAttribute('src', image[firstImage].img);
  middleImage.setAttribute('src', image[secondImage].img);
  rightImage.setAttribute('src', image[thirdImage].img);

  image[firstImage].views++;
  image[secondImage].views++;
  image[thirdImage].views++;
}
renderImage();

// here we have to create a method that does the clicking
leftImage.addEventListener('click', clicking);
middleImage.addEventListener('click', clicking);
rightImage.addEventListener('click', clicking);

// clicking function
function clicking(event) {
  if (attempt < maxAttempts) {
    let clickedImage = event.target.id;

    if (clickedImage === 'leftImage') {
      image[firstImage].votes++;

    } else if (clickedImage === 'middleImage') {
      image[secondImage].votes++

    } else if (clickedImage === 'rightImage') {
      image[thirdImage].votes++
    }

    renderImage();
    attempt++;
    attemptEl.textContent = `attempts: ${attempt}`;
  } else {
    leftImage.removeEventListener('click', clicking);
    middleImage.removeEventListener('click', clicking);
    rightImage.removeEventListener('click', clicking);
  }
}

// results button 
viewResults.addEventListener('click', resultsButton);
function resultsButton() {

  for (let i = 0; i < image.length; i++) {

    let liEl = document.createElement('li');
    result.appendChild(liEl);
    liEl.textContent = `${image[i].imgName} has ${image[i].votes} votes and  ${image[i].views} views.`;
  }

  let liEl1 = document.createElement('li');
  result.appendChild(liEl1);
  liEl1.textContent = `//////////////////////////////////////////////////////////`;
}