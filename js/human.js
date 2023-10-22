// creating humans
const world = document.querySelector('.world');

const Names = [
  "Jordan",
  "Taylor",
  "Avery",
  "Morgan",
  "Riley",
  "Casey",
  "Alex",
  "Skyler",
  "Bailey",
  "Reese",
  "Sage",
  "Dakota",
  "Zahra",
  "Jamal",
  "Soraya"
];




function createHuman() {
  const human = document.createElement('div');
  human.classList.add('human');

  const head = document.createElement('div');
  head.classList.add('head');

  const popup = document.createElement('div');
  popup.classList.add('popup');

  const mouth = document.createElement('div');
  mouth.classList.add('mouth');

  const body = document.createElement('div');
  body.classList.add('body');

  const arms = document.createElement('div');
  arms.classList.add('arms');

  const leftArm = document.createElement('div');
  leftArm.classList.add('arm', 'left');

  const rightArm = document.createElement('div');
  rightArm.classList.add('arm', 'right');

  const legs = document.createElement('div');
  legs.classList.add('legs');

  const leftLeg = document.createElement('div');
  leftLeg.classList.add('leg', 'left');

  const rightLeg = document.createElement('div');
  rightLeg.classList.add('leg', 'right');

  // Append the elements to create the human structure
  arms.appendChild(leftArm);
  arms.appendChild(rightArm);
  legs.appendChild(leftLeg);
  legs.appendChild(rightLeg);
  head.appendChild(mouth);
  head.appendChild(popup);
  human.appendChild(head);
  human.appendChild(body);
  human.appendChild(arms);
  human.appendChild(legs);

  // random body sizes
  const randomHeight = Math.floor(Math.random() * 16) + 10; // Random height between 10 and 25 pixels
  body.style.height = randomHeight + 'px';
  leftArm.style.height = (randomHeight - 4) + 'px';
  rightArm.style.height = (randomHeight - 4) + 'px';
  leftLeg.style.height = (randomHeight) + 'px';
  rightLeg.style.height = (randomHeight) + 'px';

  // random colors for shirt and pants
  const randomColorForShirt = "#" + Math.floor(Math.random() * 16777215).toString(16);
  const randomColorForLegs = "#" + Math.floor(Math.random() * 16777215).toString(16);
  body.style.backgroundColor = randomColorForShirt;
  body.style.borderColor = randomColorForShirt;
  leftLeg.style.backgroundColor = randomColorForLegs;
  rightLeg.style.backgroundColor = randomColorForLegs;

  //adding female hairs
  const hasHairs = Math.random() < 0.5;
  if (hasHairs) {
    head.style.borderLeft = '3px solid black';
    head.style.borderRight = '3px solid black';
  } else {
    head.style.borderTop = '7px solid black';
  }

  // Generate a random name and age
  const randomName = Names[Math.floor(Math.random() * Names.length)];
  const randomAge = randomHeight;

  // Set custom attributes to store the name and age
  human.setAttribute('human-name', randomName);
  human.setAttribute('human-age', randomAge);


  // Create the "human-info" div and its child elements
  const humanInfo = document.createElement('div');
  humanInfo.classList.add('human-info');
  const nameElement = document.createElement('div');
  nameElement.classList.add('name');
  nameElement.textContent = randomName;
  const ageElement = document.createElement('div');
  ageElement.classList.add('age');
  ageElement.textContent = randomAge;
  humanInfo.appendChild(nameElement);
  humanInfo.appendChild(ageElement);

  // Append the "human-info" div to the human
  human.appendChild(humanInfo);

  console.log('name: ' + randomName);
  // Append the human to the world
  world.appendChild(human);
}

function popupTextRandomly() {
  const popups = document.querySelectorAll('.popup');

  // Generate two random indexes within the range of the popups
  const index1 = getRandomIndex(popups.length);
  let index2 = getRandomIndex(popups.length);

  // Ensure that index2 is different from index1
  while (index2 === index1) {
    index2 = getRandomIndex(popups.length);
  }
  // Clear the text for all popups
  popups.forEach(popup => {
    popup.textContent = '';
  });
  // Update the text for the selected popups
  popups[index1].textContent = getRandomGreeting();
  popups[index2].textContent = getRandomGreeting();
}

function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}


setInterval(popupTextRandomly, 5000);

function getRandomGreeting() {
  const greetings = ["Yay!", "Snow!", "Rain!", "Awsome!", "Magical!"];
  const randomIndex = Math.floor(Math.random() * greetings.length);
  return greetings[randomIndex];
}



const initialHumanCount = 15;
for (let i = 0; i < initialHumanCount; i++) {
  createHuman();
}


// moving humans
const humans = document.querySelectorAll('.human');
let currentX = new Array(humans.length).fill(0);
let currentY = new Array(humans.length).fill(0);
let legAnimations = new Array(humans.length);

function randomWalkForHuman(humanIndex) {
  let targetX, targetY;

  // Check if the screen width is less than a certain value (e.g., 768px for a typical tablet)
  if (window.innerWidth <= 768) {
    //person moving  coordinates for mobile 
    targetX = Math.floor(Math.random() * 300 - 150);
    targetY = Math.floor(Math.random() * 80 + 430);
  } else {
    //person moving coordinates for laptops
    targetX = Math.floor(Math.random() * 1350 - 675);
    targetY = Math.floor(Math.random() * 100 + 420);
  }
  console.log(targetX, targetY);
  moveTowards(targetX, targetY, humanIndex);
}



function getRandomSpeed() {
  return Math.random() * 1.5 + 0.5; // Generates a random number between 0.5 and 2
}
const speeds = [];
for (let humanIndex = 0; humanIndex < initialHumanCount; humanIndex++) {
  speeds[humanIndex] = getRandomSpeed();
}
function moveTowards(targetX, targetY, humanIndex) {
  const speed = speeds[humanIndex];  // moving speed  speeds[humanIndex]
  const deltaX = targetX - currentX[humanIndex];
  const deltaY = targetY - currentY[humanIndex];
  const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
  const stepX = speed * (deltaX / distance);
  const stepY = speed * (deltaY / distance);

  const isWalking = Math.abs(targetX - currentX[humanIndex]) > Math.abs(stepX) ||
    Math.abs(targetY - currentY[humanIndex]) > Math.abs(stepY);

  if (isWalking) {
    animateLegs(humanIndex, true); // Start walking animation
  } else {
    animateLegs(humanIndex, false); // Stop walking animation
  }

  if (Math.abs(targetX - currentX[humanIndex]) <= Math.abs(stepX) && Math.abs(targetY - currentY[humanIndex]) <= Math.abs(stepY)) {
    currentX[humanIndex] = targetX;
    currentY[humanIndex] = targetY;
    humans[humanIndex].style.transform = `translate(${currentX[humanIndex]}px, ${currentY[humanIndex]}px)`;

    // No need to stop the leg animation here; it will be controlled by isWalking
    setTimeout(() => {
      randomWalkForHuman(humanIndex);
    }, getRandomTimeout()); // stoping time
  } else {
    currentX[humanIndex] += stepX;
    currentY[humanIndex] += stepY;
    humans[humanIndex].style.transform = `translate(${currentX[humanIndex]}px, ${currentY[humanIndex]}px)`;
    requestAnimationFrame(() => moveTowards(targetX, targetY, humanIndex));
  }
}
function getRandomTimeout() {
  return Math.floor(Math.random() * 3900) + 100; // Generates a random number between 100 and 4000
}

function animateLegs(humanIndex, isWalking) {
  const human = humans[humanIndex];
  const leftLeg = human.querySelector('.leg.left');
  const rightLeg = human.querySelector('.leg.right');
  const arms = human.querySelector('.arm');
  if (isWalking) {
    leftLeg.classList.add('walk');
    rightLeg.classList.add('walk');
    arms.classList.remove('wave');
  } else {
    leftLeg.classList.remove('walk');
    rightLeg.classList.remove('walk');
    arms.classList.add('wave');
  }
}



humans.forEach((human, index) => {
  randomWalkForHuman(index);
  legAnimations[index] = requestAnimationFrame(() => animateLegs(index));
});


// adding human data

humans.forEach(human => {
  const infoDiv = human.querySelector('.human-info');
  const name = human.getAttribute('human-name');
  const age = human.getAttribute('human-age');

  human.addEventListener('mouseover', () => {
    console.log('mouse over');
    // Extract the name and age attributes from the currently hovered human

      const nameElement = infoDiv.querySelector('.name');
      const ageElement = infoDiv.querySelector('.age');

        nameElement.textContent = name;
        ageElement.textContent = age;
        infoDiv.classList.add('show');
  });

  human.addEventListener('mouseout', () => {
    console.log('mouse out');
    infoDiv.classList.remove('show');
  });
});
