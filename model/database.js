const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("./volunteering.sqlite3", (err) => {
    if (err) {
        console.log(err.message);    
    }
    console.log("подключили");
});

db.serialize(() =>{
    db.run(`
    CREATE TABLE IF NOT EXISTS User (
        id INTEGER UNIQUE,
        name TEXT NOT NULL,
        phone_number TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        date_of_birth TEXT NOT NULL,
        password TEXT NOT NULL,
        image_user TEXT,
        role TEXT NOT NULL,
        PRIMARY KEY (id)
    )
    `, e => console.log(e))
    db.run(`
    CREATE TABLE IF NOT EXISTS Company (
        id INTEGER UNIQUE,
        name_of_company TEXT NOT NULL,
        name_of_creator TEXT NOT NULL,
        email TEXT NOT NULL,
        type TEXT NOT NULL,
        password TEXT NOT NULL,
        file TEXT NOT NULL,
        image_company TEXT,
        role TEXT NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (name_of_creator) REFERENCES User(id)
    )
    `, e => console.log(e))
    db.run(`
    CREATE TABLE IF NOT EXISTS Activity (
        activity_id INTEGER UNIQUE,
        name TEXT NOT NULL,
        curator TEXT NOT NULL,
        address TEXT NOT NULL,
        district TEXT NOT NULL,
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        type TEXT NOT NULL,
        image TEXT NOT NULL,
        company TEXT NOT NULL,
        PRIMARY KEY (activity_id),
        FOREIGN KEY (company) REFERENCES Company(id)
    )
    `, e => console.log(e))
    db.run(`
    CREATE TABLE IF NOT EXISTS Partisipants(
        participants_id INTEGER UNIQUE,
        name_of_activity TEXT NOT NULL,
        user_id_1 INTEGER UNIQUE,
        PRIMARY KEY (participants_id),
        FOREIGN KEY (name_of_activity) REFERENCES Activity(activity_id),
        FOREIGN KEY (user_id_1) REFERENCES User(id),
        UNIQUE (name_of_activity, user_id_1) ON CONFLICT REPLACE
    )`,e => console.log(e))
})

db.close()