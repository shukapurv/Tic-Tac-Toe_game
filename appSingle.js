var cubes = Array.from(document.querySelectorAll(".cube"));
var indices = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
var pop = document.querySelector(".pop");
var playerX = document.querySelector("#bot");
var playerO = document.querySelector("#player");
var msg = document.querySelector(".msgCard");
var result = document.querySelector("#resultMsg");
var gameBoard = document.querySelector(".gameBoardShow");
var move = 0;
var botTurn = true;
var botMoves = [];
var yourMoves = [];
var playerBot = "X";
var playerYou = "O";
const winnerCombination = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8]];

window.onload = () => {
    choosePlayer();

    for (var i = 0; i < 9; i++) {
        cubes[i].index = i;
        cubes[i].addEventListener('click', cubeClicked = (event) => {
            var element = event.target;
            if (!botTurn) {
                markCube(element, element.index);
            }
        }, { once: true });
    }
}

choosePlayer = () => {
    gameBoard.classList.add("gameBoardHide");
    playerX.onclick = () => {
        botTurn = true;
        pop.classList.add("popHide");
        gameBoard.classList.remove("gameBoardHide");
        if (botTurn) {
            bot();
        }

    }
    playerO.onclick = () => {
        botTurn = false;
        pop.classList.add("popHide");
        gameBoard.classList.remove("gameBoardHide");
        if (botTurn) {
            bot();
        }
    }
}

markCube = (element, index) => {
    if (indices[index] == "-") {
        element.innerHTML = "<h1>O</h1>";
        indices[index] = playerYou;
        yourMoves.push(index);
        if (ifWon()) {
            endGame();
        }
        else if (ifdraw()) {
            result.innerHTML = "Match draw!";
            msg.classList.add("msgShow");
            gameBoard.classList.add("gameBoardHide");
        }
        swapTurn();
        if (move < 9) {
            bot();
        }
    }
};

bot = () => {
    var ans = botMove(indices);
    cubes[ans].innerHTML = "<h1>X</h1>";
    indices[ans] = playerBot;
    botMoves.push(ans);
    if (ifWon()) {
        endGame();
    }
    else if (ifdraw()) {
        result.innerHTML = "Match draw!";
        msg.classList.add("msgShow");
        gameBoard.classList.add("gameBoardHide");
    }
    swapTurn();
};

endGame = () => {
    result.innerHTML = botTurn ? "Bot Won!" : "You Won!";
    msg.classList.add("msgShow");
    gameBoard.classList.add("gameBoardHide");
};

ifdraw = () => {
    if (move == 8) {
        return true;
    }
    return false;
};

swapTurn = () => {
    botTurn = !botTurn;
    move++;
};


ifWon = () => {
    var currentPlayerMoves = new Array();
    currentPlayerMoves = botTurn ? botMoves : yourMoves;
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

restart = () => {
    window.location.reload();
};

botMove = (indices) => {
    var index, temp, bestTemp = -Infinity;
    for (var c = 0; c < 9; c++)
        if (indices[c] == "-") {
            indices[c] = playerBot;
            temp = minimax(indices, 0, false);
            indices[c] = "-";
            if (temp > bestTemp) {
                index = c;
                bestTemp = temp;
            }
        }
    return index;

};

minimax = (indices, level, isMax) => {
    var evScore = score(indices);

    if (evScore == -10) {
        return -10;
    }

    else if (evScore == 10) {
        return 10;
    }

    if (!moveNotOver(indices)) {
        return 0;
    }

    if (!isMax) {
        var bestScore = +Infinity;

        for (var a = 0; a < 9; a++) {
            if (indices[a] == "-") {
                indices[a] = playerYou;
                bestScore = Math.min(minimax(indices, level + 1, !isMax), bestScore);
                indices[a] = "-";
            }
        }
        return bestScore;
    }
    if (isMax) {
        var bestScore = -Infinity;

        for (var a = 0; a < 9; a++) {
            if (indices[a] == "-") {
                indices[a] = playerBot;
                bestScore = Math.max(minimax(indices, level + 1, !isMax), bestScore);
                indices[a] = "-";
            }
        }
        return bestScore;
    }
};

score = (indices) => {
    if (indices[0] == indices[4] && indices[4] == indices[8]) {
        if (indices[0] == playerBot) {
            return 10;
        }
        else if (indices[0] == playerYou) {
            return -10;
        }
    }

    if (indices[2] == indices[4] && indices[4] == indices[6]) {
        if (indices[2] == playerBot) {
            return 10;
        }
        else if (indices[2] == playerYou) {
            return -10;
        }
    }

    for (var k = 0; k < 3; k++) {
        if (indices[k] == indices[k + 3] && indices[k + 3] == indices[k + 6]) {
            if (indices[k] == playerBot) {
                return 10;
            }
            else if (indices[k] == playerYou) {
                return -10;
            }
        }
    }

    for (var k = 0; k < 9; k += 3) {

        if (indices[k] == indices[k + 1] && indices[k + 1] == indices[k + 2]) {
            if (indices[k] == playerBot) {
                return 10;
            }
            else if (indices[k] == playerYou) {
                return -10;
            }
        }
    }

    return 0;
};

moveNotOver = (indices) => {
    for (var i = 0; i < 9; i++) {
        if (indices[i] == "-")
            return true;
    }
    return false;
};
