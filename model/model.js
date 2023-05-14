const sqlite3 = require('sqlite3').verbose();

function getInfoUser(callback, data){
    let volunteering = new sqlite3.Database('./model/volunteering.sqlite3');

    let query = "INSERT INTO User (name, email, phone_number, date_of_birth, password, role) VALUES (?, ?, ?, ?, ?, ?)";

    volunteering.all(query, data, (err, rows) => {
        if (err){
            callback(err, null);
        }else{
            callback(null, rows);
        };
        volunteering.close()
    })
};

function getInfoCompany(callback, data){
    let volunteering = new sqlite3.Database('./model/volunteering.sqlite3');

    let query = "INSERT INTO Company(name_of_company, name_of_creator, email, type, password, file, role) VALUES (?, ?, ?, ?, ?, ?, ?)";

    volunteering.all(query, data, (err, rows) => {
        if (err){
            callback(err, null);
        }else{
            callback(null, rows);
        };
        volunteering.close()
    })
};

function getInfoActivity(callback, data){
    let volunteering = new sqlite3.Database('./model/volunteering.sqlite3');

    let query = "INSERT INTO Activity(curator, address, date, type, time) VALUES (?, ?, ?, ?, ?)";

    volunteering.all(query, data, (err, rows) => {
        if (err){
            callback(err, null);
        }else{
            callback(null, rows);
        };
        volunteering.close()
    })
};



module.exports = {
    getInfoUser, 
    getInfoCompany,
    getInfoActivity
};

