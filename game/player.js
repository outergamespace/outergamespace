/**
 * A module that can create and provides an interface to a Player object.
 * This is meant be a instantiated upon every new connection from clients seeking
 * to join the game
 * @module player
 */

/** Class representing a Player */
class Player {
  /** create a Player instance */
  constructor(username) {
    this.username = username;
    this.score = 0;
    this.answered = false;
  }

  /**
   * Add points to a current player's score
   * @param {number} points - number of points to be added to the current player's score
   */
  addToScore(points) {
    this.score += points;
  }

  /**
   * Set answered state of player
   * @param {boolean} answered - whether the player has answered the question
   */
  setAnswered(answered) {
    this.answered = answered;
  }
}

/** exports the Player object */
module.exports = Player;
