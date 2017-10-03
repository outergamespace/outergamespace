<<<<<<< HEAD
// This is a game class, implemented right now as a Singleton

// Global variable for game instance
let gameInstance = null;

class Game {
  constructor() {
    if (!gameInstance) {
      gameInstance = this;
    }

    this.players = [];

    return gameInstance;
  }

  addPlayer(player) {
    this.players.push(player);
  }

  endGame() {
    gameInstance = null;
  }
}

module.exports.Game = Game;
module.exports.gameInstance = gameInstance;
=======
//This is a game class, implemented right now as a Singleton

//Global variable for game instance
let gameInstance = null;

class Game {
    constructor() {
        if (!gameInstance) {
            gameInstance = this;
        }

        this.players = [];

        return gameInstance;
    }

    addPlayer(player) {
        this.players.push(player);
    }

    endGame(){
        gameInstance = null;
    }

}

module.exports.Game = Game;
module.exports.gameInstance = gameInstance;
>>>>>>> 57383501d9f8522fcd7c930ea92ce6cdcb7e7ccc
