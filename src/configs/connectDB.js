import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'doanthephuc',
    database: 'nodejsbasic'
});

// // execute will internally call prepare and query
// connection.execute(
//     'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
//     ['Rick C-137', 53],
//     function(err, results, fields) {
//       console.log(results); // results contains rows returned by server
//       console.log(fields); // fields contains extra meta data about results, if available
  
//       // If you execute same statement again, it will be picked from a LRU cache
//       // which will save query preparation time and give better performance
//     }
// );

export default connection;