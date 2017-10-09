/* eslint-env mocha */
const expect = require('chai').expect;
const Game = require('../game/game.js');

describe('Game', () => {
  const DB_CALL_DELAY = 200;

  let game;

  beforeEach((done) => {
    game = new Game();

    // TODO: refactor class to avoid asynchronous database call in constructor
    setTimeout(() => done(), DB_CALL_DELAY);
  });

  describe('Should create a game instance', () => {
    it('Should have an empty players object', () => {
      expect(game.players).to.deep.equal({});
    });

    it('Should start with a question index of -1', () => {
      expect(game.currentQuestionIndex).to.equal(-1);
    });

    it('Should have an empty answered players array', () => {
      expect(game.answeredPlayers).to.deep.equal([]);
    });

    it('Should have an array of 10 questions', () => {
      expect(game.questions.length).to.equal(10);

      game.questions.forEach((question) => {
        expect(question.question).to.not.equal('');
        expect(question.correct_ans).to.not.equal('');
        expect(question.incorrect_ans_1).to.not.equal('');
        expect(question.incorrect_ans_2).to.not.equal('');
        expect(question.incorrect_ans_3).to.not.equal('');
      });
    });
  });

  describe('Should store game configurations', () => {
    it('Should have default properties when no configurations are provided at instantiation', () => {
      expect(game.config.noOfQuestions).to.equal(10);
      expect(game.config.timePerQuestion).to.equal(15);
      expect(game.config.maxPlayers).to.equal(6);
    });

    it('Should store custom configurations if provided at instantiation', () => {
      game = new Game({
        noOfQuestions: 23,
        timePerQuestion: 17,
        maxPlayers: 3,
      });
      expect(game.config.noOfQuestions).to.equal(23);
      expect(game.config.timePerQuestion).to.equal(17);
      expect(game.config.maxPlayers).to.equal(3);
    });

    it('Should throw an error if noOfQuestions configuration is out of range', () => {
      let errConfig;

      errConfig = () => {
        game = new Game({ noOfQuestions: 0 });
      };
      expect(errConfig).to.throw(/between/);

      errConfig = () => {
        game = new Game({ noOfQuestions: -3 });
      };
      expect(errConfig).to.throw(/between/);

      errConfig = () => {
        game = new Game({ noOfQuestions: 32 });
      };
      expect(errConfig).to.throw(/between/);
    });

    it('Should throw an error if timePerQuestions configuration is out of range', () => {
      let errConfig;

      errConfig = () => {
        game = new Game({ timePerQuestion: 0 });
      };
      expect(errConfig).to.throw(/between/);

      errConfig = () => {
        game = new Game({ timePerQuestion: -1 });
      };
      expect(errConfig).to.throw(/between/);

      errConfig = () => {
        game = new Game({ timePerQuestion: 49 });
      };
      expect(errConfig).to.throw(/between/);
    });

    it('Should throw an error if timePerQuestions configuration is out of range', () => {
      let errConfig;

      errConfig = () => {
        game = new Game({ maxPlayers: 0 });
      };
      expect(errConfig).to.throw(/between/);

      errConfig = () => {
        game = new Game({ maxPlayers: -4 });
      };
      expect(errConfig).to.throw(/between/);

      errConfig = () => {
        game = new Game({ maxPlayers: 12 });
      };
      expect(errConfig).to.throw(/between/);
    });
  });

  describe('Should return the correct state of the game', () => {
    it('Should check whether the game has no players', () => {
      expect(game.hasNoPlayers()).to.equal(true);
      game.addPlayer('1', 'a');
      expect(game.hasNoPlayers()).to.equal(false);
      game.addPlayer('2', 'b');
      expect(game.hasNoPlayers()).to.equal(false);
    });

    it('Should check whether the game is full with 4 players', () => {
      // override default game config
      game.config.maxPlayers = 4;

      expect(game.isFull()).to.equal(false);
      game.addPlayer('1', 'a');
      game.addPlayer('2', 'b');
      game.addPlayer('3', 'c');
      expect(game.isFull()).to.equal(false);
      game.addPlayer('4', 'd');
      expect(game.isFull()).to.equal(true);
    });

    it('Should check whether the game has started', () => {
      expect(game.hasStarted()).to.equal(false);

      game.nextQuestion();
      expect(game.hasStarted()).to.equal(true);
      game.nextQuestion();
      expect(game.hasStarted()).to.equal(true);
      game.nextQuestion();
      expect(game.hasStarted()).to.equal(true);
    });

    it('Should check whether the game is at the last question after 10 questions', () => {
      for (let i = 0; i < 10; i += 1) {
        expect(game.atLastQuestion()).to.equal(false);
        game.nextQuestion();
      }
      expect(game.atLastQuestion()).to.equal(true);
    });
  });

  describe('Should add players to the game', () => {
    it('Should add players to the game', () => {
      expect(game.hasPlayer('alan')).to.equal(false);
      game.addPlayer('1', 'alan');
      expect(game.hasPlayer('alan')).to.equal(true);

      expect(game.hasPlayer('belle')).to.equal(false);
      game.addPlayer('2', 'belle');
      expect(game.hasPlayer('belle')).to.equal(true);

      expect(game.hasPlayer('charlie')).to.equal(false);
      game.addPlayer('3', 'charlie');
      expect(game.hasPlayer('charlie')).to.equal(true);
    });
  });

  describe('Should throw error if unable to add players to the game', () => {
    beforeEach(() => {
      game.addPlayer('alan', 'alan');
      game.addPlayer('belle', 'belle');
      game.addPlayer('charlie', 'charlie');
    });

    it('Should throw an error if the game is full with 4 players', () => {
      // override default game config
      game.config.maxPlayers = 4;

      game.addPlayer('denise', 'denise');
      const addNewPlayer = () => game.addPlayer('eddie', 'eddie');
      expect(addNewPlayer).to.throw(/full/);
    });

    it('Should throw an error if username is already taken', () => {
      const addNewPlayer = () => game.addPlayer('newSocketId', 'alan');
      expect(addNewPlayer).to.throw(/username.*taken/i);
    });

    it('Should throw an error if the game has already started', () => {
      game.nextQuestion();
      const addNewPlayer = () => game.addPlayer('eddie', 'eddie');
      expect(addNewPlayer).to.throw(/started/);
    });
  });

  describe('Should remove players from the game', () => {
    beforeEach(() => {
      game.addPlayer('1', 'alan');
      game.addPlayer('2', 'belle');
      game.addPlayer('3', 'charlie');
    });

    it('Should remove players from the game', () => {
      expect(game.hasPlayer('alan')).to.equal(true);
      game.removePlayer('1');
      expect(game.hasPlayer('alan')).to.equal(false);
      expect(Object.keys(game.players).length).to.equal(2);

      expect(game.hasPlayer('belle')).to.equal(true);
      game.removePlayer('2');
      expect(game.hasPlayer('belle')).to.equal(false);
      expect(Object.keys(game.players).length).to.equal(1);

      expect(game.hasPlayer('charlie')).to.equal(true);
      game.removePlayer('3');
      expect(game.hasPlayer('charlie')).to.equal(false);
      expect(Object.keys(game.players).length).to.equal(0);
    });

    it('Should have no effect when attempting to removing non-existent players', () => {
      game.removePlayer('4');
      expect(Object.keys(game.players).length).to.equal(3);
      game.removePlayer('5');
      expect(Object.keys(game.players).length).to.equal(3);
      game.removePlayer('6');
      expect(Object.keys(game.players).length).to.equal(3);
    });
  });

  describe('Should retrieve all players', () => {
    beforeEach(() => {
      game.addPlayer('4', 'denise');
      game.addPlayer('1', 'alan');
      game.addPlayer('2', 'belle');
    });

    it('Should retrieve all players', () => {
      expect(game.getPlayers().length).to.equal(3);
      game.removePlayer('1');
      expect(game.getPlayers().length).to.equal(2);
      game.removePlayer('2');
      expect(game.getPlayers().length).to.equal(1);
      game.addPlayer('3', 'charlie');
      expect(game.getPlayers().length).to.equal(2);
    });

    it('Should sort players in alphabetical order of their names', () => {
      let expected = [
        { username: 'alan', score: 0, answered: false },
        { username: 'belle', score: 0, answered: false },
        { username: 'denise', score: 0, answered: false },
      ];
      expect(game.getPlayers()).to.deep.equal(expected);

      game.addPlayer('3', 'charlie');

      expected = [
        { username: 'alan', score: 0, answered: false },
        { username: 'belle', score: 0, answered: false },
        { username: 'charlie', score: 0, answered: false },
        { username: 'denise', score: 0, answered: false },
      ];
      expect(game.getPlayers()).to.deep.equal(expected);
    });
  });

  describe('Should retrive questions', () => {
    it('Should retrieve a question with a prompt and an array of answers', () => {
      for (let i = 0; i < 5; i += 1) {
        const question = game.nextQuestion();
        expect(question.prompt).to.be.a('string');
        expect(question.prompt.length).to.not.equal(0);
        expect(question.answers).to.be.an('array');
        expect(question.answers.length).to.equal(4);
        question.answers.forEach((answer) => {
          expect(answer).to.be.a('string');
          expect(answer.length).to.not.equal(0);
        });
      }
    });

    it('Should retrieve a new question at every call', () => {
      const questionsSoFar = new Set();
      for (let i = 0; i < 5; i += 1) {
        const prompt = game.nextQuestion().prompt;
        expect(questionsSoFar.has(prompt)).to.equal(false);
        questionsSoFar.add(prompt);
      }
    });

    it('Should retrieve the current question', () => {
      let currentQuestionPrompt;
      for (let i = 0; i < 5; i += 1) {
        currentQuestionPrompt = game.nextQuestion().prompt;
        expect(game.getCurrentQuestion().question).to.equal(currentQuestionPrompt);
      }
    });
  });

  describe('Should receive answers from players', () => {
    let sampleQuestions;
    let samplePlayers;

    beforeEach(() => {
      samplePlayers = [
        {
          socketId: 'alan',
          username: 'alan',
        }, {
          socketId: 'belle',
          username: 'belle',
        },
      ];

      sampleQuestions = [
        {
          question: '1',
          correct_ans: '1',
          incorrect_ans_1: '2',
          incorrect_ans_2: '3',
          incorrect_ans_3: '4',
        }, {
          question: '2',
          correct_ans: '2',
          incorrect_ans_1: '1',
          incorrect_ans_2: '3',
          incorrect_ans_3: '4',
        }, {
          question: '3',
          correct_ans: '3',
          incorrect_ans_1: '1',
          incorrect_ans_2: '2',
          incorrect_ans_3: '4',
        }, {
          question: '4',
          correct_ans: '4',
          incorrect_ans_1: '1',
          incorrect_ans_2: '3',
          incorrect_ans_3: '2',
        }, {
          question: '5',
          correct_ans: '5',
          incorrect_ans_1: '1',
          incorrect_ans_2: '3',
          incorrect_ans_3: '4',
        },
      ];

      samplePlayers.forEach(player => game.addPlayer(player.socketId, player.username));
      game.questions = sampleQuestions;
    });

    it('Should retrieve the correct answer', () => {
      game.nextQuestion();
      expect(game.getAnswer()).to.equal('1');
      game.nextQuestion();
      expect(game.getAnswer()).to.equal('2');
      game.nextQuestion();
      expect(game.getAnswer()).to.equal('3');
      game.nextQuestion();
      expect(game.getAnswer()).to.equal('4');
      game.nextQuestion();
      expect(game.getAnswer()).to.equal('5');
    });

    it('Should add score to a player if the player submitted the correct answer', () => {
      game.nextQuestion();
      game.receiveAnswer('alan', '1');
      expect(game.players.alan.score).to.equal(10);
      game.receiveAnswer('belle', '2');
      expect(game.players.belle.score).to.equal(0);

      game.nextQuestion();
      game.receiveAnswer('alan', '2');
      expect(game.players.alan.score).to.equal(20);
      game.receiveAnswer('belle', '3');
      expect(game.players.belle.score).to.equal(0);

      game.nextQuestion();
      game.receiveAnswer('alan', '4');
      expect(game.players.alan.score).to.equal(20);
      game.receiveAnswer('belle', '4');
      expect(game.players.belle.score).to.equal(0);
    });

    it('Should check whether all players in the game have submitted an answer', () => {
      game.nextQuestion();
      expect(game.allAnswered()).to.equal(false);
      game.receiveAnswer('alan', '1');
      expect(game.allAnswered()).to.equal(false);
      game.receiveAnswer('belle', '1');
      expect(game.allAnswered()).to.equal(true);

      game.nextQuestion();
      expect(game.allAnswered()).to.equal(false);
      game.receiveAnswer('alan', '1');
      expect(game.allAnswered()).to.equal(false);
      game.receiveAnswer('belle', '1');
      expect(game.allAnswered()).to.equal(true);

      game.nextQuestion();
      expect(game.allAnswered()).to.equal(false);
      game.receiveAnswer('belle', '1');
      expect(game.allAnswered()).to.equal(false);
      game.receiveAnswer('alan', '1');
      expect(game.allAnswered()).to.equal(true);
    });
  });
});
