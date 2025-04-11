CREATE TABLE blogs (
    id SERIAL PRIMARY KEY, 
    author TEXT, 
    url TEXT NOT NULL, 
    title TEXT NOT NULL, 
    likes INT DEFAULT 0
); 

INSERT INTO blogs
    (author, url, title, likes) 
    VALUES ('Eveliina Ikwunna', 'eewrites.com', 'Pain Management case study',  25), 
           ('Emmanuel Ikwunna', 'firstnuel.com', 'Why Typescript should completely replace Javascript', 75); 