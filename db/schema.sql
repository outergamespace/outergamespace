CREATE DATABASE trivia;

USE trivia;

CREATE TABLE users(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL UNIQUE,
  hash VARCHAR(64) NOT NULL,
  total_points INT NOT NULL,
  games_played INT NOT NULL,
  badge VARCHAR(120) NOT NULL
);

CREATE TABLE games(
  id VARCHAR(4) PRIMARY KEY NOT NULL,
  host_username VARCHAR(20) NOT NULL UNIQUE,
  num_questions INT NOT NULL,
  time_per_question INT NOT NULL,
  max_players INT NOT NULL,
  num_players INT NOT NULL DEFAULT 0,
  isStarted TINYINT NOT NULL DEFAULT 0
);
