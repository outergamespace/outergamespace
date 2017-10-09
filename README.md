![OuterGameSpace Logo](/images/outergamespace_logo.png)

# OuterGameSpace [![Build Status](https://travis-ci.org/outergamespace/outergamespace.svg?branch=develop)](https://travis-ci.org/outergamespace/outergamespace)

> OuterGameSpace is a trivia game platform catered towards creating in-person game sessions played with Player clients and a central Host presenter. Games are meant to be played in-person with a group to deliver social real-time interaction and feedback.

## Team

  - [Leo Leung](https://github.com/leungleoqin)
  - [Lynne Daniels](https://github.com/Lynne-Daniels)
  - [Adrian Humphrey](https://github.com/adrianhumphrey111)
  - [Lam Bui](https://github.com/lamdbui)

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Roadmap](#roadmap)
1. [Contributing](#contributing)

## Usage

OuterGameSpace is meant to be played with a group together in the same room. There are two different clients: Player and Presenter.

Each player connects to the game via a desktop or mobile device. Each player uses this as their own game screen. There is also a main presenter screen that needs to visible to all players that shows the game board and is used to display information about the state of the game. For example: who has answered the current question so far.

Presenter client:
http://<YOUR_OUTERGAMESPACE_SERVER>
Player client:
http://<YOUR_OUTERGAMESPACE_SERVER>/join

The steps to set-up a game is as follows:
1. Someone initiates a game by connecting to the Presenter client and selecting 'Create a New Game'
1. The Presenter client will now display a 4-letter game code visible to everyone
1. Players can now join the game by entering the 4-letter game code and their name into the form
1. Accepted players will now by shown on the presenter screen
1. The Presenter can now start the game
1. The Player and Presenter will now display questions on the screen with a countdown timer
1. The Player can now submit and answer to the question
1. After all players have submitted an answer or the timer expires, the Presenter will show the correct answer and current score results
1. After a full round of questions have occurred, the Presenter will display the final results and provide an option to restart the game

## Requirements

- Node 6.11.x
- MySQL 5.7.x
- See package.json for additional application dependencies

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Roadmap

View the project roadmap [here](https://docs.google.com/spreadsheets/d/1spVYH4ff5ihcrDYiS6ixOritzBoLicNzOykovLnOkRQ/edit?usp=sharing)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
