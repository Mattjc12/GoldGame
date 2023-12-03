const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext("2d");
var score = 0;


let player = {
    x: 100,
    y: 100,
    radius: 20,
    speed: 10,
    color: "green",
  };

enemies = []; // red blob array
let yellowBlobs = []; // Yellow blob array

let upPressed = false;
let leftPressed = false;
let rightPressed = false;
let downPressed = false;

//Game Loop
function drawGame() {
    requestAnimationFrame(drawGame);
clearScreen();
inputs();
boundaryCheck();
drawCharacter();
drawEnemies();
moveEnemies();
drawYellowBlobs();
checkCollisions();
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText("Score: " + score, 20, 20);
}

function initializeGame () {
    player.x = canvas.width / 2;
    player.y = canvas.height / 2;
    enemies = [];
    var score = 0;
    yellowBlobs = [];
    upPressed = false;
    downPressed = false;
    leftPressed = false;
    rightPressed = false;
    for (let i = 0; i < 5; i++) {
        enemies.push(createEnemy());
    }

    for (let i = 0; i < 3; i++) {
        yellowBlobs.push(createYellowBlob());
    }
}

function drawYellowBlobs() {
    for (let yellowBlob of yellowBlobs) {
      ctx.fillStyle = yellowBlob.color;
      ctx.beginPath();
      ctx.arc(yellowBlob.x, yellowBlob.y, yellowBlob.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

function createEnemy() {

    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 15,
        speed: 2,
        color: "red",

    };
}

function createYellowBlob() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 10,
        color: "yellow",
    };
}

function moveEnemies() {
for (let enemy of enemies) {
if (player.x < enemy.x) enemy.x -= enemy.speed;
else enemy.x += enemy.speed;

if (player.y < enemy.y) enemy.y -= enemy.speed;
else enemy.y += enemy.speed;
}
}

function drawEnemies() {
for (let enemy of enemies) {
    ctx.fillStyle = enemy.color;
    ctx.beginPath();
    ctx.arc(enemy.x, enemy.y, enemy.radius, 0, Math.PI * 2);
    ctx.fill();
}
}

function doChange() {
    var myInput = document.getElementById('myInput').value;
    document.getElementById('score').innerHTML = myInput;
}


function checkCollisions() {
    for (let enemy of enemies) {
      if (isCollision(player, enemy)) {
        alert("Game Over :(");
        let enemies = [];
        initializeGame();
      }
    }

  // Check collision with yellow blobs
  for (let i = 0; i < yellowBlobs.length; i++) {
    if (isCollision(player, yellowBlobs[i])) {
      // Increase score
      score++;
      
      // Respawn the yellow blob at a new random position
      yellowBlobs[i].x = Math.random() * canvas.width;
      yellowBlobs[i].y = Math.random() * canvas.height;
    }
  }
  
}

function isCollision(obj1, obj2) {
    const distance = Math.sqrt(
      Math.pow(obj1.x - obj2.x, 2) + Math.pow(obj1.y - obj2.y, 2)
    );
    return distance < obj1.radius + obj2.radius;
  }
  
  function updateScore() {
    score++;
    document.getElementById('score').textContent = score;
}

function boundaryCheck(){
    //up
    if (player.y < player.radius) {
        player.y = player.radius;
    }
    //down
    if (player.y > canvas.height - player.radius) {
        player.y = canvas.height - player.radius;
    }
    if (player.x < player.radius) {
        player.x = player.radius;
    }
    //right
    if(player.x > canvas.width - player.radius) {
        player.x = canvas.width - player.radius;
    }
}

function inputs(){
    if(upPressed){

        player.y = player.y - player.speed;
    }
    if(downPressed)
    {
        player.y = player.y + player.speed;
    }
    if(leftPressed){
        
        player.x = player.x - player.speed;
    }
    if(rightPressed)
    {
        player.x = player.x + player.speed;
    }
}
//requestAnimationFrame(func)
//setInterval

function drawCharacter() {
    ctx.fillStyle="green";
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fill();
}

    function clearScreen() {
ctx.fillStyle= "black";
ctx.fillRect(0,0, canvas.clientWidth, canvas.height);
    }

    document.body.addEventListener("keydown", keyDown);
    document.body.addEventListener("keyup", keyUp);

    function keyDown(event) {
        //up 
        if(event.keyCode == 38){
            upPressed = true;
        }
        //down
        if (event.keyCode == 40) {
            downPressed = true;
        }
                //left
                if(event.keyCode == 37){
                    leftPressed = true;
                
                }
                //right
                if (event.keyCode == 39) {
                    rightPressed = true;
                }
    }

    function keyUp(event) {
        //up 
        if(event.keyCode == 38){
            upPressed = false;
        }
        //down
        if (event.keyCode == 40) {
            downPressed = false;
        }
                //left
                if(event.keyCode == 37){
                    leftPressed = false;
                
                }
                //right
                if (event.keyCode == 39) {
                    rightPressed = false;
                }
    }


initializeGame();
    drawGame();
