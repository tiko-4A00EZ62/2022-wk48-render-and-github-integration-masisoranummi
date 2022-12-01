const connection = require("../db/connection");

const electricity = {
    findAll: () =>
        new Promise((resolve, reject) => {
            connection.query("SELECT * FROM electricity;", (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        }),
    findById: (id) =>
        new Promise((resolve, reject) => {
            const selectQuery = "SELECT * FROM electricity WHERE id=?;";
            connection.query(selectQuery, id, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        }),
    save: (invoice) =>
        new Promise((resolve, reject) => {
            connection.query(
                "INSERT INTO electricity SET ?",
                invoice,
                (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                }
            );
        }),
    deleteById: (id) =>
        new Promise((resolve, reject) => {
            const selectQuery = "DELETE FROM electricity WHERE id=?;";
            connection.query(selectQuery, id, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        }),
    updateById: (invoice) =>
        new Promise((resolve, reject) => {
            const updateQuery =
                "UPDATE electricity SET month = ?, used = ?, cost = ? WHERE id = ?;";
            connection.query(
                updateQuery,
                [invoice.month, invoice.used, invoice.cost, invoice.id],
                (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                }
            );
        }),
};
module.exports = electricity;
