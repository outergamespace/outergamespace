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

CREATE TABLE users(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL,
  total_points INT NOT NULL,
  games_played INT NOT NULL,
  badge VARCHAR(120) NOT NULL
)

/* Dummy Data */

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ('Which of the following is not a member of the Outer Game Space team?', 'Brandon', 'Hack Reactor', '1');
INSERT INTO incorrect_answers (question_id, ans) VALUES (1, 'Lam');
INSERT INTO incorrect_answers (question_id, ans) VALUES (1, 'Lynne');
INSERT INTO incorrect_answers (question_id, ans) VALUES (1, 'Leo');

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

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("Who was the British Prime Minister at the outbreak of the Second World War?", "Neville Chamberlain", "Politics", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (6, "Clement Attlee");
INSERT INTO incorrect_answers (question_id, ans) VALUES (6, "Winston Churchill");
INSERT INTO incorrect_answers (question_id, ans) VALUES (6, "Stanley Baldwin");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("What is the world's most expensive spice by weight?", "Saffron", "General Knowledge", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (7, "Cinnamon");
INSERT INTO incorrect_answers (question_id, ans) VALUES (7, "Cardamom");
INSERT INTO incorrect_answers (question_id, ans) VALUES (7, "Vanilla");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("In Marvel Comics, Taurus is the founder and leader of which criminal organization?", "Zodiac", "Entertainment: Comics", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (8, "Scorpio");
INSERT INTO incorrect_answers (question_id, ans) VALUES (8, "Tiger Mafia");
INSERT INTO incorrect_answers (question_id, ans) VALUES (8, "The Union");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("What is the area of a circle with a diameter of 20 inches if &pi;= 3.1415?", "314.15 Inches", "Science: Mathematics", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (9, "380.1215 Inches");
INSERT INTO incorrect_answers (question_id, ans) VALUES (9, "3141.5 Inches");
INSERT INTO incorrect_answers (question_id, ans) VALUES (9, "1256.6 Inches");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("Along with Gabe Newell, who co-founded Valve?", "Mike Harrington", "Entertainment: Video Games", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (10, "Robin Walker");
INSERT INTO incorrect_answers (question_id, ans) VALUES (10, "Marc Laidlaw");
INSERT INTO incorrect_answers (question_id, ans) VALUES (10, "Stephen Bahl");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("In World of Warcraft Lore, four Old Gods created a giant and powerful creature. What was it called? ", "The Ancient One", "Entertainment: Video Games", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (11, "Anomalous");
INSERT INTO incorrect_answers (question_id, ans) VALUES (11, "Eater of Souls");
INSERT INTO incorrect_answers (question_id, ans) VALUES (11, "The Lich King");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("What is the capital of Chile?", "Santiago", "Geography", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (12, "Valpara&iacute;so");
INSERT INTO incorrect_answers (question_id, ans) VALUES (12, "Copiap&oacute;");
INSERT INTO incorrect_answers (question_id, ans) VALUES (12, "Antofagasta");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("Which of these features was added in the 1994 game 'Heretic' that the original 'DOOM' could not add due to limitations?", "Looking up and down", "Entertainment: Video Games", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (13, "Increased room sizes");
INSERT INTO incorrect_answers (question_id, ans) VALUES (13, "Unlimited weapons");
INSERT INTO incorrect_answers (question_id, ans) VALUES (13, "Highly-detailed textures");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("In what year was the original Sonic the Hedgehog game released?", "1991", "Entertainment: Video Games", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (14, "1989");
INSERT INTO incorrect_answers (question_id, ans) VALUES (14, "1993");
INSERT INTO incorrect_answers (question_id, ans) VALUES (14, "1995");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("When did Jamaica recieve its independence from England? ", "1962", "History", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (15, "1492");
INSERT INTO incorrect_answers (question_id, ans) VALUES (15, "1963");
INSERT INTO incorrect_answers (question_id, ans) VALUES (15, "1987");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("The Herero genocide was perpetrated in Africa by which of the following colonial nations?", "Germany", "History", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (16, "Britain");
INSERT INTO incorrect_answers (question_id, ans) VALUES (16, "Belgium");
INSERT INTO incorrect_answers (question_id, ans) VALUES (16, "France");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("Which one of these artists appears in the album Deltron 3030?", "Dan the Automater", "Entertainment: Music", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (17, "Lamarr Kendrick");
INSERT INTO incorrect_answers (question_id, ans) VALUES (17, "Danger Mouse");
INSERT INTO incorrect_answers (question_id, ans) VALUES (17, "CeeLo Green");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("What is the final game of the 'Zero Escape' series called?", "Zero Escape Zero Time Dilemma ", "Entertainment: Video Games", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (18, "Nine Hours, Nine Persons, Nine Doors ");
INSERT INTO incorrect_answers (question_id, ans) VALUES (18, "Zero Escape Virtue's Last Reward");
INSERT INTO incorrect_answers (question_id, ans) VALUES (18, "The Nonary Game: Sigma's Last Life");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("Where is Earth's South Magnetic Pole?", "The North Pole", "Geography", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (19, "The South Pole");
INSERT INTO incorrect_answers (question_id, ans) VALUES (19, "The Tropic of Cancer");
INSERT INTO incorrect_answers (question_id, ans) VALUES (19, "The Equator");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("What is the name the location-based augmented reality game developed by Niantic before Pok&eacute;mon GO?", "Ingress", "Entertainment: Video Games", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (20, "Aggress");
INSERT INTO incorrect_answers (question_id, ans) VALUES (20, "Regress");
INSERT INTO incorrect_answers (question_id, ans) VALUES (20, "Digress");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("What is the name of the first 'Star Wars' film by release order?", "A New Hope", "Entertainment: Film", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (21, "The Phantom Menace");
INSERT INTO incorrect_answers (question_id, ans) VALUES (21, "The Force Awakens");
INSERT INTO incorrect_answers (question_id, ans) VALUES (21, "Revenge of the Sith");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("Who developed the first successful polio vaccine in the 1950s?", "Jonas Salk", "Science & Nature", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (22, "John F. Enders");
INSERT INTO incorrect_answers (question_id, ans) VALUES (22, "Thomas Weller");
INSERT INTO incorrect_answers (question_id, ans) VALUES (22, "Frederick Robbins");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("What year was the Disney film 'A Goofy Movie' released?", "1995", "Entertainment: Cartoon & Animations", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (23, "1999");
INSERT INTO incorrect_answers (question_id, ans) VALUES (23, "2001");
INSERT INTO incorrect_answers (question_id, ans) VALUES (23, "1997");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("What is the unit of currency in Laos?", "Kip", "General Knowledge", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (24, "Ruble");
INSERT INTO incorrect_answers (question_id, ans) VALUES (24, "Konra");
INSERT INTO incorrect_answers (question_id, ans) VALUES (24, "Dollar");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("Which of these is NOT a part of the structure of a typical neuron?", "Islets of Langerhans", "Science & Nature", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (25, "Node of Ranvier");
INSERT INTO incorrect_answers (question_id, ans) VALUES (25, "Schwann cell");
INSERT INTO incorrect_answers (question_id, ans) VALUES (25, "Myelin sheath");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("Which German city is located on the River Isar?", "Munich", "Geography", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (26, "Berlin");
INSERT INTO incorrect_answers (question_id, ans) VALUES (26, "Hamburg");
INSERT INTO incorrect_answers (question_id, ans) VALUES (26, "Dortmund");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("In which year did the First World War begin?", "1914", "History", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (27, "1930");
INSERT INTO incorrect_answers (question_id, ans) VALUES (27, "1917");
INSERT INTO incorrect_answers (question_id, ans) VALUES (27, "1939");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("Which team was the 2015-2016 NBA Champions?", "Cleveland Cavaliers", "Sports", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (28, "Golden State Warriors");
INSERT INTO incorrect_answers (question_id, ans) VALUES (28, "Toronto Raptors");
INSERT INTO incorrect_answers (question_id, ans) VALUES (28, "Oklahoma City Thunders");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("In which Mario game did the Mega Mushroom make its debut?", "Mario Party 4", "Entertainment: Video Games", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (29, "New Super Mario Bros.");
INSERT INTO incorrect_answers (question_id, ans) VALUES (29, "Mario Kart Wii");
INSERT INTO incorrect_answers (question_id, ans) VALUES (29, "Super Mario 3D World");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("Who is the founder of 'The Lego Group'?", "Ole Kirk Christiansen", "General Knowledge", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (30, " Jens Niels Christiansen");
INSERT INTO incorrect_answers (question_id, ans) VALUES (30, "Kirstine Christiansen");
INSERT INTO incorrect_answers (question_id, ans) VALUES (30, " Gerhardt Kirk Christiansen");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("The main protagonist of the fourth part of JoJo's Bizarre Adventure is which of the following?", "Josuke Higashikata", "Entertainment: Japanese Anime & Manga", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (31, "Yoshikage kira");
INSERT INTO incorrect_answers (question_id, ans) VALUES (31, "Koichi Hirose");
INSERT INTO incorrect_answers (question_id, ans) VALUES (31, "Joey JoJo");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("In the 2010 Nightmare on Elm Street reboot, who played Freddy Kruger?", "Jackie Earle Haley", "Entertainment: Film", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (32, "Tyler Mane");
INSERT INTO incorrect_answers (question_id, ans) VALUES (32, "Derek Mears");
INSERT INTO incorrect_answers (question_id, ans) VALUES (32, "Gunnar Hansen");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("Who co-founded the YouTube Let's Play channel 'Game Grumps' alongside Newgrounds animator Egoraptor?", "JonTron", "Entertainment: Television", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (33, "Pewdiepie");
INSERT INTO incorrect_answers (question_id, ans) VALUES (33, "Tobuscus");
INSERT INTO incorrect_answers (question_id, ans) VALUES (33, "Markiplier");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("What was the first PlayStation game to require the use of the DualShock controller?", "Ape Escape", "Entertainment: Video Games", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (34, "Metal Gear");
INSERT INTO incorrect_answers (question_id, ans) VALUES (34, "Tekken ");
INSERT INTO incorrect_answers (question_id, ans) VALUES (34, "Tomba 2!");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("Which of these is NOT a name of an album released by American rapper Pitbull?", "Welcome to Miami", "Entertainment: Music", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (35, "Dale");
INSERT INTO incorrect_answers (question_id, ans) VALUES (35, "Global Warming");
INSERT INTO incorrect_answers (question_id, ans) VALUES (35, "Armando");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("In Touhou: Embodiment of Scarlet Devil, what song plays during Flandre Scarlet's boss fight?", "U.N. Owen Was Her", "Entertainment: Video Games", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (36, "Septette for the Dead Princess");
INSERT INTO incorrect_answers (question_id, ans) VALUES (36, "Flowering Night");
INSERT INTO incorrect_answers (question_id, ans) VALUES (36, "Pierrot of the Star-Spangled Banner");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("How many times do you fight the Imprisoned in The Legend of Zelda: Skyward Sword?", "3", "Entertainment: Video Games", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (37, "2");
INSERT INTO incorrect_answers (question_id, ans) VALUES (37, "4");
INSERT INTO incorrect_answers (question_id, ans) VALUES (37, "5");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("What tiny principality lies between Spain and France?", "Andorra", "Geography", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (38, "Liechtenstein");
INSERT INTO incorrect_answers (question_id, ans) VALUES (38, "Monaco");
INSERT INTO incorrect_answers (question_id, ans) VALUES (38, "San Marino");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("In CSS, which of these values CANNOT be used with the 'position' property?", "center", "Science: Computers", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (39, "static");
INSERT INTO incorrect_answers (question_id, ans) VALUES (39, "absolute");
INSERT INTO incorrect_answers (question_id, ans) VALUES (39, "relative");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("What was the first game ever released that ran on the Source engine?", "Counter-Strike: Source", "Entertainment: Video Games", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (40, "Half-Life 2");
INSERT INTO incorrect_answers (question_id, ans) VALUES (40, "Garry's Mod");
INSERT INTO incorrect_answers (question_id, ans) VALUES (40, "Team Fortress 2");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("What is the first primary weapon the player gets in 'PAYDAY: The Heist'?", "AMCAR-4", "Entertainment: Video Games", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (41, "Brenner 21");
INSERT INTO incorrect_answers (question_id, ans) VALUES (41, "Reinbeck");
INSERT INTO incorrect_answers (question_id, ans) VALUES (41, "M308");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("What was the first .hack game?", ".hack//Infection", "Entertainment: Video Games", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (42, ".hack//Zero");
INSERT INTO incorrect_answers (question_id, ans) VALUES (42, ".hack//Sign");
INSERT INTO incorrect_answers (question_id, ans) VALUES (42, ".hack//Liminality");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("Which historical conflict killed the most people?", "World War II", "History", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (43, "Taiping Rebellion");
INSERT INTO incorrect_answers (question_id, ans) VALUES (43, "Three Kingdoms War");
INSERT INTO incorrect_answers (question_id, ans) VALUES (43, "Mongol conquests");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("What city did the monster attack in the film, 'Cloverfield'?", "New York, New York", "Entertainment: Film", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (44, "Las Vegas, Nevada");
INSERT INTO incorrect_answers (question_id, ans) VALUES (44, "Chicago, Illinois");
INSERT INTO incorrect_answers (question_id, ans) VALUES (44, "Orlando, Florida");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("Who voiced Metalbeard in 'The Lego Movie'?", "Nick Offerman", "Entertainment: Film", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (45, "Liam Neeson");
INSERT INTO incorrect_answers (question_id, ans) VALUES (45, "Morgan Freeman");
INSERT INTO incorrect_answers (question_id, ans) VALUES (45, "Will Arnet");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("Who is the lead singer of Bastille?", "Dan Smith", "Entertainment: Music", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (46, "Will Farquarson");
INSERT INTO incorrect_answers (question_id, ans) VALUES (46, "Kyle Simmons");
INSERT INTO incorrect_answers (question_id, ans) VALUES (46, "Chris Wood");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("In Overwatch, how old is Reinhardt Wilhelm?", "61", "Entertainment: Video Games", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (47, "59");
INSERT INTO incorrect_answers (question_id, ans) VALUES (47, "65");
INSERT INTO incorrect_answers (question_id, ans) VALUES (47, "62");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("What was the name of the protagonist in the movie Commando (1985)?", "John Matrix", "Entertainment: Film", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (48, "Ben Richards");
INSERT INTO incorrect_answers (question_id, ans) VALUES (48, "Douglas Quaid");
INSERT INTO incorrect_answers (question_id, ans) VALUES (48, "Harry Tasker");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("In the novel 'Lord of the Rings', how many rings of power were given to the race of man?", "9", "Entertainment: Books", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (49, "5");
INSERT INTO incorrect_answers (question_id, ans) VALUES (49, "11");
INSERT INTO incorrect_answers (question_id, ans) VALUES (49, "13");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("Which one of these cartoon characters is NOT voiced by Rob Paulsen?", "Max Tennyson (Ben 10)", "Entertainment: Cartoon & Animations", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (50, "Carl Wheezer (Jimmy Neutron)");
INSERT INTO incorrect_answers (question_id, ans) VALUES (50, "Yakko Warner (Animaniacs)");
INSERT INTO incorrect_answers (question_id, ans) VALUES (50, "The Mask (The Mask, TV Series)");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("The cake depicted in Valve's 'Portal' franchise most closely resembles which real-world type of cake?", "Black Forest", "Entertainment: Video Games", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (51, "Devil's Food");
INSERT INTO incorrect_answers (question_id, ans) VALUES (51, "Molten Chocolate");
INSERT INTO incorrect_answers (question_id, ans) VALUES (51, "German Chocolate");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("What was studio Trigger's first original long-form animated series for television?", "Kill la Kill", "Entertainment: Japanese Anime & Manga", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (52, "Kiznaiver");
INSERT INTO incorrect_answers (question_id, ans) VALUES (52, "Inferno Cop");
INSERT INTO incorrect_answers (question_id, ans) VALUES (52, "Gurren Lagann");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("Who is the main protagonist of 'Ace Combat Zero: The Belkan War'?", "Cipher", "Entertainment: Video Games", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (53, "Mobius 1");
INSERT INTO incorrect_answers (question_id, ans) VALUES (53, "Blaze");
INSERT INTO incorrect_answers (question_id, ans) VALUES (53, "Pixy");

INSERT INTO questions (question, correct_ans, category, difficulty)
VALUES ("In the 'Call Of Duty: Zombies' map 'Origins', how many numbered power generators are there?", "6", "Entertainment: Video Games", '2');
INSERT INTO incorrect_answers (question_id, ans) VALUES (54, "8");
INSERT INTO incorrect_answers (question_id, ans) VALUES (54, "5");
INSERT INTO incorrect_answers (question_id, ans) VALUES (54, "3");
