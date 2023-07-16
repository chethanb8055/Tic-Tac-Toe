const gameInfo = document.querySelector(".game-info")
const boxes = document.querySelectorAll(".box")
const newGameBtn = document.querySelector(".btn")

let currentPlayer;
let gameGrid;


const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let create a function to initialise the game


function initGame(){
    currentPlayer= "X"
    gameGrid =["","","","","","","","",""]
    newGameBtn.classList.remove("active")
    gameInfo.innerText =`Current Player-${currentPlayer}`
    boxes.forEach((box,index)=>{
        box.innerText=""
        boxes[index].style.pointerEvents = "all"
        box.classList.remove("win")
    })
}
initGame()


function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer ="O"
    }else{
        currentPlayer ="X"
    }
    //Update the UI
    gameInfo.innerHTML = `Current Player - ${currentPlayer}`
}

function checkGameOver(){
    // newGameBtn.classList.add("active")
    let answer = ""
    //all 3 boxes should be non-empty and exactly same in value
    winningPositions.forEach((position)=>{
   
        if((gameGrid[position[0]]!=="" ||gameGrid[position[1]!=="" || gameGrid[position[2]!=='']] )
        &&(gameGrid[position[0]]===gameGrid[position[1]])&&(gameGrid[position[1]]===gameGrid[position[2]])){
        
            if(gameGrid[position[0]]=="X"){
                answer="X"
            }else{
                answer = "O"
            }
            //disable pointer event 
            boxes.forEach((box)=>{
                box.style.pointerEvents ="none"
            })
            //now we know X/O is a winner
            boxes[position[0]].classList.add("win")
            boxes[position[1]].classList.add("win")
            boxes[position[2]].classList.add("win")
        }
    })

    if(answer!==""){
        gameInfo.innerHTML = `winner Player -${answer}`
        newGameBtn.classList.add("active")
        return;
    }
    //when there is no winner in all are filled then that tie
    let fillCount =0;
    gameGrid.forEach((box)=>{
        console.log(box)
        if(box!==""){
            fillCount++;
        }
    })
    //board is Filled there game is tie
    if(fillCount==9){
        gameInfo.innerText = "Game Tied !"
        newGameBtn.classList.add("active")
    }

}

function handleClick(index){
    if(gameGrid[index]===''){
        //updating to UI
        boxes[index].innerText = currentPlayer;
        //updating the empty with currentPlayer
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none"
        //swap the turn
        swapTurn()
        //check the if any winner
        checkGameOver();
    }
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index)
    })

})

newGameBtn.addEventListener("click",initGame)



