const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    {
        threshold: 0.15
    }
);

document.querySelectorAll(".fade-in").forEach((el) => {
    observer.observe(el);
});

const roles = [
    "M.Tech ICT Student",
    "Backend Developer",
    "Machine Learning Researcher",
    "Aspiring Product Manager"
];

const roleElement = document.getElementById("changing-role");

let currentRole = 0;

setInterval(() => {

    roleElement.classList.add("role-enter");

    setTimeout(() => {

        currentRole = (currentRole + 1) % roles.length;

        roleElement.textContent = roles[currentRole];

        roleElement.classList.remove("role-enter");

    }, 300);

}, 2500);

document.querySelectorAll(".project-card, .skill-card, .about-box").forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 4;
        const rotateX = ((y / rect.height) - 0.5) * -4;

        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-5px)`;
    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0)";
    });
});

const resumeSection = document.querySelector(".resume-heading");

const resumeObserver = new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            resumeSection.classList.add("animate");

        }
    });

},

{
    threshold:.5
}
);

resumeObserver.observe(resumeSection);

/* ======================
   SNAKE GAME
====================== */
function playSound(freq, duration){

    const audioCtx =
        new (window.AudioContext ||
             window.webkitAudioContext)();

    const oscillator =
        audioCtx.createOscillator();

    const gain =
        audioCtx.createGain();

    oscillator.connect(gain);
    gain.connect(audioCtx.destination);

    oscillator.frequency.value = freq;

    oscillator.type = "square";

    oscillator.start();

    gain.gain.setValueAtTime(
        0.05,
        audioCtx.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audioCtx.currentTime +
        duration/1000
    );

    oscillator.stop(
        audioCtx.currentTime +
        duration/1000
    );
}

document.addEventListener("DOMContentLoaded", () => {

    const snakeTrigger =
        document.getElementById("snakeTrigger");

    const snakeModal =
        document.getElementById("snakeModal");

    const canvas =
        document.getElementById("snakeCanvas");

    if(!canvas){
        console.error(
            "snakeCanvas not found"
        );
        return;
    }

    const ctx = canvas.getContext("2d");

    const scoreDisplay = document.getElementById("scoreDisplay");
    const gameOverScreen = document.getElementById("gameOverScreen");
    const finalScore = document.getElementById("finalScore");
    const restartButton = document.getElementById("restartGame");
    const closeGameBtn =document.getElementById("closeGameBtn");

    const upBtn =document.getElementById("upBtn");

    const downBtn =document.getElementById("downBtn");

    const leftBtn =document.getElementById("leftBtn");

    const rightBtn =document.getElementById("rightBtn");

    const tileSize = 20;
    const tileCount = 30;

    let snake;
    let food;
    let velocityX;
    let velocityY;
    let score;
    let interval;
    let gameRunning = false;

    function resetGame() {

        snake = [
            { x: 15, y: 15 }
        ];

        velocityX = 1;
        velocityY = 0;

        score = 0;

        food = randomFood();

        scoreDisplay.textContent = `SCORE: ${score}`;

        gameOverScreen.classList.remove("show");
    }

    function randomFood() {

        return {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
    }

    function drawGame() {

        ctx.fillStyle = "#111";
        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        ctx.fillStyle = "#fff";

        snake.forEach(part => {

            ctx.fillRect(
                part.x * tileSize,
                part.y * tileSize,
                tileSize - 2,
                tileSize - 2
            );
        });

        ctx.fillRect(
            food.x * tileSize,
            food.y * tileSize,
            tileSize - 2,
            tileSize - 2
        );
    }

    function updateGame() {

        const head = {
            x: snake[0].x + velocityX,
            y: snake[0].y + velocityY
        };

        if (
            head.x < 0 ||
            head.y < 0 ||
            head.x >= tileCount ||
            head.y >= tileCount
        ) {
            gameOver();
            return;
        }

        for (let i = 0; i < snake.length; i++) {

            if (head.x === snake[i].x &&head.y === snake[i].y ) {
                gameOver();
                return;
            }
        }

        snake.unshift(head);

        if (head.x === food.x &&head.y === food.y) {
            playSound(800,80);
            score++;

            scoreDisplay.textContent =
                `SCORE: ${score}`;

            food = randomFood();

        } else {

            snake.pop();
        }

        drawGame();
    }

    function gameOver() {
        playSound(120,500);
        clearInterval(interval);

        gameRunning = false;

        finalScore.textContent =
            `FINAL SCORE: ${score}`;

        gameOverScreen.classList.add("show");
    }

    function startGame() {

        clearInterval(interval);

        resetGame();

        drawGame();

        interval = setInterval(
            updateGame,
            120
        );

        gameRunning = true;
    }

    snakeTrigger.addEventListener("click", () => {

        snakeModal.classList.add("active");

        startGame();
    });

    restartButton.addEventListener(
        "click",
        startGame
    );

    closeGameBtn.addEventListener(
        "click",
        () => {

            snakeModal.classList.remove("active");

            clearInterval(interval);

            gameRunning = false;
        }
    );

    upBtn.addEventListener("click",()=>{
        playSound(400,50);
        if(velocityY!==1){

            velocityX=0;
            velocityY=-1;
        }
    });

    downBtn.addEventListener("click",()=>{
        playSound(400,50);
        if(velocityY!==-1){

            velocityX=0;
            velocityY=1;
        }
    });

    leftBtn.addEventListener("click",()=>{
        playSound(400,50);
        if(velocityX!==1){

            velocityX=-1;
            velocityY=0;
        }
    });

    rightBtn.addEventListener("click",()=>{
        playSound(400,50);
        if(velocityX!==-1){

            velocityX=1;
            velocityY=0;
        }
    });
    document.addEventListener("keydown", e => {

        if (e.key === "Escape") {

            snakeModal.classList.remove("active");

            clearInterval(interval);

            gameRunning = false;

            return;
        }

        if (!gameRunning) return;

        switch (e.key.toLowerCase()) {

            case "arrowup":
            case "w":
                playSound(400,50);
                if (velocityY !== 1) {
                    velocityX = 0;
                    velocityY = -1;
                }
                break;

            case "arrowdown":
            case "s":
                playSound(400,50);
                if (velocityY !== -1) {
                    velocityX = 0;
                    velocityY = 1;
                }
                break;

            case "arrowleft":
            case "a":
                playSound(400,50);
                if (velocityX !== 1) {
                    velocityX = -1;
                    velocityY = 0;
                }
                break;

            case "arrowright":
            case "d":
                playSound(400,50);
                if (velocityX !== -1) {
                    velocityX = 1;
                    velocityY = 0;
                }
                break;
        }
    });
});

// Toggle
const themeToggle =
    document.getElementById("themeToggle");

const savedTheme =
    localStorage.getItem("theme");

if(savedTheme==="dark"){

    document.body.classList.add(
        "dark"
    );
}

themeToggle.addEventListener(
    "click",
    ()=>{

        document.body.classList.toggle(
            "dark"
        );

        localStorage.setItem(
            "theme",
            document.body.classList.contains(
                "dark"
            )
            ? "dark"
            : "light"
        );
    }
);

/* =====================================
   Easter Egg 1 — Tab Title Change
===================================== */

const originalTitle = document.title;

document.addEventListener(
    "visibilitychange",
    () => {

        if(document.hidden){

            document.title =
                "come back 👀";

        }else{

            document.title =
                originalTitle;
        }
    }
);

/* =====================================
   Easter Egg 2 — Idle Cursor
===================================== */


document.addEventListener("DOMContentLoaded", () => {
    const IDLE_TIMEOUT = 10000;
    
    let idleTimer;
    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;
    
    const idleCursor =
        document.getElementById(
            "idle-cursor"
        );
    
    if(!idleCursor){
    
        console.error(
            "idle-cursor not found"
        );
    }
    
    function enterIdle(){

        document.body.classList.add(
            "idle"
        );

        idleCursor.style.display =
            "block";

        document.body.style.cursor =
            "none";
    }
    
    function exitIdle(){

        document.body.classList.remove(
            "idle"
        );

        idleCursor.style.display =
            "none";

        document.body.style.cursor =
            "";
    }
    
    function resetIdle(){
    
        exitIdle();
    
        clearTimeout(idleTimer);
    
        idleTimer = setTimeout(
            enterIdle,
            IDLE_TIMEOUT
        );
    }
    
    document.addEventListener(
        "mousemove",
        (e)=>{
    
            lastX = e.clientX;
            lastY = e.clientY;
    
            resetIdle();
        }
    );
    
    document.addEventListener(
        "touchstart",
        resetIdle
    );
    
    document.addEventListener(
        "touchmove",
        resetIdle
    );
    
    resetIdle();
});

/* =====================================
   Easter Egg 3 — Late Night Toast
===================================== */
document.addEventListener("DOMContentLoaded", () => {

    const currentHour =
        new Date().getHours();

    const nightToast =
        document.getElementById("night-toast");

    const messages = [
        "> developer_mode: active 🌙",
        "> sleep.exe not responding",
        "> caffeine detected ☕",
        "> still debugging at midnight?",
        "> productivity boost enabled"
    ];

    if(currentHour >= 23 || currentHour <= 4){
    // if(true){
        setTimeout(() => {

            if(!nightToast) return;

            const message =
                messages[
                    Math.floor(
                        Math.random() *
                        messages.length
                    )
                ];

            nightToast.textContent = "";

            nightToast.classList.add("show");

            let i = 0;

            const typing = setInterval(() => {

                nightToast.textContent +=
                    message.charAt(i);

                i++;

                if(i >= message.length){

                    clearInterval(typing);
                }

            },40);

            setTimeout(() => {

                nightToast.classList.remove(
                    "show"
                );

            },5000);

        },2000);
    }

});