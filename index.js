const grid = document.querySelector(".grid")
const btnStart = document.querySelector("#start")
const displayScore = document.querySelector("#score")
const message = document.querySelector("#message")

const btnRight = document.querySelector("#btn-right")
const btnLeft = document.querySelector("#btn-left")
const btnUp = document.querySelector("#btn-up")
const btnDown = document.querySelector("#btn-down")



let squares = []
let currentSnake = [2,1,0]
let direction = 1
let width = 20
let appleIndex = 0
let score = 0
let timeInterval = 1000
let speed = 0.9
let timerId = 0


function createGrid(){
    //create 100 of these elements with a for loop
    for(let i=0; i<400; i++){
     //create element
     const square = document.createElement("div")
     //add styling to the element
     square.classList.add("square")
     //put the element in the grid
     grid.appendChild(square)
     //push it into new square array
     squares.push(square)
    }
}
createGrid()

//create initial snake
currentSnake.forEach(element =>  squares[element].classList.add("snake"))

function startGame(){
    //remove the snake 
    currentSnake.forEach(element => squares[element].classList.remove("snake"))
    //remove the apple 
    squares[appleIndex].classList.remove("apple")
    clearInterval(timerId)
    currentSnake = [2,1,0]
    //readd the class of snake to our current snake
    currentSnake.forEach(element => squares[element].classList.add("snake"))
    score = 0
    //readd initial score to the browser
    displayScore.textContent = score
    displayScore.classList.remove(".gameOverMessage")
    direction = 1
    timeInterval = 1000
    message.classList.add("gameOverMessage")
    message.textContent = "Game Start"
    generateApples()
    
    grid.classList.remove("game-over")
    timerId = setInterval(move, timeInterval)
}

function move(){
    if (
        (currentSnake[0] + width >= width*width && direction === width) || //if snake has hit bottom
        (currentSnake[0] % width === width-1 && direction === 1) || //if snake has hit right wall
        (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
        (currentSnake[0] - width < 0 && direction === -width) || //if snake has hit top
        squares[currentSnake[0] + direction].classList.contains('snake')
    ){
        message.style.display = "block"
        message.textContent = "Game Over"
        message.classList.add("gameOverMessage")
        grid.classList.add("game-over")
        return clearInterval(timerId)
    }



     //remove last element from our currentSnake array
    const tail = currentSnake.pop()
     //remove styling from last element
    squares[tail].classList.remove("snake")
    //add square in direction we are heading
    currentSnake.unshift(currentSnake[0] + direction)

         //deal with snake head gets apple
        if(squares[currentSnake[0]].classList.contains("apple")) {
            // remove class of apple
            squares[currentSnake[0]].classList.remove("apple")
            //grow our snake by adding class of snake to it
            squares[tail].classList.add("snake")
            //grow our snake array
            currentSnake.push(tail)
            //generate new apple
            generateApples()
            // add 1 to the score
            score++
            //displaying the Score
            displayScore.textContent = score 
            //speed up the snake
            clearInterval(timerId)
            timeInterval = timeInterval * 0.9
            timerId = setInterval(move, timeInterval)
        }

     //add styling so we can see it
    squares[currentSnake[0]].classList.add("snake")
    // displaySnakeMovement()
}

function generateApples(){
    do{
        appleIndex =  Math.floor(Math.random() * squares.length)
    }while(squares[appleIndex].classList.contains("snake"))
       
    squares[appleIndex].classList.add("apple")
}
generateApples()

function control(e) {
    if(e.keyCode === 37){
        console.log("left movement")
        direction = -1
    } else if(e.keyCode === 38){
        console.log("up movement")
        direction = -width
    } else if(e.keyCode === 39){
        console.log("right movement")
        direction = 1
    } else if(e.keyCode === 40 ){
        console.log("down movement")
        direction = +width
    }
}

 document.addEventListener("keydown", control)
 btnStart.addEventListener("click", startGame)


btnRight.addEventListener("click", function(){
    direction = 1
})

btnLeft.addEventListener("click", function(){
    direction = -1
})

btnUp.addEventListener("click", function(){
    direction = -width
})

btnDown.addEventListener("click", function(){
    direction = width
})
 
 