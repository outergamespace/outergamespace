//This is a game class, implemented right now as a Singleton

//Global variable for game instance
let instance = null;

class Game{
    constructor(){
        if(!instance){
            instance = this;
        }
        
      return instance;
    }
}