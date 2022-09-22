
class Game {
    constructor(){
        this.player = null;
        this.obstacle = null;
        this.obstacles = []
        this.bullets = [];
    }
    start(){
        this.player = new Player();
        this.attachEventListeners();
        this.obstacle = new Obstacle;
        this.obstacle.createArmy();
        this.obstacles = this.obstacle.army;
        
        
        
        setInterval(() => {
            
            this.obstacles.forEach((obstacleInstance, obstacleInstanceIndex) => {
                // if (this.obstacle.movingRight && this.obstacles.at(-1)["positionX"] < 93){
                //     obstacleInstance.moveRight();
                //     this.gameOver(obstacleInstance);
                //     this.detectBulletCollision(obstacleInstance, obstacleInstanceIndex);
                // } 
                // else if (this.obstacle.movingRight && this.obstacles.at(-1)["positionX"] > 93){
                    obstacleInstance.moveDown();
                    this.gameOver(obstacleInstance);
                    this.detectBulletCollision(obstacleInstance, obstacleInstanceIndex);
                //     this.obstacle.movingRight = false;
                // } 
                // else if (!this.obstacle.movingRight && this.obstacles.at(-1)["positionX"] > 26){
                //     obstacleInstance.moveLeft();
                //     this.gameOver(obstacleInstance);
                //     this.detectBulletCollision(obstacleInstance, obstacleInstanceIndex);
                // }
                // else {
                //     obstacleInstance.moveDown();
                //     this.gameOver(obstacleInstance);
                //     this.detectBulletCollision(obstacleInstance, obstacleInstanceIndex);
                //     this.obstacle.movingRight = true;                   
                // }    
            })
            this.bullets.forEach((bulletInstance)=>{
                bulletInstance.moveUp();
            })
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
                
                obstacleInstance.domElement.remove(); //remove from the dom
                this.obstacles.splice(obstacleInstanceIndex, 1); // remove from the array
                bulletInstance.domElement.remove();
                this.bullets.splice(bulletInstanceIndex, 1);
            }

        });
    }
    gameOver(obstacleInstance){
        if(obstacleInstance.positionY === 0){
            location.href = 'gameover.html';

        }
    }
}

class Player {
    constructor(){
        this.width = 5;
        this.height = 5;
        this.positionX = 47.5;
        this.positionY = 1;
        this.domElement = null;

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
    constructor(position, positionY){
        this.positionX = position;
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
        let positionY = 95;
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
        this.positionX -= 3;
        this.domElement.style.left = this.positionX + "vw";
    }
    moveRight(){
        this.positionX += 3;
        this.domElement.style.left = this.positionX + "vw";
    }
    moveDown(){
        this.positionY--;
        this.domElement.style.bottom = this.positionY + "vh";
    }
}

class Bullet {
    constructor(position) {
        this.positionX = position + 2;
        this.positionY = 5;
        this.width = 7;
        this.height = 14;
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
        this.positionY += 2;
        this.domElement.style.bottom = this.positionY + "vh";
    }
}

const game = new Game();
game.start();
