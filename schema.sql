DROP DATABASE IF EXISTS burger_list_db;

CREATE DATABASE burger_list_db;

USE burger_list_db;

CREATE TABLE burger (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO burger (name) VALUES ('Quarter Pounder Cheeseburger');