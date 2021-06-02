console.log("Welcome Dear DEV"); // Check!

// Variables
window.onload = () => {
const tablePlace = document.getElementById("tablePlace");
const tableBoard = document.getElementById("tableBoard");
const winStatus = document.getElementById("winStatus");
}

let boardSize = 3; // the board size
let tableArray = []; // array that represent the board 
let undoTableArray = []; // array of steps location
let gameStepCounter = 0; // count the steps in played game
let gameStop = Math.pow(boardSize, 2); // when the game stops
let win = 0;
let minStep = gameStop; // minimum steps for win
let gameC = 0; // count games
let xWinCount = 0;
let oWinCount = 0;

// -- save var --
let boardSize_s = boardSize;
let tableArray_s = tableArray;
let undoTableArray_s = undoTableArray;
let gameStepCounter_s = gameStepCounter;
let gameStop_s = gameStop;
let win_s = win;
let minStep_s = minStep;
let gameC_s = gameC;

// --------------

// ----- GAME SETUP -----

function createBoard() {
  let newBoard = document.createElement("table");
  newBoard.setAttribute("id", "tableBoard");
  tablePlace.appendChild(newBoard);

  let newBoardBody = document.createElement("tbody");
  newBoardBody.setAttribute("id", "tableBoardBody");
  tableBoard.appendChild(newBoardBody);
}

function generateGameBoard(b) {
  win = 0;
  tableArray = [];
  undoTableArray = [];
  gameStepCounter = 0;
 
  for (let x = 0; x < b; x ++) {
    // New table row TR
    let newRow = tableBoard.insertRow();

    for (let y = 0; y < b; y ++) {
      // New table cell TD
      let newCell = newRow.insertCell();
      newCell.setAttribute("id", x + "_" + y);
      newCell.setAttribute("onclick", "placeXO(this)");
    }
  }
  generateGameBoardArray(b);
}

function generateGameBoardArray(b) {
  for (let x = 0; x < b; x ++) {
    tableArray.push([]);
    for (let y = 0; y < b; y ++) {
      tableArray[x].push(y);
    }
  }
}

function saveGame() {
  boardSize_s = boardSize;
  tableArray_s = tableArray;
  undoTableArray_s = undoTableArray;
  gameStepCounter_s = gameStepCounter;
  gameStop_s = gameStop;
  win_s = win;
  minStep_s = minStep;
  gameC_s = gameC;

  newGameBtn();
}

function loadGame() {
  
  newGameBtn();
  boardSize = boardSize_s;
  tableArray = tableArray_s;
  undoTableArray = undoTableArray_s;
  gameStepCounter = gameStepCounter_s;
  gameStop = gameStop_s;
  win = win_s;
  minStep = minStep_s;
  gameC = gameC_s;

  for (let x = 0; x < boardSize; x ++){
    for (let y = 0; y < boardSize; y ++){
      switch (tableArray[x][y]) {
        case "x" :
          tableBoard.rows[x].cells[y].innerHTML = "x";
          break;
        
        case "o" :
            tableBoard.rows[x].cells[y].innerHTML = "o";
            break;
      }
    }
  }
}

// ----------

// ----- GAME CONSOLE -----

function displayGameBoardIndex(b) {
  for (let x = 0; x < boardSize; x ++) {
    for (let y = 0; y < boardSize; y ++) {
    b.rows[x].cells[y].innerHTML = x + "," + y;
    }
  }
}

function minStepCheck() {
  if (minStep > gameStepCounter) {
    minStep = gameStepCounter;
  }
}
// ----------

// ----- CLICK -----
function placeXO(cell) {
  let x = 0;
  let y = 0;
  if (win < 1){
  if (cell.innerHTML != "x" && cell.innerHTML != "o") {
    if (gameStepCounter < gameStop){

      // memorize game moves
      undoTableArray.push(cell.getAttribute("id"));

      switch (gameStepCounter % 2) {
        //player puts X
        case 0 : 
          placeX(cell);
          break;

        //player puts O
        case 1 : 
          placeO(cell);
          break;
      }
      gameStepCounter ++;

      gameWin(tableArray);
    }
  }
  }
}

function placeX(cell) {
  cell.innerHTML = "x";
  x = cell.parentNode.rowIndex;
  y = cell.cellIndex;
  tableArray[x][y] = "x";
}

function placeO(cell) {
  cell.innerHTML = "o";
  x = cell.parentNode.rowIndex;
  y = cell.cellIndex;
  tableArray[x][y] = "o";
}
// ----------

// ----- BUTTONS -----
function newGameBtn() {
  tableBoard.remove();
  createBoard();
  winStatus.innerHTML = "";
  generateGameBoard(boardSize);
  gameC ++;
}

function ChangeSizeGameBtn() {
  boardSize = parseInt(prompt("enter board size"));
  gameStop = Math.pow(boardSize, 2);
  newGameBtn();
}

function undoGameBtn() {
  if (win < 1){
  if (undoTableArray.length = gameStepCounter) {
    
    let lastMove = undoTableArray[undoTableArray.length-1];
    let lastMoveX = lastMove.substr(0, 1);
    let lastMoveY = lastMove.substr(2, 1);
    
    // clean board
    tableBoard.rows[lastMoveX].cells[lastMoveY].innerHTML = "";
    
    // pop from undoTableArray
    undoTableArray.pop();

    // pop from tableArray
    tableArray[lastMoveX][lastMoveY] = "p";
    
    // sync X & O
    gameStepCounter --;

  }
  }
}

function minStepGameBtn() {
  if (gameC === 0){
    alert("None");
  } else {
  alert(minStep);
  }
}
// ----------

function gameWin(arr) {

  if (win < 1) {
  // Row Win
    for (let x = 0; x < arr.length; x++) {
      let itsX = 0;
      let itsO = 0;
      for (let y = 0; y < arr.length; y++) {
        switch (arr[x][y]) {
          case "x" : 
            itsX ++;
            if(itsX === boardSize) {
              win ++;
              xWinCount ++;
              console.log("X win");
              winStatus.innerHTML = "X Won!";
              minStepCheck()
            }
            break;
          
            case "o" : 
            itsO ++;
            if(itsO === boardSize) {
              win ++;
              oWinCount ++;
              console.log("O win");
              winStatus.innerHTML = "O Won!";
              minStepCheck()
            }
            break;
        }
      }
    }
  // Col Win
    for (let x = 0; x < arr.length; x++) {
      let itsX = 0;
      let itsO = 0;
      for (let y = 0; y < arr.length; y++) {
        switch (arr[y][x]) {
          case "x" : 
            itsX ++;
            if(itsX === boardSize) {
              win ++;
              console.log("X win");
              winStatus.innerHTML = "X Won!";
              minStepCheck()
            }
            break;
          
            case "o" : 
            itsO ++;
            if(itsO === boardSize) {
              win ++;
              console.log("O win");
              winStatus.innerHTML = "O Won!";
              minStepCheck()
            }
            break;
        }
      }
    }
  // R - X Win
    itsX = 0;
    itsO = 0;
    for (let x = 0; x < arr.length; x++) {
      switch (arr[x][x]) {
          case "x" : 
            itsX ++;
            if(itsX === boardSize) {
              win ++;
              console.log("X win");
              winStatus.innerHTML = "X Won!";
              minStepCheck()
            }
            break;
          
            case "o" : 
            itsO ++;
            if(itsO === boardSize) {
              win ++;
              console.log("O win");
              winStatus.innerHTML = "O Won!";
              minStepCheck()
            }
            break;
      }
    }
  // L - X Win
    itsX = 0;
    itsO = 0;
    for (let x = 0; x < arr.length; x++) { 
      switch (arr[x][arr.length-1-x]) {
          case "x" : 
            itsX ++;
            if(itsX === boardSize) {
              win ++;
              console.log("X win");
              winStatus.innerHTML = "X Won!";
              minStepCheck()
            }
            break;
          
            case "o" : 
            itsO ++;
            if(itsO === boardSize) {
              win ++;
              console.log("O win");
              winStatus.innerHTML = "O Won!";
              minStepCheck()
            }
            break;
      }
    }
  }
}
// Run ------------

createBoard();
generateGameBoard(boardSize);
//displayGameBoardIndex(tableBoard);