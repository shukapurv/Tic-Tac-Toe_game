cubes = Array.from(document.querySelectorAll(".cube"));
pop = document.querySelector(".pop");
var playerX=document.querySelector("#playerX");
var playerO=document.querySelector("#playerO");
var msg = document.querySelector(".msgCard");
var result = document.querySelector("#resultMsg");
var gameBoard = document.querySelector(".gameBoardShow");
var move = 0;
var Xturn;
let XMoves = [];
let OMoves = [];
var Xname;
var Oname;
const winnerCombination = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8]];

window.onload = () => {
    choosePlayer();

    Xname=prompt("Enter name of player X: ","");
    Oname=prompt("Enter name of player O: ","");

    document.getElementById("X").innerHTML=Xname + "'s chance";
    document.getElementById("O").innerHTML=Oname + "'s chance";
    
    for (var i = 0; i < 9; i++) {
        cubes[i].index = i;
        cubes[i].addEventListener('click', cubeClicked = (event) => {
            const element = event.target;
            markCube(element, element.index);
            if (ifWon()) {
                endGame();
            }
            else if (ifdraw()) {
                result.innerHTML = "Match draw!";
                msg.classList.add("msgShow");
                gameBoard.classList.add("gameBoardHide");
            }
            swapTurn();
        }, { once: true });
    }
}

choosePlayer = () => {
    gameBoard.classList.add("gameBoardHide");
    playerX.onclick=()=> {
        Xturn=true;
        pop.classList.add("popHide");
        gameBoard.classList.remove("gameBoardHide");
        document.getElementById("O").style.display = "none";

    }
    playerO.onclick=()=> {
        Xturn=false;
        pop.classList.add("popHide");
        gameBoard.classList.remove("gameBoardHide");
        document.getElementById("X").style.display = "none";
    }
}

markCube = (element, index) => {
    if (Xturn) {
        element.innerHTML = "<h1>X</h1>";
        XMoves.push(index);
    }
    else {
        element.innerHTML = "<h1>O</h1>"
        OMoves.push(index);
    }
};

swapTurn = () => {
    Xturn = !Xturn;
    move++;
    if (Xturn == true) {
        document.getElementById("O").style.display = "none";
        document.getElementById("X").style.display = "block";
    }
    else {
        document.getElementById("X").style.display = "none";
        document.getElementById("O").style.display = "block";
    }
};

ifWon = () => {
    var currentPlayerMoves = new Array();
    currentPlayerMoves = Xturn ? XMoves : OMoves;
    if (currentPlayerMoves.length >= 3) {
        for (var j = 0; j < winnerCombination.length; j++) {
            set = winnerCombination[j];
            var count = 0;
            for (var k = 0; k < 3; k++) {
                for (var a = 0; a < currentPlayerMoves.length; a++) {
                    if (currentPlayerMoves[a] === set[k]) {
                        count++;
                        break;
                    }
                }
            }
            if (count == 3) {
                return true;
            }
        }
    }
    return false;
};

endGame = () => {
    result.innerHTML = Xturn ? Xname + "Won!" : Oname + "Won!";
    msg.classList.add("msgShow");
    gameBoard.classList.add("gameBoardHide");
}


ifdraw = () => {
    if (move == 8) {
        return true;
    }
    return false;
};



restart = () => {
    window.location.reload();
};


