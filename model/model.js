const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
function setRegistrationUser(callback, data) {
    let volunteering = new sqlite3.Database('./model/volunteering.sqlite3');

    let query = "INSERT INTO User (name, email, phone_number, date_of_birth, password, role) VALUES (?, ?, ?, ?, ?, ?)";
    try {
        volunteering.all(query, data, (err, rows) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, rows);
            };
            volunteering.close()
        })
    } catch (err) {
        console.log(err, 1)
    }
};

function setRegistrationCompany(callback, data) {
    let volunteering = new sqlite3.Database('./model/volunteering.sqlite3');

    let query = "INSERT INTO Company(name_of_company, name_of_creator, email, type, password, file, role) VALUES (?, ?, ?, ?, ?, ?, ?)";
    try {
        volunteering.all(query, data, (err, rows) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, rows);
            };
            volunteering.close()
        })
    } catch (err) {
        console.log(err, 2)
    }
};

function setInfoActivity(callback, data) {
    let volunteering = new sqlite3.Database('./model/volunteering.sqlite3');

    let query = "INSERT INTO Activity(curator, address, date, type, time) VALUES (?, ?, ?, ?, ?)";

    volunteering.all(query, data, (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        };
        volunteering.close()
    })
};

function checkinLoginData(callback, data) {
    let volunteering = new sqlite3.Database('./model/volunteering.sqlite3');

    let query = "SELECT * FROM User WHERE email = ? AND password = ?";

    volunteering.all(query, data, (err, rows) => {
        console.log(rows)
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        };
        volunteering.close()
    })
}


module.exports = {
    setRegistrationUser,
    setRegistrationCompany,
    setInfoActivity,
    checkinLoginData
};

