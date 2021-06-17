const grid = document.querySelector(".grid")
const btnStart = document.querySelector("#start")
const displayScore = document.querySelector("#score")

const moveRight = document.querySelector("#btn-right")

let squares = []
let currentSnake = [2,1,0]

function createGrid(){
    for(let i=0; i<100; i++){
     const square = document.createElement("div")
     square.classList.add("square")
     grid.appendChild(square)
     squares.push(square)
    }
}
createGrid()
displaySnakeMovement()



moveRight.addEventListener("click" , function() {
    move()
})

function displaySnakeMovement() {
    currentSnake.forEach(element => {
        squares[element].classList.add("snake")
    })
}

function move(){
    const tail = currentSnake.pop()
    squares[tail].classList.remove("snake")
    currentSnake.unshift(currentSnake[0]+1)
    displaySnakeMovement()
}

let snakeMovement = setInterval(move, 1000)
snakeMovement
clearInterval(snakeMovement)