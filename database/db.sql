DROP DATABASE IF EXISTS school_of_hogwarts;
CREATE DATABASE school_of_hogwarts;
\c school_of_hogwarts;
DROP TABLE IF EXISTS student;
DROP TABLE IF EXISTS class;

CREATE TABLE student (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    city TEXT NOT NULL,
    age INTEGER,
    grade INTEGER,
);

-- CREATE TABLE class (
--     id SERIAL PRIMARY KEY,
--     name TEXT,
--     species TEXT, 
--     age INTEGER,
--     owner_id INT REFERENCES users(id) ON DELETE SET NULL 
-- );
INSERT INTO student (name, city, age, grade)
    VALUES ('Chinonso Udo', 'Dallas, Texas', 23, 97.4), 
            ('Allison Montgomery', 'Charlotte, North Carolina' 27, 86), 
            ('Blair Waldorf', 'New York City, New York' 25, 97),
            ('Marcus Allen', 'PG County, Maryland', 22, 89.9),
            ('Christian Bale', 'Miami, Florida', 29, 90)
            ('Joffrey Earheart', 'ISan Francisco, California', 21, 59);
            
    -- INSERT INTO pets (name, species, age, owner_id)
    --     VALUES ('Noboru', 'Cat', 14, 1),
    --             ('Hatchi', 'Cat', 10, 1),
    --             ('Snowball', 'Cat', 12, 3),
    --             ('Gruffy', 'Dog', 6, 2),
    --             ('Coco', 'Dog', 3, 5), 
    --             ('Rosco', 'Cat', 19, NULL);