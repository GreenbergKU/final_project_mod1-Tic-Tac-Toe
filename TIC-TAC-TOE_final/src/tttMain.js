document.getElementById('board-grid').addEventListener('click', filterClick);

document.onload = retrieveFromStorage();

var game;

function retrieveFromStorage() {
    console.log("retrieveFromStorage()");
    let playerX = localStorage.getItem(`tic-tac-toe:playerX`) !== null ? 
        createSavedPlayer(JSON.parse(localStorage.getItem(`tic-tac-toe:playerX`))) : 
        new Player("X", "playerX");  
    let playerO = localStorage.getItem(`tic-tac-toe:playerO`) !== null ?
        createSavedPlayer(JSON.parse(localStorage.getItem(`tic-tac-toe:playerO`))) :
        new Player("O", "playerO");   
    loadGame(playerX, playerO);   
}

function createSavedPlayer(player) {
    return new Player(player.id, player.name, player.symbol, player.winRecord, player.winBoards)
}

function loadGame(player1, player2) {
    console.log('loadGame()');
    let players = [player1, player2];
    game = new Game(players[0], players[1]);
    displayWins(players);
    displayPlayerTurn();
    displayWinBoards(players);
}

function displayWins(players) {
    console.log('displayWins()');
    players.forEach(function(player) {
        document.querySelector(`#num${player.id}`).innerText = player.winRecord;
    });
}

function displayPlayerTurn() {
    console.log('displayPlayerTurn()');
    document.getElementById('turnTxt').innerText = `It is your turn, player ${game.playerTurn.id}!`;
    document.getElementById('turnImg').src = `images/${game.playerTurn.id}arrow.png`;
}

function displayWinBoards(players) {
    console.log('displayWinBoards()');
    players.forEach(function(player) {
        let miniBoards = document.querySelector(`#mini-boards${player.id}`);
        miniBoards.innerHTML = "";
        player.winBoards.forEach(function(board) {
            let miniBoard = createMiniBoard(player, miniBoards.children.length + 1);
            miniBoards.insertAdjacentHTML("afterbegin", miniBoard);
            fillMiniBoard(board, player); 
        }); 
              
    });  
}

function createMiniBoard(player, boardNum) { 
    return `
        <div id="mini-board" class="mini-board board" name="board${boardNum}">
            <div id="mini${player.id}-0" class="mini-square" name="1">O</div>
            <div id="mini${player.id}-1" class="mini-square" name="2">X</div>
            <div id="mini${player.id}-2" class="mini-square" name="3">X</div>
            <div id="mini${player.id}-3" class="mini-square" name="4">X</div>
            <div id="mini${player.id}-4" class="mini-square" name="5">O</div>
            <div id="mini${player.id}-5" class="mini-square" name="6">X</div>
            <div id="mini${player.id}-6" class="mini-square" name="7">X</div>
            <div id="mini${player.id}-7" class="mini-square" name="8">X</div>
            <div id="mini${player.id}-8" class="mini-square" name="9">O</div>
        </div>
    `;   
  }

function fillMiniBoard(board, player) {
    console.log('fillMiniBoard(board, player)');
    for (let i = 0; i < board.length; i++) {
        let miniDiv = document.getElementById(`mini${player.id}-${i}`);
        typeof board[i] != "number" ? miniDiv.innerText = board[i] : miniDiv.classList.add("black")
        if (board[i] !== player.id) {
            miniDiv.classList.add("silver");   
        }; 
    };
}

function filterClick(event) {
    console.log("filterClick()");
    let targetClass = event.target.classList;  
    if (targetClass.contains("square") && !targetClass.contains("silver")) {
        takeTurn(event);
    };
}

function takeTurn(event) {
    console.log('takeTurn()');
    displayTurn(event.target);
    game.updateTurn(event.target);
    displayPlayerTurn();
    checkForEndGame();   
}

function displayTurn(square) {
    console.log('displayTurn()');
    square.innerText = game.playerTurn.id;
    square.classList.add("silver");
}

function checkForEndGame() {
    console.log("checkForEndGame()");
    game.gameWinner != null ? displayEndGameWinner(game.gameWinner.id) :     
    game.squaresX.length + game.squaresO.length === 9 ? displayEndGameTie() : null;
}

function displayEndGameWinner(playerID) {
    console.log("endGame(playerID)");
    document.getElementById('turnTxt').innerText = `GAME OVER! Player ${playerID} WINS!`;
    game.saveGame(game.gameWinner);
    togglePlayAgain();
    playAgain();
}

function displayEndGameTie() {
    console.log("displayEndGameTie()");
    document.getElementById('turnTxt').innerText = " GAME OVER! It's a TIE!";
    togglePlayAgain();
    playAgain();
}

function togglePlayAgain() {
    console.log('togglePlayAgain()');
    document.getElementById('turnImg').classList.toggle('hidden');   
    document.getElementById('playAgain').classList.toggle('hidden');
}

function playAgain() {
    console.log('playAgain()');
    let buttons = document.querySelectorAll('button')
    buttons.forEach(function(button) {
        button.addEventListener('click', clearSquares);
    });
}

function clearSquares() {
    console.log("clearSquares()");
    retrieveFromStorage();
    if (event.target.id === "yes") {
        let squares = document.querySelectorAll(".square");
        squares.forEach(function(square) {
            square.classList.remove("silver");
        });
        togglePlayAgain();
    };
    
}
      

////// ***** REMOVED COMMENTS BELOW ***** ///////

// function retrieveFromStorage() 
    //let xPlayer = JSON.parse(localStorage.getItem(`tic-tac-toe:playerX`));
    // xPlayer = new Player(xPlayer.id, xPlayer.name, xPlayer.symbol, xPlayer.winRecord, xPlayer.winBoards)
    // console.log('xPlayer: ', xPlayer, new Player(xPlayer.id, xPlayer.name, xPlayer.symbol, xPlayer.winRecord, xPlayer.winBoards))  
    //let playerX = new Player(xPlayer)

// function loadGame(player1, player2)
    // console.log('oPlayer: ', oPlayer);
    // console.log('players: ', players);

    //let playerX = new Player("X", "playerX");  
    //let playerY = new Player("O", "playerO");

// function displayWins(players)    
    // let wins = document.querySelectorAll(".winNum");
    // wins[0].innerText = game.playerX.winRecord;
    // wins[1].innerText = game.playerO.winRecord;

// function displayWinBoards(players) 
    // for (let i = 0; i < board.length; i++) {
    //     let miniDiv = document.getElementById(`mini${player.id}-${i}`);
    //     typeof board[i] != "number" ? miniDiv.innerText = board[i] : miniDiv.classList.add("black")
    //     if (board[i] !== player.id) {
    //         miniDiv.classList.add("silver");   
    //     }; 
    // };

// function createMiniBoard()   
//     return `
//         <div id="mini-board" class="mini-board board" name="board${boardNum}">
//             <div id="mini${player.id}-0" class="mini-square" name="1">O</div>
//             <div id="mini${player.id}-1" class="mini-square" name="2">X</div>
//             <div id="mini${player.id}-2" class="mini-square" name="3">X</div>
//             <div id="mini${player.id}-3" class="mini-square" name="4">X</div>
//             <div id="mini${player.id}-4" class="mini-square" name="5">O</div>
//             <div id="mini${player.id}-5" class="mini-square" name="6">X</div>
//             <div id="mini${player.id}-6" class="mini-square" name="7">X</div>
//             <div id="mini${player.id}-7" class="mini-square" name="8">X</div>
//             <div id="mini${player.id}-8" class="mini-square" name="9">O</div>
//         </div>
//     `   
// }

// function displayWinBoards(players) {
//     console.log('players: ', players, "playerID: ", player.id);
//     players.forEach(function(player) {
//         let miniBoards = document.querySelector(`#mini-boards${player.id}`);            
//         let boardNum = miniBoards.children.length + 1;
//         miniBoards.innerHTML = "";
//         player.winBoards.forEach(function(board) {
//             let miniBoard = game.createMiniBoard(player, boardNum);
//             miniBoards.insertAdjacentHTML("afterbegin", miniBoard);
//             miniBoards.insertAdjacentHTML("afterbegin", miniBoard
//                 `
//                     <div id="mini-board" class="mini-board board" name="board${boardNum}">
//                         <div id="mini${player.id}-0" class="mini-square" name="1">O</div>
//                         <div id="mini${player.id}-1" class="mini-square" name="2">X</div>
//                         <div id="mini${player.id}-2" class="mini-square" name="3">X</div>
//                         <div id="mini${player.id}-3" class="mini-square" name="4">X</div>
//                         <div id="mini${player.id}-4" class="mini-square" name="5">O</div>
//                         <div id="mini${player.id}-5" class="mini-square" name="6">X</div>
//                         <div id="mini${player.id}-6" class="mini-square" name="7">X</div>
//                         <div id="mini${player.id}-7" class="mini-square" name="8">X</div>
//                         <div id="mini${player.id}-8" class="mini-square" name="9">O</div>
//                     </div>
//                 `
//             );
//             fillMiniBoard(board, player); 
//         });
//     })
// }


// function displayMiniCovers() {
//     savedCoversSection.innerHTML = "";
//     savedCovers.forEach(function(cover) {
//     savedCoversSection.insertAdjacentHTML("afterbegin", `
//       <div class="mini-cover" id=${cover.id}>
//         <img class="cover-image" src=${cover.cover}>
//         <h2 class="cover-title">${cover.title}</h2>
//         <h3 class="tagline">A tale of <span class="tagline-1">${cover.tagline1}</span> 
//         and <span class="tagline-2">${cover.tagline2}</span></h3>
//         <img class="price-tag" src="./assets/price.png">
//         <img class="overlay" src="./assets/overlay.png">
//       </div>
//       `);
//     });
//   }

// function filterClick(event)
    //console.log('event: ', event, 'targetClass: ', targetClass);

// function takeTurn(event)
    // if (!event.target.classList.contains("turn-silver")) {             
    // }

// function displayEndGameWinner(playerID)
    // clearSquares();    
    // alert(`GAME OVER! Player ${playerID} WINS!`);

// function displayEndGameTie()
    // clearSquares();
    // alert("It's a TIE! GAME OVER!");
    
// function togglePlayAgain()
    //  let playAgain = document.querySelector('.playAgain');
    // console.log(playAgain);
   // document.getElementById('playAgain').classList.toggle('hidden');



