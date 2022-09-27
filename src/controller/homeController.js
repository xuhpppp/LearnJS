import pool from '../configs/connectDB';

let getHomePage = async (req, res) => {
    let results = await new Promise(function(resolve, reject) {
        // simple query
        pool.query(
            'SELECT * FROM `users`',
            function(err, results, fields) {
                resolve(results);
            }
        );
    });

    return res.render('index.ejs', {dataUser: results});
}

let getDetailPage = async (req, res) => {
    let results = await new Promise(function(resolve, reject) {
        pool.execute(
            'SELECT * FROM `users` WHERE `id` = ?',
            [req.params.userId],
            function(err, results, fields) {
                resolve(results);
            });
    });

    return res.send(results);
}

module.exports = {
    getHomePage, getDetailPage
}