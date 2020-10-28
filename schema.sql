DROP DATABASE IF EXISTS drinks_list_db;

CREATE DATABASE drinks_list_db;

USE drinks_list_db;

CREATE TABLE drink (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO drink (name) VALUES ('Sex on the Beach');