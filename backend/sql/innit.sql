CREATE DATABASE erettsewgi
DEFAULT CHARACTER SET utf8
COLLATE utf8_hungarian_ci;




CREATE TABLE vizsgazo (
    id INT PRIMARY KEY,
    diaknev VARCHAR(100),
    evfolyam INT,
    osztaly CHAR(1)
);

CREATE TABLE tanar (
    id VARCHAR(10) PRIMARY KEY,
    nev VARCHAR(100)
);

CREATE TABLE vizsgak (
    id INT PRIMARY KEY,
    bizottsag VARCHAR(50),
    vizsgatargy VARCHAR(100),
    vizsgazoid INT,
    tanarid VARCHAR(10),
    
    FOREIGN KEY (vizsgazoid) REFERENCES vizsgazo(id),
    FOREIGN KEY (tanarid) REFERENCES tanar(id)
);
