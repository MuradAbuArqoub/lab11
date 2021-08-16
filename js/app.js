'use strict';
let attemptEl = document.getElementById('attempts');
let container = document.getElementById('image-container');

let leftImg = document.getElementById('leftImg');
let centerImg = document.getElementById('centerImg');
let rightImg = document.getElementById('rightImg');

let result = document.getElementById('results');
let viewResults = document.getElementById('viewResults');

let images=['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];
let maxAttempts = 25;

let attempt = 1;
let products = [];
let gNames = [];
let votes = [];
let views = [];

function itemsImg(itemName) {
    this.gName = itemName.split('.')[0];
    this.itemsImg = `image/${itemName}`;
    this.votes = 0;
    this.views = 0;
    products.push(this);
    gNames.push(this.gName);
}



for (let i = 0; i < images.length; i++) {
    new itemsImg(images[i]);
}

console.log(products);
function randomImage() {
    return Math.floor(Math.random() * products.length);

}
let leftIndex;
let centerIndex;
let rightIndex;

function renderImg() {
    leftIndex = randomImage();
    centerIndex = randomImage();
    rightIndex = randomImage();
    while (leftIndex === rightIndex || leftIndex === centerIndex || centerIndex === rightIndex) {
        leftIndex = randomImage();
        centerIndex = randomImage();
    }
    
    leftImg.setAttribute('src', products[leftIndex].itemsImg);
    centerImg.setAttribute('src', products[centerIndex].itemsImg);
    rightImg.setAttribute('src', products[rightIndex].itemsImg);
    products[leftIndex].views++;
    products[centerIndex].views++;
    products[rightIndex].views++;
}
renderImg();

leftImg.addEventListener('click', clickHandler);
centerImg.addEventListener('click', clickHandler);
rightImg.addEventListener('click', clickHandler);

function clickHandler(event) {
    if (attempt <= maxAttempts) {
        let clickedImage = event.target.id;
        if (clickedImage === 'leftImg') {
            products[leftIndex].votes++;
        }
        else if (clickedImage === 'centerImg') {
            products[centerIndex].votes++
        } 
        else if (clickedImage === 'rightImg') {
            products[rightIndex].votes++
        }
        renderImg();
        console.log(products);
        attempt++;
    } else {
        // result
        for (let i = 0; i < products.length; i++) {
            let liEl = document.createElement('li');
            result.appendChild(liEl);
            liEl.textContent = `${products[i].gName} has ${products[i].votes} votes and  ${products[i].views} views.`;
            votes.push(products[i].votes);
            views.push(products[i].views);
        }
        leftImg.removeEventListener('click', clickHandler);
        centerImg.removeEventListener('click', clickHandler);
        rightImg.removeEventListener('click', clickHandler);
    }
}
viewResults.addEventListener('click', resultsButton);
function resultsButton() {

  for (let i = 0; i < products.length; i++) {

    let liEl = document.createElement('li');
    result.appendChild(liEl);
    liEl.textContent = `${products[i].gName} has ${products[i].votes} votes and  ${products[i].views} views.`;
  }
  let liEl1 = document.createElement('li');
  result.appendChild(liEl1);
  liEl1.textContent = `..............................................................`;
}
// function chartRender() {
//     let ctx = document.getElementById('myChart').getContext('2d');
//     let myChart = new Chart(ctx, {
//         type: 'bar',
//         data: {
//             labels: gNames,
//             datasets: [{
//                 label: '# of Votes',
//                 data: votes,
//                 backgroundColor: [
//                     'rgba(255, 99, 132, 0.2)'
//                 ],
//                 borderColor: [
//                     'rgba(255, 99, 132, 1)'
//                 ],
//                 borderWidth: 1
//             }, {
//                 label: '# of views',
//                 data: views,
//                 backgroundColor: [
//                     'rgba(54, 162, 235, 0.2)'
//                 ],
//                 borderColor: [
//                     'rgba(54, 162, 235, 1)'
//                 ],
//                 borderWidth: 1
//             }]
//         },
//         options: {
//             scales: {
//                 y: {
//                     beginAtZero: true
//                 }
//             }
//         }
//     });
// }