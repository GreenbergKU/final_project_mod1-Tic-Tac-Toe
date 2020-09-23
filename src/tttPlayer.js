class Player {
    constructor(id, name, symbol, winRecord, winBoards) {
        this.id = id;
        this.name = name;
        this.symbol = symbol || this.id;
        this.winBoards = winBoards || [];
        this.winRecord = winRecord || 0;
    };

    recordWin() {
        console.log("recordWin()");
        this.winRecord += 1;
    };

    recordWinBoard(gameBoard) {
        console.log("recordWinBoard(winBoard)");
        this.winBoards.push(gameBoard);
    };

    saveToStorage() {
        console.log("saveToStorage()");
        console.log("player: ", this.name, "wins: ", this.winRecord, "winBoards= ",  this.winBoards);
        let stringifiedTTTPlayer = JSON.stringify(this);
        localStorage.setItem(`tic-tac-toe:${this.name}`, stringifiedTTTPlayer);
    };

}
