
class Game {
    constructor(){
        this.player = null; //will store an instance of the class Player
        this.obstacles = []; //will store instances of the class Obstacle
        this.bullets = [];
    }
    start(){
        this.player = new Player();
        this.attachEventListeners();

        //create new obstacles
        const positionArr = [2,8,14,20,26,32,38,44,50,56,62,68,74,80,86,92];
        setInterval(() => {
            for (let i = 0; i < positionArr.length; i++) {
                const newObstacle = new Obstacle(positionArr[i]);
                this.obstacles.push(newObstacle);
            }
        }, 800);

        //move obstacles
        setInterval(() => {
            for(const obstacleInstance of this.obstacles) {
                for (const bulletInstance of this.bullets){
                    this.detectCollision(bulletInstance, obstacleInstance);
                }
                obstacleInstance.moveDown() //move
                this.gameOver(obstacleInstance)
            }
        }, 80);


        setInterval(()=>{
            this.bullets.forEach((bulletInstance)=>{
                bulletInstance.moveUp();
            })
        }, 20)

        
        
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
    detectCollision(bulletInstance, obstacleInstance){
        if (
            bulletInstance.positionX < obstacleInstance.positionX + obstacleInstance.width &&
            bulletInstance.positionX + bulletInstance.width > obstacleInstance.positionX &&
            bulletInstance.positionY < obstacleInstance.positionY + obstacleInstance.height &&
            bulletInstance.height + bulletInstance.positionY > obstacleInstance.positionY
        ) {
            
            obstacleInstance.domElement.remove(); //remove from the dom
            this.obstacles.shift(); // remove from the array
            bulletInstance.domElement.remove(); //remove from the dom
            this.bullets.shift(); // remove from the array
        }
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
        this.positionX--;
        this.domElement.style.left = this.positionX + "vw";
    }
    moveRight(){
        this.positionX++;
        this.domElement.style.left = this.positionX + "vw";
    }

    fire(){
        const newBullet = new Bullet(this.positionX);
        return newBullet
    }
}


class Obstacle {
    constructor(position){
        this.positionX = position;
        this.positionY = 95;
        this.width = 5;
        this.height = 5;
        this.domElement = null;

        this.createDomElement();
    }
    createDomElement(){
        // create dom element
        this.domElement = document.createElement('div');

        // set class and css
        this.domElement.className = "obstacle";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.bottom = this.positionY + "vh";
        this.domElement.style.left = this.positionX + "vw";

        // append to the dom
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement)
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
        this.height = 7;
        this.domElement = null;

        this.createDomElement();
    }
    createDomElement(){
        // create dom element
        this.domElement = document.createElement('div');

        // set class and css
        this.domElement.className = "bullet";
        this.domElement.style.width = this.width + "px";
        this.domElement.style.height = this.height + "px";
        this.domElement.style.bottom = this.positionY + "vh";
        this.domElement.style.left = this.positionX + "vw";

        // append to the dom
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement)
    }
    moveUp(){
        //move bullets
        //setInterval(() => {
        this.positionY++;
        this.domElement.style.bottom = this.positionY + "vh";

        //}, 20);
    }
}

const game = new Game();
game.start();
