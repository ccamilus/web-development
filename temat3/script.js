const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const framesPerSecond = 5;
let gameOver = false;

const food = {
    x: 23,
    y: 12,
    radius: 9,
};

function drawFood() {
    ctx.beginPath();
    ctx.arc(food.x * 20 + 10, food.y * 20 + 10, food.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#c7372f";
    ctx.fill();
}

function updateFoodPosition() {
    food.x = getRandomPosition(0, 31);
    food.y = getRandomPosition(0, 23);
}

const snake = {
    snakeParts: [
        { x: 8, y: 12 },
        { x: 7, y: 12 },
    ],
    movingDirection: "right",
};

function drawSnake() {
    snake.snakeParts.forEach((snakePart) => {
        ctx.fillStyle = "#004f1c";
        ctx.fillRect(snakePart.x * 20, snakePart.y * 20, 20, 20);
    });
}

function moveSnake() {
    const currentHead = snake.snakeParts[0];
    let temporary_x = currentHead.x;
    let temporary_y = currentHead.y;
    if (snake.movingDirection === "right") {
        temporary_x += 1;
    } else if (snake.movingDirection === "left") {
        temporary_x -= 1;
    } else if (snake.movingDirection === "down") {
        temporary_y += 1;
    } else if (snake.movingDirection === "up") {
        temporary_y -= 1;
    }
    snake.snakeParts.unshift({
        x: temporary_x,
        y: temporary_y,
    });
    if (snake.snakeParts[0].x === food.x && snake.snakeParts[0].y === food.y) {
        updateFoodPosition();
    } else {
        snake.snakeParts.pop();
    }
}

function checkCollisions() {
    const snakeHead = snake.snakeParts[0];
    if (
        snakeHead.x < 0 ||
        snakeHead.x > 31 ||
        snakeHead.y < 0 ||
        snakeHead.y > 23
    ) {
        gameOver = true;
    }
}

function update() {
    checkCollisions();
    if (gameOver) {
        ctx.font = "40px sans-serif";
        ctx.textAlign = "center";
        ctx.fillStyle = "#000";
        ctx.fillText("game over!", 320, 100);
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawFood();
        drawSnake();
        moveSnake();
    }
    setTimeout(() => {
        requestAnimationFrame(update);
    }, 1000 / framesPerSecond);
}

function keyDown(e) {
    if (e.key === "ArrowRight" || e.key === "Right") {
        snake.movingDirection = "right";
    } else if (e.key === "ArrowLeft" || e.key === "Left") {
        snake.movingDirection = "left";
    } else if (e.key === "ArrowUp" || e.key === "Up") {
        snake.movingDirection = "up";
    } else if (e.key === "ArrowDown" || e.key === "Down") {
        snake.movingDirection = "down";
    }
}

update();

document.addEventListener("keydown", keyDown);

function getRandomPosition(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
