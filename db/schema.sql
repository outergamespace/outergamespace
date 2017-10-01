CREATE DATABASE trivia;

USE trivia;

CREATE TABLE questions(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  question VARCHAR(120) NOT NULL,
  correct_ans VARCHAR(40) NOT NULL,
  category VARCHAR(40),
  difficulty ENUM ('1', '2', '3')
);

CREATE TABLE incorrect_answers(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  question_id INT REFERENCES questions(id),
  ans VARCHAR(40) NOT NULL
);

/* Dummy Data */

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ('Which of the following is not a member of the team?', 'Brandon', 'Hack Reactor', '1');
INSERT INTO incorrect_answers (question_id, ans) VALUES (1, 'Lam');
INSERT INTO incorrect_answers (question_id, ans) VALUES (1, 'Lynne');
INSERT INTO incorrect_answers (question_id, ans) VALUES (1, 'Adrian');

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ('What is the circumference of the earth?', '40,075km', 'Astronomy', '3');
INSERT INTO incorrect_answers (question_id, ans) VALUES (2, '23,829km');
INSERT INTO incorrect_answers (question_id, ans) VALUES (2, '100,263km');
INSERT INTO incorrect_answers (question_id, ans) VALUES (2, '7,294km');

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ('Which of the following states is the most populous?', 'Arkansas', 'US', '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (3, 'Nevada');
INSERT INTO incorrect_answers (question_id, ans) VALUES (3, 'Hawaii');
INSERT INTO incorrect_answers (question_id, ans) VALUES (3, 'Virginia');

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ('Which of the following is not a song by Taylor Swift?', 'Into the Woods', 'US', '1');
INSERT INTO incorrect_answers (question_id, ans) VALUES (4, 'White Horse');
INSERT INTO incorrect_answers (question_id, ans) VALUES (4, 'All Too Well');
INSERT INTO incorrect_answers (question_id, ans) VALUES (4, 'Picture to Burn');

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ('In what year did James Madison serve as the President of the United States?', '1809-1817', 'US', '3');
INSERT INTO incorrect_answers (question_id, ans) VALUES (5, '1817-1825');
INSERT INTO incorrect_answers (question_id, ans) VALUES (5, '1801-1809');
INSERT INTO incorrect_answers (question_id, ans) VALUES (5, '1797-1801');