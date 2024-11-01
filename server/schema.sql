-- Esta es la base de esta base de datos.
CREATE DATABASE cards;

USE cards;

-- Tengo 12 campos
CREATE TABLE card(
	id INT NOT NULL AUTO_INCREMENT,
	author VARCHAR(50) NOT NULL,
	title VARCHAR(50) NOT NULL,
	edition INT NOT NULL,
	city VARCHAR(50) NOT NULL,
	editorial VARCHAR(50) NOT NULL,
	year INT NOT NULL,
	category INT NOT NULL,
	volume INT NOT NULL,
	collection VARCHAR(50) NOT NULL,
	isbn VARCHAR(50) NOT NULL,
	amount INT NOT NULL,
	borrowed INT NOT NULL,
	PRIMARY KEY (id)
);

-- usuarios (bibliotecario, administradores, lectores)
CREATE TABLE client(
	id INT NOT NULL AUTO_INCREMENT UNIQUE,
	email VARCHAR(50) NOT NULL, -- 
	name VARCHAR(50) NOT NULL,
	role VARCHAR(10) NOT NULL, -- librarian, admin, reader
	password VARCHAR(100) NOT NULL,
	salt VARCHAR(50) NOT NULL,
	PRIMARY KEY (email)
);

-- prestamos
CREATE TABLE borrowed(
	id INT NOT NULL AUTO_INCREMENT,
	id_card INT NOT NULL,
	email_client VARCHAR(50) NOT NULL, -- id_client: cedula
	PRIMARY KEY (id),
	FOREIGN KEY (id_card) REFERENCES card(id), 
	FOREIGN KEY (email_client) REFERENCES client(email)
);

--Testing initial values
INSERT INTO client (email, name, role, password) VALUES ('admin', 'admin', 'admin', 'admin');
INSERT INTO client (email, name, role, password) VALUES ('oscar@gmail.com', 'Oscar Mendez', 'admin', 'oscar');
INSERT INTO client (email, name, role, password) VALUES ('juan@gmail.com', 'Juan Temistocles', 'librarian', 'juan');

INSERT INTO card (author, title, edition, city, editorial, year, category, volume, collection, isbn, amount, borrowed) VALUES ('Marta Aguilar', 'La voz de cristo', 4, 'Barcelona', 'Girasol', 1990, 200, 2, 'Especial', '92383473', 3, 1);
INSERT INTO card (author, title, edition, city, editorial, year, category, volume, collection, isbn, amount, borrowed) VALUES ('Pepe Lucio', 'Los 5 secretos del papel higienico', 4, 'Lecheria', 'Girasol', 2000, 250, 1, 'Comun', '3478123', 4, 4);
INSERT INTO card (author, title, edition, city, editorial, year, category, volume, collection, isbn, amount, borrowed) VALUES ('Jhonatan Mircha', 'Pensar es pensamientos', 4, 'Barcelona', 'Watpatt', 2010, 100, 1, 'Especial', '6458942', 1, 0);
INSERT INTO card (author, title, edition, city, editorial, year, category, volume, collection, isbn, amount, borrowed) VALUES ('Malba Tahan', 'El hombre que calculaba', 4, 'Puerto la cruz', 'Watpatt', 2010, 100, 3, 'Especial', '8454783', 1, 0);

INSERT INTO borrowed (id_card, email_client) VALUES (1, 'admin');
INSERT INTO borrowed (id_card, email_client) VALUES (1, 'oscar@gmail.com');
INSERT INTO borrowed (id_card, email_client) VALUES (2, 'juan@gmail.com');
INSERT INTO borrowed (id_card, email_client) VALUES (2, '3495482');
