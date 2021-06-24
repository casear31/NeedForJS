const score = document.querySelector('.score');
const start = document.querySelector('.start');
const gameArea = document.querySelector('.gameArea');
const car = document.createElement('div');
car.classList.add('car');

start.addEventListener('click', startGame);

document.addEventListener('click', startRun);
document.addEventListener('click', stopRun);

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRigh: false,
    ArrowLeft: false,
}

const setting = {
    start: false,
    score: 0,
    spped: 3
};

function startGame() {
    start.classList.add('hide');
    setting.start = true;
    gameArea.appendChild(car);
    requestAnimationFrame(playgame);
};


function playGame() {
    if (setting.start === true){
        requestAnimationFrame(playgame);
    }
}



function startRun(e) {
    e.preventDefault();
    Keys[e.key] = true;
   
};

function stopRun() {
    e.preventDefault();
    Keys[e.key] = false;
};