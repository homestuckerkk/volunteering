const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const { check } = require('express-validator');
function setRegistrationUser(callback, data) {
    let volunteering = new sqlite3.Database('./model/volunteering.sqlite3');

    let query = "INSERT INTO User (name, email, phone_number, date_of_birth, password, role) VALUES (?, ?, ?, ?, ?, ?)";
    try {
        volunteering.all(query, data, (err, rows) => {
            console.log(rows)
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

    let query = "INSERT INTO Activity(name, curator, address, district, date, type, time, image, company) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

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
        console.log(rows);
        if (rows.length != 0) {
            if (data[1] == rows[0]['password'] && data[0] == rows[0]['email']) {
                console.log(rows, 1)
                rows = [...rows, 'user']
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, rows);
                };
                volunteering.close()
            }
            else {
                callback('Неверные данные', null);
                volunteering.close()
            }
        } else {
            let query = "SELECT * FROM Company WHERE email = ? AND password = ?";
            volunteering.all(query, data, (err, rowss) => {
                if (rowss.length != 0) {
                    if (data[1] == rowss[0]['password'] && data[0] == rowss[0]['email']) {
                        console.log(rowss, 2)
                        rowss = [...rowss, 'company']
                        if (err) {
                            callback(err, null);
                        } else {
                            callback(null, rowss);
                        };
                        volunteering.close()
                    } else {
                        callback('Неверные данные', null);
                        volunteering.close()
                    }
                } else {
                    callback('Неверные данные', null)
                }
            })
        }

    })
};

function getInfoActivity(callback, data){
    let volunteering = new sqlite3.Database('./model/volunteering.sqlite3');

    let query = "SELECT * FROM Activity WHERE company = ?";
    volunteering.all(query, data, (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        };
        volunteering.close()
    })

}

function getInfoActivityForHome(callback, data){
    let volunteering = new sqlite3.Database('./model/volunteering.sqlite3');

    let query = "SELECT * FROM Activity";
    volunteering.all(query, data, (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        };
        volunteering.close()
    })

}

function getInfoActivityForSearch(callback, data){
    let volunteering = new sqlite3.Database('./model/volunteering.sqlite3');

    let query = "SELECT * FROM Activity WHERE district = ? OR type = ?";
    volunteering.all(query, data, (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        };
        volunteering.close()
    })

}

function setImageCompany(callback, data) {
    let volunteering = new sqlite3.Database('./model/volunteering.sqlite3');

    let query = "UPDATE Company SET image_company = ?";

    volunteering.all(query, data, (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        };
        volunteering.close()
    })
};

function setImageUser(callback, data) {
    let volunteering = new sqlite3.Database('./model/volunteering.sqlite3');

    let query = "UPDATE User SET image_user = ?";

    volunteering.all(query, data, (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        };
        volunteering.close()
    })
};


function getImageCompany(callback, data) {
    let volunteering = new sqlite3.Database('./model/volunteering.sqlite3');

    let query = "SELECT * FROM Company WHERE id = ?";
    volunteering.all(query, data, (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        };
        volunteering.close()
    })

}

function getImageUser(callback, data) {
    let volunteering = new sqlite3.Database('./model/volunteering.sqlite3');

    let query = "SELECT * FROM User WHERE id = ?";
    volunteering.all(query, data, (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        };
        volunteering.close()
    })

}

function getInfoOneActivityForHome(callback, data){
    let volunteering = new sqlite3.Database('./model/volunteering.sqlite3');

    let query = "SELECT * FROM Activity WHERE activity_id = ?";
    volunteering.all(query, data, (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        };
        volunteering.close()
    })

}

function signUpToActivity(callback, data) {
    let volunteering = new sqlite3.Database('./model/volunteering.sqlite3');

    let query = "INSERT INTO Partisipants(name_of_activity, user_id_1) VALUES (?, ?)";
    volunteering.all(query, data, (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        };
        volunteering.close()
    })

}

function getActivityUser(callback, data) {
    let volunteering = new sqlite3.Database('./model/volunteering.sqlite3');

    let query = "SELECT * FROM Activity JOIN Partisipants ON Activity.activity_id = Partisipants.name_of_activity WHERE user_id_1 = ?";
    volunteering.all(query, data, (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        };
        volunteering.close()
    })

}
function changePasswordUser(callback, data){
    let volunteering = new sqlite3.Database('./model/volunteering.sqlite3');

    let query = "UPDATE User SET password = ? WHERE id = ?";
    volunteering.all(query, data, (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        };
        volunteering.close()
    })
}

function changePasswordCompany(callback, data){
    let volunteering = new sqlite3.Database('./model/volunteering.sqlite3');

    let query = "UPDATE Company SET password = ? WHERE id = ?"
    volunteering.all(query, data, (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        };
        volunteering.close()
    })
}

function changeUsernameUser(callback, data){
    let volunteering = new sqlite3.Database('./model/volunteering.sqlite3');

    let query = "UPDATE User SET name = ? WHERE id = ?";
    volunteering.all(query, data, (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        };
        volunteering.close()
    })
}

function checkUsernameUser(callback, data){
    let volunteering = new sqlite3.Database('./model/volunteering.sqlite3');

    let query = "SELECT * FROM User WHERE name = ?";
    volunteering.all(query, data, (err, rows) => {
        if (rows.length != 0){
            if (err) {
                callback(err, null);
            } else {
                callback(null, rows);
            };
            volunteering.close()
        } else {
            callback('Неверные данные', null)
        }
    })
}

function getInfoUser(callback, data){
    let volunteering = new sqlite3.Database('./model/volunteering.sqlite3');

    let query = "SELECT * FROM User WHERE id = ?";
    volunteering.all(query, data, (err, rows) => {
        if (rows.length != 0){
            if (err) {
                callback(err, null);
            } else {
                callback(null, rows);
            };
            volunteering.close()
        } else {
            callback('Неверные данные', null)
        }
    })
}



module.exports = {
    changePasswordUser,
    changePasswordCompany,
    setRegistrationUser,
    setRegistrationCompany,
    setInfoActivity,
    checkinLoginData,
    getInfoActivity,
    getInfoActivityForHome,
    getInfoActivityForSearch,
    setImageUser,
    setImageCompany,
    getImageCompany,
    getImageUser,
    getInfoOneActivityForHome,
    signUpToActivity,
    getActivityUser,
    changeUsernameUser,
    getInfoUser,
    checkUsernameUser
};

