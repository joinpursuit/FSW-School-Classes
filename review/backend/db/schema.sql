DROP DATABASE IF EXISTS car_lot;
CREATE DATABASE car_lot;

\c car_lot;

DROP TABLE IF EXISTS cars;
CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    brand TEXT,
    year INTEGER
);

INSERT INTO cars(brand, year)
 VALUES
 ('toyota', 1995),
('toyota', 1994);    