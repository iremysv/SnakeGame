const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const scoreEl = document.getElementById('currentScore');
const highScoreEl = document.getElementById('highScore');
const startScreen = document.getElementById('startScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const themeNameEl = document.getElementById('themeName');

// Game Settings
const gridSize = 20; 
const tileCount = canvas.width / gridSize;
let speed = 10; 

// Themes Data
const themes = {
    nature: {
        head: '#2E7D32',
        body: '#4CAF50',
        foodIcon: '🍎',
        name: 'Tema: Doğa Modu'
    },
    space: {
        head: '#00E5FF',
        body: '#80D8FF',
        foodIcon: '⭐',
        name: 'Tema: Uzay Modu'
    }
};

let currentTheme = themes.nature;

// State
let snake = [];
let snakeLength = 3;
let dx = 0;
let dy = -1; 
let foodX;
let foodY;
let score = 0;
let highScore = localStorage.getItem('snakeGameHighScore') || 0;
let gameLoop;
let isPlaying = false;

highScoreEl.innerText = highScore;

function resetGame() {
    snake = [];
    const startX = Math.floor(tileCount / 2);
    const startY = Math.floor(tileCount / 2);
    
    snakeLength = 4;
    dx = 0;
    dy = -1;
    score = 0;
    speed = 10;
    scoreEl.innerText = score;
    checkTheme();
    
    // Create initial snake
    for (let i = 0; i < snakeLength; i++) {
        snake.push({ x: startX, y: startY + i });
    }
    
    placeFood();
}

function checkTheme() {
    if (score >= 50) {
        currentTheme = themes.space;
        document.body.className = 'theme-space';
        themeNameEl.innerText = currentTheme.name;
    } else {
        currentTheme = themes.nature;
        document.body.className = 'theme-nature';
        themeNameEl.innerText = currentTheme.name;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * tileCount);
    foodY = Math.floor(Math.random() * tileCount);
    
    for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === foodX && snake[i].y === foodY) {
            placeFood();
            break;
        }
    }
}

function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        const isHead = i === 0;
        ctx.fillStyle = isHead ? currentTheme.head : currentTheme.body;
        
        const x = snake[i].x * gridSize;
        const y = snake[i].y * gridSize;
        const half = gridSize / 2;
        
        ctx.beginPath();
        // Yuvarlak hatlar için
        ctx.arc(x + half, y + half, half - 1, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawFood() {
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Bounce effect
    const bounce = Math.sin(Date.now() / 150) * 2;
    
    const x = foodX * gridSize + (gridSize / 2);
    const y = foodY * gridSize + (gridSize / 2) + bounce;
    
    ctx.fillText(currentTheme.foodIcon, x, y);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head); 
    
    if (head.x === foodX && head.y === foodY) {
        score += 10;
        scoreEl.innerText = score;
        if (score > highScore) {
            highScore = score;
            highScoreEl.innerText = highScore;
            localStorage.setItem('snakeGameHighScore', highScore);
        }
        
        checkTheme();
        
        if (score % 30 === 0) {
            speed += 1;
        }
        
        placeFood();
    } else {
        snake.pop(); 
    }
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function gameOver() {
    isPlaying = false;
    clearTimeout(gameLoop);
    gameOverScreen.classList.remove('hidden');
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    drawSnake();
}

function update() {
    if (!isPlaying) return;
    moveSnake();
    if (checkCollision()) {
        gameOver();
        return;
    }
    draw();
    gameLoop = setTimeout(() => {
        requestAnimationFrame(update);
    }, 1000 / speed);
}

let changingDirection = false;
document.addEventListener('keydown', (e) => {
    if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," ","Enter"].indexOf(e.key) > -1) {
        e.preventDefault();
    }
    if (e.key === 'Enter') {
        if (!isPlaying && !startScreen.classList.contains('hidden')) {
            startBtn.click();
        } else if (!isPlaying && !gameOverScreen.classList.contains('hidden')) {
            restartBtn.click();
        }
    }

    if (!isPlaying || changingDirection) return;
    
    const goingUp = dy === -1;
    const goingDown = dy === 1;
    const goingRight = dx === 1;
    const goingLeft = dx === -1;

    if ((e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') && !goingRight) { dx = -1; dy = 0; changingDirection = true; }
    if ((e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') && !goingDown) { dx = 0; dy = -1; changingDirection = true; }
    if ((e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') && !goingLeft) { dx = 1; dy = 0; changingDirection = true; }
    if ((e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') && !goingUp) { dx = 0; dy = 1; changingDirection = true; }
});

function startGame() {
    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    resetGame();
    isPlaying = true;
    update();
}

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);

const originalUpdate = update;
update = function() {
    changingDirection = false;
    originalUpdate();
};

resetGame();
draw();
