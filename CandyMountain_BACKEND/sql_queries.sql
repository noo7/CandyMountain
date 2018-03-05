psql -h ec2-54-235-252-137.compute-1.amazonaws.com -p 5432 -U milbbhguqvjxpt -d d3o1rgu4g2e39m
2670f50724e1a0b2c2acce24bf5b27e7e5911291d31d9db492641438167abb87



// for creating the users table
CREATE TABLE users( user_id serial PRIMARY KEY, email VARCHAR (100) UNIQUE NOT NULL, password VARCHAR (50) NOT NULL, created_on TIMESTAMP NOT NULL, last_login TIMESTAMP , age INTEGER);

//for inserting data into users TABLE

INSERT INTO users (email, password, age)
VALUES
('test1@gmail.com', 'test1', 22),
('test2@gmail.com', 'test2', 24),
('test3@gmail.com', 'test3', 27),
('test4@gmail.com', 'test4', 28);

INSERT INTO users (email, password, age)
VALUES
('test5@gmail.com', 'test5', 22),
('test6@gmail.com', 'test6', 24);

CREATE TABLE activities (activity_id serial PRIMARY KEY, title VARCHAR(100) NOT NULL, description VARCHAR(500), added_by int4 REFERENCES users(user_id), latitude INT, longitude INT,   nr_of_likes INT);
CREATE TABLE lists (list_id serial PRIMARY KEY, title VARCHAR(100), description VARCHAR(500), created_by int4 REFERENCES users(user_id));

CREATE TABLE activities_in_lists (list_id int4 REFERENCES lists(list_id), activity_id int4 REFERENCES activities(activity_id));
CREATE TABLE user_subscriptions (list_id int4 REFERENCES lists(list_id), user_id int4 REFERENCES users(user_id));


INSERT INTO activities (title, description, added_by, latitude, longitude, nr_of_likes)
VALUES
('sweet club', 'nice club  for dancing', 1, 48.142999, 11.570, 230),
('ohne Zwieblen', 'mit allem ein bisschen scharf', 1, 48.142289, 11.582, 4535),
('Candy Mountain', 'Let go charie, brbbrrrbb', 1, 48.142164, 11.574, 564),
('Bar White', 'it exists it is magical it is true', 2, 48.14222, 11.579, 6543),
('Happy End', 'Not sad end massage', 2, 48.142289, 11.5778, 1199283);


INSERT INTO activities (title, description, added_by, latitude, longitude, nr_of_likes)
VALUES
('Olympic Swimming Pool', 'Take a deep breath, make a dive and swim in the trails of Mark Spitz – on just the location where the outstanding swimmer of 1972 sank all his opponents. The American Superstar took seven Olympic Titles and crowned himself as the most successful athlete of the Games. After the Olympics the Swimming Hall has been the setting for the German Swimming Championships six times. Nowadays it is one of Munich’s most popular public pools. Compared to many other swimming baths the focus is not only on fun and leisure but also on the underlining of the sporty side. Many Munich based swimming clubs use the 50-meter-pool for training as well as competition. More than four decades after the Summer Games of 1972 the Olympic Swimming Hall still provides the best conditions for a peak performance.', 4, 48.143164, 11.474, 47),
('Hikes around Bavarian Alps', 'With currently 1,030 hikes all around Bavarian Alps there are plenty of options for outdoor enthusiasts. In total 930 hiking trails, 29 long distance hiking trails, 39 pilgrim trails and 32 others are waiting to be explored. We know it’s hard to pick one, so here’s an overview of some of the best hikes around Bavarian Alps.', 4, 48.137164, 11.574, 61),
('Lake Life','Just an hour or so away from the Alps, Munich is one of those lucky cities that has nature right on its doorstep. If the Englisch Garten and many city parks aren’t enough for you, why not spend a sunny afternoon by one of these beautiful lakes. Though some are a little further afield, the shores of many can easily be reached by public transport directly from Marienplatz.', 2,48.437164,11.124,193),
('Best Fishing', 'Fishing is the activity of trying to catch fish. Fish are normally caught in the wild. Techniques for catching fish include hand gathering, spearing, netting, angling and trapping. Fishing may include catching aquatic animals other than fish, such as molluscs, cephalopods, crustaceans, and echinoderms. The term is not normally applied to catching farmed fish, or to aquatic mammals, such as whales where the term whaling is more appropriate.', 3,48.537164,11.184, 15),
('Forest Ropes Course', 'The destination Munich Forest Ropes Course Vaterstetten located in Vaterstetten is a Ropes Course.', 36, 48.487164, 11.114, 31),
('Deutsches Museum', 'In the more than 30 exhibitions covering 25,000 square metres of floor space, you’ll find a wealth of masterpieces of science and technology.', 1,48.482164, 11.304,498),
('Pinakothek Munich','The Bayerische Staatsgemäldesammlungen (Bavarian State Painting Collections) is the entrusted custodian of a very substantial part of the public art collections belonging to the Free State of Bavaria, as well as the museums in which the artworks are on show: in Munich the Alte Pinakothek, the Neue Pinakothek, the Sammlung Moderne Kunst (located in the Pinakothek der Moderne), the Museum Brandhorst and the Sammlung Schack, as well as an additional thirteen public art galleries spread across Bavaria. The Bayerische Staatsgemäldesammlungen’s administrative offices are housed in the western wing of the Neue Pinakothek. It is here that art historians with various specialisms work alongside scientists and conservators from the affiliated Doerner Institut and dozens of support staff to manage, preserve, and study the extensive holdings of more than 30,000 valuable objects.',1,48.392164,11.904,162),
('State Library of Bavaria','The Bavarian State Library (German: Bayerische Staatsbibliothek, abbreviated BSB) in Munich is the central "Landesbibliothek", i. e. the state library of the Free State of Bavaria and one of Europe''s most important universal libraries. With its collections currently comprising around 10.36 million books (as of 2016), it ranks among the best research libraries worldwide. Moreover, its historical stock encompasses one of the most important manuscript collections of the world, the largest collection of incunabula worldwide, as well as numerous further important special collections.',37,48.402164,11.704,12),
('THE SHAMROCK IRISH PUB','We have karaoke every tuesday and friday, come and impress your friends with your singing skills.',3,48.93464,11.13404,876),
('The Bavarian Rhön spa region','Winter can be experienced in all its glory in the almost untouched landscape of the National Park and Biosphere Reserve. Cross-country skiers glide around mountain uplands on 70 kilometres of ski runs. Snowboarders and skiers can let off some steam on the pistes covering all difficulty levels on the Arnsberg, Feuerberg, Simmelsberg, Wasserkuppe and Zuckerfeld mountains, and can also visit one of the varied fun parks. Meanwhile, dog sleigh tours and snow shoe walks offer a gentler way to experience nature. One of the most impressive tours in terms of landscape is the guided snow shoe walk on the premium trail "Der Hochrhöner". After an active day, there is simply nothing better than relaxing in one of the five Rhön spa towns with the 19 healing springs and four spa landscapes.',4,48.0464,11.99404,10),
('Englischer Garden','Every Saturday we make a party in Englischer Garden. Join!!!',1,48.5678,11.9038,60),
('Roof Party','Come and enjoy our great Roof Party. Good mood guarantied',2,48.5678,11.9038,12),
('Jogging in Olympiapark','Hey, guys. I go jogging in Olympiapark every Monday, Thursday and Saturday. Do you want to join?',3,48.6778,11.9238,5),
('Poetry Reading at Marienplatz','Come to our Poetry Reading evening. Every Saturday at 20:00',2,48.6778,11.7638,2),
('Board Game','Nice evening with good company.',36,48.12778,11.3238,10),
('Movie Night','Movie Night with warm popcorn and the best atmosphere',37,48.23778,11.2338,15),
('BBQ with Andrew','We organize BBQ when the weather is good. Vegetarians are also welcome',2,48.25778,11.2538,23);

INSERT INTO activities (title, description, added_by, latitude, longitude, nr_of_likes)
VALUES
('Beautiful Sunset','Sunset in Munich',2,48.25778,11.2538,23);




INSERT INTO lists (title, description, created_by)
VALUES
('romantic winter day', 'JUST A PERFECT DAY WITHOUT ZWIEBELN', 1),
('crazy day', 'this is gonna be the best day of your life', 2);

INSERT INTO lists (title, description, created_by)
VALUES
('Nature', 'Perfect activities in the nature', 3),
('Culture', 'Rest with cultural growth', 4),
('Sport', 'Active activities', 1),
('Weekends', 'Activities on Weekends', 2),
('Great Fridays', 'Do not get bored on Friday', 4);

INSERT INTO activities_in_lists (list_id, activity_id)
VALUES
(1, 2),
(1, 4),
(1, 5),
(2, 1),
(2, 3),
(2, 2);

INSERT INTO activities_in_lists (list_id, activity_id)
VALUES
(3, 24),
(3, 25),
(3, 26),
(3, 27),
(3, 40),

(4, 28),
(4, 29),
(4, 30),
(4, 36),

(5, 23),
(5, 35),

(6, 32),
(6, 33),
(6, 39),
(6, 34),

(7, 31),
(7, 38),
(7, 37);

INSERT INTO user_subscriptions (user_id, list_id)
VALUES
(1, 1),
(1, 2),
(2, 2);

INSERT INTO user_subscriptions (user_id, list_id)
VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(2, 2),
(2, 7),
(3, 7),
(4, 4),
(4, 5),
(36, 3),
(36, 6),
(37, 3),
(37, 5);

INSERT INTO tags (title)
VALUES
('#sport'),
('#music'),
('#fun'),
('#munich'),
('#student'),
('#healthy'),
('#goodwhether'),
('#summer'),
('#winter');

INSERT INTO tags_in_activity (activity_id, tag_id)
VALUES
(23, 6),
(23, 5),
(23, 11),

(24, 3),
(24, 6),
(24, 8),
(24, 11),
(24, 12),
(24, 13),

(25, 5),
(25, 9),

(26, 5),

(27, 6),
(27, 4),
(27, 13),
(27, 8),

(28, 4),
(28, 9),
(28, 10),

(29, 9),

(30, 10),

(31, 8),
(31, 7),
(31, 9),
(31, 10),

(32, 5),

(33, 10),
(33, 13),
(33, 12),

(34, 1),
(34, 7),
(34, 8),
(34, 9),
(34, 10),
(34, 11),
(34, 12),
(34, 13),

(35, 6),

(36, 9),

(37, 10);

-- SELECT DISTINCT US.user_id, A.activity_id
-- FROM  (SELECT DISTINCT US.user_id, L.list_id, A.activity_id
--       FROM (SELECT DISTINCT US.user_id, A.activity_id
--             FROM user_subscriptions as US, lists as L, activities_in_lists as AL, activities as A
--             WHERE US.list_id = L.list_id AND US.user_id = 1
--             AND L.list_id = AL.list_id AND AL.activity_id = A.activity_id) A1,
--             user_subscriptions as US, lists as L, activities_in_lists as AL, activities as A
--       WHERE A.activity_id = A1.activity_id and US.user_id != a1.user_id and US.list_id = L.list_id
--           and L.list_id = AL.list_id and AL.activity_id = A.activity_id) RU,
--       user_subscriptions as US, lists as L, activities_in_lists as AL, activities as A
-- WHERE US.list_id = L.list_id and L.list_id = Al.list_id AND
--       Al.activity_id = A.activity_id and A.activity_id != RU.activity_id;

CREATE OR REPLACE TEMPORARY VIEW current_user_acts AS
SELECT DISTINCT US.user_id, A.activity_id
FROM user_subscriptions as US, lists as L, activities_in_lists as AL, activities as A
WHERE US.list_id = L.list_id AND US.user_id = 2
AND L.list_id = AL.list_id AND AL.activity_id = A.activity_id;

CREATE OR REPLACE TEMPORARY VIEW recommended_users AS
SELECT US.user_id
FROM current_user_acts as A1, user_subscriptions as US,
      lists as L, activities_in_lists as AL, activities as A
WHERE A.activity_id = A1.activity_id and US.user_id != a1.user_id and US.list_id = L.list_id
    and L.list_id = AL.list_id and AL.activity_id = A.activity_id
GROUP BY US.user_id
HAVING COUNT(*) > 3;

SELECT TOP 1 DISTINCT US.user_id, A.activity_id, A.title
FROM user_subscriptions as US, lists as L, activities_in_lists as AL, activities as A,
      current_user_acts as CUA, recommended_users as RU
WHERE US.user_id = RU.user_id AND US.list_id = L.list_id
      AND L.list_id = AL.list_id AND AL.activity_id = A.activity_id AND
      A.activity_id NOT IN (SELECT activity_id FROM current_user_acts);