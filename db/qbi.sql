-- DATABASE AND RELATION CREATION
-----------------------------
CREATE DATABASE qbi;
-----------------------------
\c qbi
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
('Vincent', 'van Gogh', '1853-03-30', 'mririses@gmail.com'),
('Salvador', 'Dali', '1904-05-11', 'meltingaway@gmail.com'), 
('Pablo', 'Picasso', '1885-10-25', 'lifeofpable@gmail.com'), 
('Claude', 'Monet', '1840-11-14', 'dotdot@gmail.com');




INSERT INTO art (artist_id, name, description, price) VALUES 
(1, 'first Vincent name', 'first Vincent description', 124),
(1, 'second Vincent name', 'second Vincent description', 153),
(1, 'third Vincent name', 'third Hamlet description', 145),

(2, 'first Salvador name', 'first Salvador description', 198),
(2, 'second Salvador name', 'second Salvador description', 752),
(2, 'third Salvador name', 'third Salvador description', 125),

(3, 'first Pablo name', 'first Pablo description', 125),
(3, 'second Pablo name', 'second Pablo description', 124),
(3, 'third Pablo name', 'third Pablo description', 612),

(4, 'first Claude name', 'first Claude description', 512),
(4, 'second Claude name', 'second Claude description', 412),
(4, 'third Claude name', 'third Claude description', 312);