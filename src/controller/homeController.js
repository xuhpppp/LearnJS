import connection from '../configs/connectDB';

let getHomePage = (req, res) => {
    let data = [];

    let getDBIntodata = new Promise(function(resolve) {
        // simple query
        connection.query(
            'SELECT * FROM `users`',
            function(err, results, fields) {

                data = results;
                resolve(data);
            }
        );
    });

    getDBIntodata.then(function(data) {
        return res.render('index.ejs', {dataUser: JSON.stringify(data)});
    });
}

module.exports = {
    getHomePage
}