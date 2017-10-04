/**
 * A module that can create and provides an interface to a Player object.
 * This is meant be a instantiated upon every new connection from clients seeking
 * to join the game
 * @module game
 */

/** Class representing a Player */
class Player {
  /** create a Player instance */
  constructor(playerName) {
    this.username = playerName;
    this.score = 0;
  }

  /**
   * Add points to a current player's score
   * @param {number} points - number of points to be added to the current player's score
   */
  addToScore(points) {
    this.score += points;
  }
}

/** exports the Player object */
module.exports = Player;
