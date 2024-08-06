document.addEventListener('DOMContentLoaded', () => {
    const player = document.querySelector('.player');
    const obstacle = document.querySelector('.obstacle');
    const gameContainer = document.querySelector('.game-container');
    const scoreDisplay = document.querySelector('.score');
    let isJumping = false;
    let isGameOver = false;
    let score = 0;

    function jump() {
        if (isJumping) return;
        isJumping = true;
        let jumpHeight = 0;
        let upInterval = setInterval(() => {
            if (jumpHeight >= 60) {
                clearInterval(upInterval);
                let downInterval = setInterval(() => {
                    if (jumpHeight <= 0) {
                        clearInterval(downInterval);
                        isJumping = false;
                    }
                    player.style.bottom = `${parseInt(player.style.bottom) - 4}px`;
                    jumpHeight -= 4;
                }, 20);
            }
            player.style.bottom = `${parseInt(player.style.bottom) + 4}px`;
            jumpHeight += 4;
        }, 20);
    }

    function generateObstacle() {
        if (isGameOver) return;
        let obstaclePosition = gameContainer.getBoundingClientRect().width;
        obstacle.style.right = `-20px`;
        obstacle.style.display = 'block';

        let timer = setInterval(() => {
            if (isGameOver) {
                clearInterval(timer);
                return;
            }
            if (obstaclePosition <= -20) {
                obstaclePosition = gameContainer.getBoundingClientRect().width;
                score++;
                scoreDisplay.textContent = score;
            }
            if (checkCollision(player, obstacle)) {
                clearInterval(timer);
                isGameOver = true;
                alert(`Game Over! Your score: ${score}`);
                obstacle.style.display = 'none';
            }
            obstaclePosition -= 5;
            obstacle.style.right = `${obstaclePosition}px`;
        }, 20);
    }

    function checkCollision(player, obstacle) {
        const playerRect = player.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();

        return !(
            playerRect.top > obstacleRect.bottom ||
            playerRect.bottom < obstacleRect.top ||
            playerRect.right < obstacleRect.left ||
            playerRect.left > obstacleRect.right
        );
    }

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' || e.code === 'ArrowUp') jump();
    });

    document.addEventListener('touchstart', () => {
        jump();
    });

    generateObstacle();
});
