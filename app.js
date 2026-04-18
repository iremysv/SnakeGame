const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const scoreEl = document.getElementById('currentScore');
const highScoreEl = document.getElementById('highScore');
const startScreen = document.getElementById('startScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');

// Game Settings
const gridSize = 20; // 30x30 grid (600/20)
const tileCount = canvas.width / gridSize;
let speed = 12; // Initial speed (frames per second approx)

// Cyber theme colors
const colors = {
    head: '#00FF00', // Neon green
    body: '#008000', // Darker neon green
    food: '#FF0000', // Neon red
    grid: 'rgba(0, 50, 0, 0.15)'
};

// State
let snake = [];
let snakeLength = 4;
let dx = 0;
let dy = -1; // Start moving up
let foodX;
let foodY;
let score = 0;
let highScore = localStorage.getItem('cyberSnakeHighScore') || 0;
let gameLoop;
let isPlaying = false;

// Initialization
highScoreEl.innerText = highScore;

function resetGame() {
    snake = [];
    const startX = Math.floor(tileCount / 2);
    const startY = Math.floor(tileCount / 2);
    
    snakeLength = 4;
    dx = 0;
    dy = -1;
    score = 0;
    speed = 12;
    scoreEl.innerText = score;
    
    // Create initial snake
    for (let i = 0; i < snakeLength; i++) {
        snake.push({ x: startX, y: startY + i });
    }
    
    placeFood();
}

function placeFood() {
    foodX = Math.floor(Math.random() * tileCount);
    foodY = Math.floor(Math.random() * tileCount);
    
    // Make sure food is not on snake
    for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === foodX && snake[i].y === foodY) {
            placeFood();
            break;
        }
    }
}

function drawGrid() {
    ctx.strokeStyle = colors.grid;
    ctx.lineWidth = 1;
    for (let i = 0; i < tileCount; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, canvas.height);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(canvas.width, i * gridSize);
        ctx.stroke();
    }
}

function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        const isHead = i === 0;
        ctx.fillStyle = isHead ? colors.head : colors.body;
        
        const padding = isHead ? 0 : 1;
        const x = snake[i].x * gridSize + padding;
        const y = snake[i].y * gridSize + padding;
        const size = gridSize - (padding * 2);
        
        ctx.fillRect(x, y, size, size);
        
        // Add neon glow to head
        if (isHead) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = colors.head;
            ctx.fillRect(x, y, size, size);
            ctx.shadowBlur = 0; // Reset
        }
    }
}

function drawFood() {
    ctx.fillStyle = colors.food;
    ctx.shadowBlur = 15;
    ctx.shadowColor = colors.food;
    
    // Pulse effect
    const pulse = Math.abs(Math.sin(Date.now() / 200)) * 2;
    const padding = 2 - pulse;
    
    ctx.fillRect(
        foodX * gridSize + padding, 
        foodY * gridSize + padding, 
        gridSize - (padding * 2), 
        gridSize - (padding * 2)
    );
    ctx.shadowBlur = 0; // Reset
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head); // Add new head
    
    // Check if food eaten
    if (head.x === foodX && head.y === foodY) {
        score += 10;
        scoreEl.innerText = score;
        if (score > highScore) {
            highScore = score;
            highScoreEl.innerText = highScore;
            localStorage.setItem('cyberSnakeHighScore', highScore);
        }
        
        // Increase speed slightly
        if (score % 50 === 0) {
            speed += 1;
        }
        
        placeFood();
        // Don't pop tail, so it grows
    } else {
        snake.pop(); // Remove tail
    }
}

function checkCollision() {
    const head = snake[0];
    
    // Wall collision (Firewall)
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        return true;
    }
    
    // Self collision
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
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawGrid();
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
    
    // Standard game loop timing
    gameLoop = setTimeout(() => {
        requestAnimationFrame(update);
    }, 1000 / speed);
}

// Input handling
let changingDirection = false;
document.addEventListener('keydown', (e) => {
    // Prevent default scrolling for arrows and space/enter
    if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," ","Enter"].indexOf(e.key) > -1) {
        e.preventDefault();
    }
    
    // Start / Restart via Enter
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

    if ((e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') && !goingRight) {
        dx = -1;
        dy = 0;
        changingDirection = true;
    }
    if ((e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') && !goingDown) {
        dx = 0;
        dy = -1;
        changingDirection = true;
    }
    if ((e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') && !goingLeft) {
        dx = 1;
        dy = 0;
        changingDirection = true;
    }
    if ((e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') && !goingUp) {
        dx = 0;
        dy = 1;
        changingDirection = true;
    }
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

// Allow next input only after current frame is drawn
const originalUpdate = update;
update = function() {
    changingDirection = false;
    originalUpdate();
};

// Initial draw behind the start screen
resetGame();
draw();
