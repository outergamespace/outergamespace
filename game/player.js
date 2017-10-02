//Class to be instantiated upon every new connection with server from clients seeking to 
//join the game

class Player{
    constructor(playerName){
        this.username = playerName;
        this.currentAnswer = null;
        this.score = 0;
    }
}

module.exports.Player = Player;