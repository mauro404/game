
class Game {
    constructor(){
        this.player = null;
        this.obstacle = null;
        this.obstacles = []
        this.bullets = [];

        this.explosionSound = new Audio("./audio/explosion-sound.mp3");
        // this.explosionSound.volume = 0.1;

    }
    start(){
        this.player = new Player();
        this.attachEventListeners();
        this.obstacle = new Obstacle;
        this.obstacle.createArmy();
        this.obstacles = this.obstacle.army;
        
        document.getElementsByClassName('obstacle')[0].remove();
        
        
        setInterval(() => {
            
            this.obstacles.forEach((obstacleInstance, obstacleInstanceIndex) => {
                if (this.obstacle.movingRight && this.obstacles.at(-1)["positionX"] < 93){
                    obstacleInstance.moveRight();
                    this.detectBulletCollision(obstacleInstance, obstacleInstanceIndex);
                } 
                else if (this.obstacle.movingRight && this.obstacles.at(-1)["positionX"] > 93){
                    if (this.obstacles.length > 1 && this.obstacles.at(-1)["positionY"] === this.obstacles.at(-2)["positionY"]){
                        obstacleInstance.moveDown();
                        this.gameOver(obstacleInstance);
                        this.detectBulletCollision(obstacleInstance, obstacleInstanceIndex);
                    } else {
                        obstacleInstance.moveDown();
                        this.obstacle.movingRight = false;
                    }
                } 
                else if (!this.obstacle.movingRight && this.obstacles.at(-1)["positionX"] > 30){
                    obstacleInstance.moveLeft();
                    this.detectBulletCollision(obstacleInstance, obstacleInstanceIndex);
                }
                else {
                    if (this.obstacles.length > 1 && this.obstacles.at(-1)["positionY"] === this.obstacles.at(-2)["positionY"]){
                        obstacleInstance.moveDown();
                        this.gameOver(obstacleInstance);
                        this.detectBulletCollision(obstacleInstance, obstacleInstanceIndex);
                    }
                    else {
                        obstacleInstance.moveDown();
                        this.obstacle.movingRight = true;                   
                    }
                }    
            })
            this.bullets.forEach((bulletInstance)=>{
                bulletInstance.moveUp();
            })
            if(this.obstacles.length === 0) {
                location.href = 'youwin.html';
            }
        }, 100);
             
    }
    attachEventListeners(){
        document.addEventListener("keydown", (event) => {
            if(event.key === "ArrowLeft"){
                this.player.moveLeft();
            }else if(event.key === "ArrowRight"){
                this.player.moveRight();
            }else if(event.key === " "){
                const bullet = this.player.fire()
                this.player.shotSound.play()
                this.bullets.push(bullet);
            }
        });
    }
    detectBulletCollision(obstacleInstance, obstacleInstanceIndex){
        this.bullets.forEach( (bulletInstance, bulletInstanceIndex) => {
            if (
                bulletInstance.positionX < obstacleInstance.positionX + obstacleInstance.width &&
                bulletInstance.positionX + bulletInstance.width > obstacleInstance.positionX &&
                bulletInstance.positionY < obstacleInstance.positionY + obstacleInstance.height &&
                bulletInstance.height + bulletInstance.positionY > obstacleInstance.positionY
            ) {
                this.explosionSound.play()
                obstacleInstance.domElement.remove(); //remove from the dom
                this.obstacles.splice(obstacleInstanceIndex, 1); // remove from the array
                bulletInstance.domElement.remove();
                this.bullets.splice(bulletInstanceIndex, 1);
            }

        });
    }
    gameOver(obstacleInstance){
        if(obstacleInstance.positionY <= 0){
            location.href = 'gameover.html';
        }
    }
}

class Player {
    constructor(){
        this.width = 4;
        this.height = 6;
        this.positionX = 48;
        this.positionY = 1;
        this.domElement = null;

        this.shotSound = new Audio("./audio/shot-sound.wav");
        // this.shotSound.volume = 0.5;

        this.createDomElement();
    }
    createDomElement(){
        // create dom element
        this.domElement = document.createElement('div');

        // set id and css
        this.domElement.id = "player";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.bottom = this.positionY + "vh";
        this.domElement.style.left = this.positionX + "vw";

        // append to the dom
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement)
    }
    moveLeft(){
        if (this.positionX > 0) {
            this.positionX -= 3;
            this.domElement.style.left = this.positionX + "vw";
        }
    }
    moveRight(){
        if(this.positionX < 95){
            this.positionX += 3;
            this.domElement.style.left = this.positionX + "vw";
        }
    }
    fire(){
        const newBullet = new Bullet(this.positionX);
        return newBullet
    }
}


class Obstacle {
    constructor(positionX, positionY){
        this.positionX = positionX;
        this.positionY = positionY;
        this.width = 5;
        this.height = 5;
        this.domElement = null;
        this.army = [];
        this.movingRight = true;

        this.createDomElement();
    }
    createDomElement(){
        this.domElement = document.createElement('div');

        this.domElement.className = "obstacle";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.bottom = this.positionY + "vh";
        this.domElement.style.left = this.positionX + "vw";

        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement)
    }
    createArmy() {
        let positionY = 50;
        const positionArr = [2,8,14,20,26,32,38,44,50,56,62,68,74,80,86,92];
        for(let i=0; i < 5; i++){
            for (let j = 5; j < positionArr.length -5; j++) {
                const newObstacle = new Obstacle(positionArr[j], positionY);
                this.army.push(newObstacle);
            }
            positionY += 10;
        }

    }
    moveLeft(){
        this.positionX -= 2;
        this.domElement.style.left = this.positionX + "vw";
    }
    moveRight(){
        this.positionX += 2;
        this.domElement.style.left = this.positionX + "vw";
    }
    moveDown(){
        this.positionY -= 5;
        this.domElement.style.bottom = this.positionY + "vh";
    }
}

class Bullet {
    constructor(position) {
        this.positionX = position + 1.8;
        this.positionY = 5;
        this.width = 6;
        this.height = 12;
        this.domElement = null;

        this.createDomElement();
    }
    createDomElement(){
        this.domElement = document.createElement('div');

        this.domElement.className = "bullet";
        this.domElement.style.width = this.width + "px";
        this.domElement.style.height = this.height + "px";
        this.domElement.style.bottom = this.positionY + "vh";
        this.domElement.style.left = this.positionX + "vw";

        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement)
    }
    moveUp(){
        this.positionY += 2.5;
        this.domElement.style.bottom = this.positionY + "vh";
    }
}

const game = new Game();
game.start();
