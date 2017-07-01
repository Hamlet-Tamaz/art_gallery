-- DATABASE AND RELATION CREATION
-----------------------------
CREATE DATABASE qbi;
-----------------------------
CREATE TABLE artists (
	id serial PRIMARY KEY,
	first_name text NOT NULL,
	last_name text NOT NULL,
	dob date,
	email text UNIQUE
);

CREATE TABLE art (
	id serial PRIMARY KEY,
	artist_id int REFERENCES artists ON DELETE CASCADE,
	name text NOT NULL,
	description text,
	price money
);


INSERT INTO artists (first_name, last_name, dob, email) VALUES 
('Hamlet', 'Tamazian', '1993-01-22', 'hamlettamaz@gmail.com'), 
('Alain', 'Tamazian', '1996-04-29', 'alaintamaz@gmail.com'), 
('Artur', 'Tamazyan', '1971-01-23', 'arturtamaz@gmail.com'), 
('Rufina', 'Hovakimyan', '1993-02-18', 'rufina@gmail.com');

INSERT INTO art (artist_id, name, description, price) VALUES 
(1, 'first Hamlet name', 'first Hamlet description', 12),
(1, 'second Hamlet name', 'second Hamlet description', 15),
(1, 'third Hamlet name', 'third Hamlet description', 145),

(2, 'first Alain name', 'first Alain description', 19),
(2, 'second Alain name', 'second Alain description', 72),
(2, 'third Alain name', 'third Alain description', 125),

(3, 'first Artur name', 'first Artur description', 125),
(3, 'second Artur name', 'second Artur description', 124),
(3, 'third Artur name', 'third Artur description', 612),

(4, 'first Rufa name', 'first Rufa description', 512),
(4, 'second Rufa name', 'second Rufa description', 412),
(5, 'third Rufa name', 'third Rufa description', 312);