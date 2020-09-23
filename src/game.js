class Game {
  constructor(player1, player2) {
    this.playerX = player1;
    this.playerO = player2;
    this.board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.playerTurn = this.playerX;
    this.squaresX;
    this.squaresO;
    this.gameWinner = null;
  };

  updateTurn(target) {
    console.log("updateTurn");
    this.updateBoard(target);
    this.updateSpaces();
    this.toggleTurn();
  };

  toggleTurn() {
    this.playerTurn = this.playerTurn === this.playerX ? this.playerO : this.playerX;
  };

  updateBoard(target) {
    console.log("updateBoard(target)");        
    console.log(this.board[0], target.id);
    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i] == target.id) {       
        console.log("this.board[i]", this.board[i]);
        this.board[i] = this.playerTurn.id;
      };
    };
    console.log("this.board: ", this.board);
  };

  updateSpaces() {
    this.squaresX = [];
    this.squaresO = [];
    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i] == "X") {
        this.squaresX.push(i+1);
      };
      if (this.board[i] == "O") {
        this.squaresO.push(i+1);
      };
    };
    console.log("uptSpaces-squaresX: ", this.squaresX, "squaresO: ", this.squaresO);
    if (this.squaresX.length > 2) {
      this.checkForWinner(this.squaresX, this.playerX);
    };
    if (this.squaresO.length > 2) {
      this.checkForWinner(this.squaresO, this.playerO);
    };
  };
  
  checkForWinner(playerSpaces, player) {
    let winCombos = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
    console.log("this.winCombos[0].length: ", winCombos[0].length);
    for (let i = 0; i < winCombos.length; i++) {
      if (playerSpaces.includes(winCombos[i][0]) && playerSpaces.includes(winCombos[i][1]) && playerSpaces.includes(winCombos[i][2])) {
        console.log("playerSpaces: ", playerSpaces, "winCombos[i]: ", winCombos[i]);
        this.gameWinner = player;
      };
    };
  };

  saveGame(player) {
    console.log("saveGame(player)", 'player: ', player);
    player.recordWin();
    player.recordWinBoard(this.board);
    player.saveToStorage();
  };
}


////// ***** REMOVED COMMENTS BELOW ***** ///////

// saveGame(player)
    // let wins = player.recordWin();
    // let winBoards = player.recordWinBoard(this.board);
    // player.saveToStorage(wins, winBoards);