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
