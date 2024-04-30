drop database if exists videogame_db;

create database videogame_db;

\c videogame_db;

CREATE TABLE genres (
  id serial,
  name varchar,
  PRIMARY KEY (id)
);

CREATE TABLE consoles (
  id serial,
  name varchar,
  PRIMARY KEY (id)
);

CREATE TABLE users (
  id serial,
  name varchar,
  email varchar,
  password varchar,
  salt varchar,
  PRIMARY KEY (id)
);

CREATE TABLE user_console (
  id serial,
  user_id integer,
  console_id integer,
  PRIMARY KEY (id),
  CONSTRAINT FK_user_consoles
    FOREIGN KEY (console_id)
      REFERENCES consoles(id),
  CONSTRAINT FK_users_console
    FOREIGN KEY (user_id)
      REFERENCES users(id)
);

CREATE INDEX user_console_fk_index ON  user_console (user_id, console_id);

CREATE TABLE games (
  id serial,
  title varchar,
  genre_id integer,
  release_date integer,
  developer varchar,
  rating integer,
  console_id integer,
  PRIMARY KEY (id),
  CONSTRAINT FK_games_console
    FOREIGN KEY (console_id)
      REFERENCES consoles(id),
  CONSTRAINT FK_games_genre
    FOREIGN KEY (genre_id)
      REFERENCES genres(id)
);

CREATE INDEX games_fk_idx ON  games (genre_id, console_id);