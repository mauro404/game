
class Game {
    constructor(){
        this.player = null; //will store an instance of the class Player
        this.obstacles = []; //will store instances of the class Obstacle
    }
    start(){
        this.player = new Player();
        this.attachEventListeners();

        //create new obstacles
        const positionArr = [2,8,14,20,26,32,38,44,50, 56, 62, 68,74,80,86,92];
        setInterval(() => {
            for (let i = 0; i < positionArr.length; i++) {
                const newObstacle = new Obstacle(positionArr[i]);
                this.obstacles.push(newObstacle);
            }
        }, 800);

        //move obstacles
        setInterval(() => {
            this.obstacles.forEach( (obstacleInstance) => {
                obstacleInstance.moveDown(); //move
                this.detectCollision(obstacleInstance); //detect collision with current obstacle
            });
        }, 80);


    }
    attachEventListeners(){
        document.addEventListener("keydown", (event) => {
            if(event.key === "ArrowLeft"){
                this.player.moveLeft();
            }else if(event.key === "ArrowRight"){
                this.player.moveRight();
            }
        });
    }
    detectCollision(obstacleInstance){
        if (
            this.player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
            this.player.positionX + this.player.width > obstacleInstance.positionX &&
            this.player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
            this.player.height + this.player.positionY > obstacleInstance.positionY
        ) {
            location.href = 'gameover.html';
        }
    }
    removeObstacleIfOutside(obstacleInstance){
        if(obstacleInstance.positionY < 0){
            obstacleInstance.domElement.remove(); //remove from the dom
            this.obstacles.shift(); // remove from the array
        }
    }
}


class Player {
    constructor(){
        this.width = 5;
        this.height = 5;
        this.positionX = 47.5;
        this.positionY = 0;
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

        // set id and css
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


const game = new Game();
game.start();
