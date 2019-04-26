const sqlite3 = require('sqlite3');

class AppDAO {
  constructor(dbFilePath = 'database.sqlite3') {
    this.db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) {
        console.log('Could not connect to database', err);
        return err;
      }

      console.log('Connected to database');
    })
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err, data) {
        if (err) {
          console.log('Error running sql', sql);
          console.log(err);
          reject(err);
        }

        resolve({ id: this.lastID });
      });
    });
  }

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, result) => {
        if (err) {
          console.log('Error running sql:', sql);
          console.log(err);
          reject(err);
        }

        resolve(result);
      });
    });
  }

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          console.log('Error, running, sql:', sql)
          console.log(err);
          reject(err);
        }

        resolve(rows);
      });
    });
  }
}

module.exports = AppDAO
