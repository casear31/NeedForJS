const score = document.querySelector('.score');
const start = document.querySelector('.start');
const gameArea = document.querySelector('.gameArea');
const car = document.createElement('div');
car.classList.add('car');

start.addEventListener('click', startGame);

document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRigh: false,
    ArrowLeft: false,
}

const setting = {
    start: false,
    score: 0,
    speed: 3,
    traffic: 3
};

function getQuantityElementElements (heightElement) {
    return document.documentElement.clientHeight / heightElement + 1;
}

function startGame() {
    start.classList.add('hide');
    score.style.top = 0 + 'px';
    gameArea.innerHTML = '';
    
    for(let i = 0; i < getQuantityElementElements(100); i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.y = i * 100;
        line.style.top = line.y + 'px';
        gameArea.appendChild(line);
    }

    for (let i = 0; i < getQuantityElementElements(100 * setting.traffic); i++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -100 * setting.traffic * (i + 1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        enemy.style.top = enemy.y + 'px';
        enemy.style.background = 'transparent url(./image/enemy3.png) center / cover no-repeat';
        gameArea.appendChild(enemy);
        
    }

    setting.score = 0;
    setting.start = true;
    gameArea.appendChild(car);
    car.style.left= '125px';
    car.style.top = '';
    car.style.bottom= '10px';
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);
};

function moveRoad() {
    let lines = document.querySelectorAll('.line');
    lines.forEach(function(line){
        line.y += setting.speed;
        line.style.top = line.y + 'px';

        if (line.y >= document.documentElement.clientHeight){
            line.y = -100;
        }

    });

}


function moveEnemy () {
    let enemy = document.querySelectorAll('.enemy');

    enemy.forEach(function(item) {
        let carRect = car.getBoundingClientRect();
        let enemyRect = item.getBoundingClientRect()
    if(carRect.top <= enemyRect.bottom &&
        carRect.right >= enemyRect.left &&
        carRect.left <= enemyRect.right &&
        carRect.bottom >= enemyRect.top){
            setting.start = false;
            start.classList.remove('hide');
            score.style.top = start.offsetHeight + 'px';
        }

        item.y += setting.speed / 2;
        item.style.top = item.y + 'px';

        if (item.y >= document.documentElement.clientHeight){
            item.y = -100 * setting.traffic;
            item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        }

    });
}

function playGame() {

    
    if (setting.start){
        setting.score+= setting.speed;
        score.innerHTML = 'SCORE<br>' + setting.score;
        moveRoad();
        moveEnemy();
        if(keys.ArrowLeft && setting.x>0){
            setting.x -= setting.speed;
        }
        if(keys.ArrowRight && setting.x<(gameArea.offsetWidth - car.offsetWidth)){
            setting.x += setting.speed;
        }

        if(keys.ArrowUp && setting.y>0){
            setting.y -= setting.speed;
        }
        if(keys.ArrowDown  && setting.y<(gameArea.offsetHeight - car.offsetHeight)){
            setting.y += setting.speed;
        }

        car.style.left = setting.x+'px';
        car.style.top = setting.y+'px';

        requestAnimationFrame(playGame);
    }
}



function startRun(e) {
    e.preventDefault();
    keys[e.key] = true;
   
};

function stopRun(e) {
    e.preventDefault();
    keys[e.key] = false;
};