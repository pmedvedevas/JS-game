const gameViewBox = document.getElementById('game');
let hiScore;


//Player thing
const player = document.getElementById('player');

const playerObj = {
    position: window.innerWidth/2 - 50,
    score: 0,
    pace: 200,
    lives: 3,
    speed: 20,
    width: 100,
    gameOver: true,
    move(e) {
        if(e.key === 'ArrowRight' && playerObj.position < window.innerWidth*0.95 - playerObj.width){
            playerObj.position += playerObj.speed;
            player.style.left = playerObj.position.toString() + "px";
        }
        else if (e.key === 'ArrowLeft' && playerObj.position > window.innerWidth*0.05){
            playerObj.position -= playerObj.speed;
            player.style.left = playerObj.position.toString() + "px";
        }
    }
};

document.addEventListener('keydown',playerObj.move);



//Start game
const startPopUp = document.getElementById('start-pop-up');
const startButton = document.getElementById('start-button');

const initiateGame = () => {
    startPopUp.remove();
    playerObj.gameOver = false;
    player.style.width = playerObj.width.toString()+"px";
    player.style.left = playerObj.position.toString()+"px";
    game.score.innerText = 0;

    renderHeartIcons()
    spawnInterval = setInterval(() => {
        if(!playerObj.gameOver){
            gameFlow();
        }
    },playerObj.pace);
}

const renderHeartIcons = () => {
    for(let i = 0; i < playerObj.lives; i++){
        game.lives.innerHTML += game.heartIcon;
    }
}

startButton.addEventListener("click", initiateGame)


//Game Flow
const game = {
    score: document.getElementById('score'),
    lives: document.getElementById('lives'),
    heartIcon: `<svg height="24" version="1.1" width="24" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><g transform="translate(0 -1028.4)"><path d="m7 1031.4c-1.5355 0-3.0784 0.5-4.25 1.7-2.3431 2.4-2.2788 6.1 0 8.5l9.25 9.8 9.25-9.8c2.279-2.4 2.343-6.1 0-8.5-2.343-2.3-6.157-2.3-8.5 0l-0.75 0.8-0.75-0.8c-1.172-1.2-2.7145-1.7-4.25-1.7z" fill="#c0392b"/></g></svg>`
}

const gameFlow = () => {
    if(Math.random() > increasingProbability()){
        renderBlock(normalAttackBlock);
    } else {
        renderBlock(crazyAttackBlock)
    }
    if(Math.random() < 0.035) {
        renderBlock(thunderBlock);
    }
    if(Math.random() < 0.028) {
        renderBlock(truncatingBlock);
    }
    if(Math.random() < 0.007) {
        renderBlock(addLifeBlock);
    }
}


const increasingProbability = () => {
    let score = playerObj.score;
    let prob = score / 100 * 0.01;
    return prob;
}


//Game flow events

const renderBlock = (blockObj) => {
    const blockEl = document.createElement('div');
    let randomPosition = window.innerWidth*0.05 + Math.floor(Math.random() * window.innerWidth*0.90);
    blockEl.style.left = randomPosition.toString() + "px";
    blockEl.innerHTML = blockObj.icon;
    blockEl.setAttribute("class",`${blockObj.type}-block ${blockObj.type === 'crazy' ? (Math.random() < 0.5 ? 'right-crazy' : 'left-crazy') : blockObj.type }-animation`);
    gameViewBox.appendChild(blockEl);
    checkForColision(blockEl, blockObj.colisionEffect);
    setTimeout(() => {
        blockEl.remove();
        if(!playerObj.gameOver){
            playerObj.score += 10;
            score.innerText = playerObj.score;
        }
    },2900)
}

const checkForColision = (block,resolveColision) => {
    setInterval( () => {
        let blockLeft = parseInt(window.getComputedStyle(block).left);
        let blockTop = parseInt(window.getComputedStyle(block).top);
        let blockWidth = parseInt(window.getComputedStyle(block).width);
        let blockHeight = parseInt(window.getComputedStyle(block).height);
        let playerLeft = parseInt(window.getComputedStyle(player).left);
        let playerTop = parseInt(window.getComputedStyle(player).top);
        let playerHeight = parseInt(window.getComputedStyle(player).height);
        
        if(blockTop + blockHeight>= playerTop && blockTop < playerTop + playerHeight && blockLeft + blockWidth > playerLeft && blockLeft < playerLeft + playerObj.width){
            block.remove();
            resolveColision();
        }
    },10)
}

const normalAttackBlock = {
    type: 'normal',
    icon: '',
    colisionEffect(){
        playerObj.lives--;
        game.lives.innerHTML = '';
        renderHeartIcons();
        if(playerObj.lives < 1) {
            gameOver();
        }
    }
}

const crazyAttackBlock = {
    type: 'crazy',
    icon: '',
    colisionEffect(){
        playerObj.lives--;
        game.lives.innerHTML = '';
        renderHeartIcons();
        if(playerObj.lives < 1) {
            gameOver();
        }
    }
}

const thunderBlock = {
    type: 'thunder',
    icon: `<svg height="20px" viewBox="0 0 40 40" width="20px" xmlns="http://www.w3.org/2000/svg"><title/><polygon fill="#ffff00" points="32.468 11.421 14.996 31.098 25.566 31.222 21.677 46.443 40.508 26.496 28.799 26.496 32.468 11.421"/></svg>`,
    colisionEffect(){
        playerObj.speed +=10;
        setTimeout(() => {
            playerObj.speed -=10;
        }, 15000);
    }
}

const addLifeBlock = {
    type: 'addLife',
    icon: `<svg height="24" version="1.1" width="24" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><g transform="translate(0 -1028.4)"><path d="m7 1031.4c-1.5355 0-3.0784 0.5-4.25 1.7-2.3431 2.4-2.2788 6.1 0 8.5l9.25 9.8 9.25-9.8c2.279-2.4 2.343-6.1 0-8.5-2.343-2.3-6.157-2.3-8.5 0l-0.75 0.8-0.75-0.8c-1.172-1.2-2.7145-1.7-4.25-1.7z" fill="#00ff80"/></g></svg>`,
    colisionEffect(){
        playerObj.lives += 1;
        game.lives.innerHTML = '';
        renderHeartIcons();
    }
}

const truncatingBlock = {
    type: 'trunc',
    icon: '',
    colisionEffect(){
        if(playerObj.width > 20) {
            playerObj.width -= 20;
            setTimeout(() => {
                playerObj.width +=20;
                player.style.width = playerObj.width.toString()+"px"
            }, 30000);
            player.style.width = playerObj.width.toString()+"px"
        }
    }
}

//gameOver

const gameOver = () => {
    playerObj.gameOver = true;
    freezeAnimtation();
    updateHiScore();
    generatePopUp();
}

const freezeAnimtation = () => {
    const typeOfBlocksArray = ['normal','crazy','thunder','addLide','trunc'];
    typeOfBlocksArray.forEach( type => {
        let typeArray = document.getElementsByClassName(`${type}-block`);
        for(const item of typeArray){
            item.classList.remove(`${type}-animation`);
            item.classList.add('hide');
        }
    });
}

const updateHiScore = () => {
    hiScore = JSON.parse(localStorage.getItem('score'));
    if(playerObj.score > hiScore || !hiScore) {
        localStorage.setItem('score', JSON.stringify(playerObj.score));
    }
    hiScore = JSON.parse(localStorage.getItem('score'));
}

const generatePopUp = () => {
    if(!document.getElementById('pop-up')){
        const popUp = document.createElement('div');
        popUp.innerHTML = `<h2>Game Over!</h2>
        <p>Your Score: ${playerObj.score}</p>
        <p>High Score: ${hiScore}</p>
        <form><button id="try-again">New Game</button></form>
        `;
        popUp.setAttribute('id','pop-up');
        gameViewBox.appendChild(popUp);
    }
}

