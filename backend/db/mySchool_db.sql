DROP DATABASE IF EXISTS mySchool_db;

CREATE DATABASE mySchool_db;

\c mySchool_db;

DROP TABLE IF EXISTS classes;
DROP TABLE IF EXISTS students;



CREATE TABLE classes (
    id SERIAL PRIMARY KEY,
    name TEXT,
    teacher TEXT,
    students TEXT
);

CREATE TABLE students(
    id SERIAL PRIMARY KEY,
    name TEXT    -- REFERENCES classes(id),
    age INT,
    city TEXT,	
    grade INT,
    house TEXT
);



INSERT INTO classes (name, teacher)
    VALUES ('Transfiguration', 'Ms. Minerva McGonagall'),
          ('Potions', 'Mr. Severus Snape'),
          ('Defense Against the Dark Arts', 'Mr. Remus Lupin'),
          ('Care of Magical Creatures', 'Mr. Rubeus Hagrid');
          ('Herbology', 'Ms. Pomona Sprout'),
          ('Charms', 'Mr. Filius Flitwick');


INSERT INTO students (name, age, city, grade, house)
    VALUES ('Itoro Uko', 25, Houston, 98.1, Gryffindor);
        ('Chidera Manke', 23, Atlanta, 88.5, Gryffindor);
        ('Harry Potter', 22, Godric Hallows, 86.5, Gryffindor);
        ('Luna Lovegood', 23, Atlanta, 80.0, Ravenclaw);
        ('Terry Boot', 24, Atlanta, 65.1, Ravenclaw);
        ('Susan Bones', 23, Atlanta, 89.0, Hufflepuff);
        ('Ronald Weasley', 22, Atlanta, 88.5, Gryffindor);
        ('Hannah Abbott', 23, Wembley, 61.9, Hufflepuff);
        ('Zacharias Smith', 23, Atlanta, 86.5, Gryffindor);
        ('Justin Finch-Fletchley', 23, Croydon, 68.5, Hufflepuff);
        ('Draco Malfoy', 22, Atlanta, 64, Slytherin );
        ('Hermione Granger', 22, Atlanta, 97.9, Gryffindor);
        ('Penelope Clearwater', 23, Atlanta, 79.0, Ravenclaw);
        ('Lisa Turpin', 23, Atlanta, 90.2, Ravenclaw);
        ('Padma Patil', 23, Atlanta, 81.7, Ravenclaw);
        ('Millicent Bulstrode', 23, Atlanta, 81.0, Slytherin );
        ('Gregory Goyle', 24, Atlanta, 61.3, Slytherin );





