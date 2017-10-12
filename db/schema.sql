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
  room_id VARCHAR(10) PRIMARY KEY NOT NULL,
  host_username VARCHAR(20) NOT NULL UNIQUE,
  num_questions INT NOT NULL,
  time_per_question INT NOT NULL,
  max_players INT NOT NULL,
  num_players INT NOT NULL DEFAULT 0,
  is_started TINYINT NOT NULL DEFAULT 0
);

INSERT INTO users (name, hash, total_points, games_played, badge)
VALUES ('Backbone', '$2a$10$WZDCgP6R1OiAIiHYUtXAe.UPvJp0ez.DqSv58E3BJK2drc8yVmj2a', 10000, 100, 'top_dog');
