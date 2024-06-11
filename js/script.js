let inputDir = {x: 0, y:0};
const foodSound = new Audio ('/snake-game/music/food.mp3');
const gameOverSound = new Audio ('/snake-game/music/gameover.mp3');
const moveSound = new Audio ('/snake-game/music/move.mp3');
const music = new Audio ('/snake-game/music/music.mp3');
let speed = 10;
let score = 0;
let lastPaintTime = 0;
let snakeArray = [{x:13 , y:15}];
let food = {x:6 , y:7};

//game functions
function main (ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if(((ctime - lastPaintTime)/1000) < (1/speed))
        return;
    lastPaintTime = ctime;
    gameEngine()
}

//collision

function isCollide(snake) {

    //if you bump into yourself
    
    for (let i = 1; i < snake.length; i++) {
       if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
           return true;
        }        
    }

    //if you bump into wall
    if(snake[0].x >=18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y <=0){
        return true;
    }
    return false;
}

function gameEngine(){

    //part 1 -- updating the arrays
    
    if (isCollide(snakeArray)) {
        gameOverSound.play();
        music.pause();
        inputDir = {x:0,y:0};
        alert("Game Over , press any key to continue!")
        snakeArray = [{x:13 , y:15}];
        music.play();
        score=0;
        scorebox.innerHTML = "score : "+ score

    }

//if you have eaten the food, regenerate the food and increment the score

    if(snakeArray[0].x === food.x && snakeArray[0].y === food.y){
        foodSound.play();
        score +=1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scorebox.innerHTML = "score : "+ score
        snakeArray.unshift ({x: snakeArray[0].x + inputDir.x , y: snakeArray[0].y + inputDir.y})
        let a = 2;
        let b = 16;
        food = {x: Math.round(a+(b-a)*Math.random()) , y: Math.round(a+(b-a)*Math.random())}
    }

    //moving the snake

    for (let i = snakeArray.length-2; i >= 0; i--) {
        snakeArray[i+1] = {...snakeArray[i]};
    }

    snakeArray[0].x += inputDir.x;
    snakeArray[0].y += inputDir.y;

    //part 2 -- displaying the snake and food

    //display snake

    board.innerHTML=("");
    snakeArray.forEach((e,index) =>{
    snakeElement = document.createElement('div')
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if(index === 0 ){
        snakeElement.classList.add('head')
    }
    else{
        snakeElement.classList.add('snake')
    }
    board.appendChild(snakeElement)
    })

    //display the food

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);

}

//main logic

let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x:0,y:1}; //start the game
    music.play()
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    
        default:
            break;
    }
})