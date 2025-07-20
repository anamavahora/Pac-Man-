const grid = document.getElementById('game');
const scoreDisplay = document.getElementById('score');
const width = 20;
let score = 0;

// Load sound effects
const eatSound = new Audio('sounds/eat.wav');
const moveSound = new Audio('sounds/move.wav');
const bumpSound = new Audio('sounds/bump.wav');
const bgMusic = new Audio('sounds/bg-music.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.3;
bgMusic.play();

const layout = [
  // 0 = pac-dot, 1 = wall, 2 = ghost, 3 = empty
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,1,
  1,0,1,1,1,0,1,1,1,1,0,1,1,1,0,1,1,1,0,1,
  1,0,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,1,0,1,
  1,1,1,0,1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,
  1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,
  1,0,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,
  1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,1,
  1,1,1,1,1,0,1,1,1,2,2,2,1,1,0,1,1,1,1,1,
  1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,
  1,0,1,0,1,1,1,1,0,1,1,1,1,1,0,1,0,1,0,1,
  1,0,1,0,0,0,0,1,0,0,0,0,0,1,0,1,0,1,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,1,0,1,1,1,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
];

const squares = [];

function createBoard() {
  for (let i = 0; i < layout.length; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    grid.appendChild(square);
    squares.push(square);

    if (layout[i] === 1) square.classList.add('wall');
    else if (layout[i] === 0) square.classList.add('pac-dot');
    else if (layout[i] === 2) square.classList.add('ghost');
  }
}
createBoard();

let pacmanIndex = 21;
squares[pacmanIndex].classList.add('pacman');

function movePacman(e) {
  squares[pacmanIndex].classList.remove('pacman');

  let nextIndex = pacmanIndex;
  let moved = false;

  switch(e.key) {
    case 'ArrowLeft':
      if (pacmanIndex % width !== 0) nextIndex -= 1;
      break;
    case 'ArrowUp':
      if (pacmanIndex - width >= 0) nextIndex -= width;
      break;
    case 'ArrowRight':
      if (pacmanIndex % width < width - 1) nextIndex += 1;
      break;
    case 'ArrowDown':
      if (pacmanIndex + width < layout.length) nextIndex += width;
      break;
  }

  // Check for wall
  if (!squares[nextIndex].classList.contains('wall')) {
    pacmanIndex = nextIndex;
    moveSound.currentTime = 0;
    moveSound.play();
    moved = true;
  } else {
    bumpSound.currentTime = 0;
    bumpSound.play();
  }

  eatDot();
  squares[pacmanIndex].classList.add('pacman');
}

document.addEventListener('keydown', movePacman);

function eatDot() {
  if (squares[pacmanIndex].classList.contains('pac-dot')) {
    squares[pacmanIndex].classList.remove('pac-dot');
    score++;
    eatSound.currentTime = 0;
    eatSound.play();
    scoreDisplay.textContent = `Score: ${score}`;
  }
}
