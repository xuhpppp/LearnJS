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

let createNewUser = async (req, res) => {
    await pool.execute(
            'insert into `users`(firstName, lastName, email, address) values (?, ?, ?, ?)',
            [req.body.firstName, req.body.lastName, req.body.email, req.body.address]
    );

    return res.redirect('/');
}

let deleteUser = async (req, res) => {
    await pool.execute(
        'delete from `users` where id = (?)',
        [req.body.userId]
    );

    return res.redirect('/');
}

let getEditPage = async (req, res) => {
    let results = await new Promise(function(resolve, reject) {
        pool.execute(
            'SELECT * FROM `users` WHERE `id` = ?',
            [req.params.userId],
            function(err, results, fields) {
                resolve(results);
            });
    });

    return res.render('edituser.ejs', { dataUser: results[0] });
}

let postUpdateUser = async (req, res) => {
    await pool.execute(
        'update `users` set firstName = ?, lastName = ?, email = ?, address = ? where id = ?',
        [req.body.firstName, req.body.lastName, req.body.email, req.body.address, req.body.userId]
    );

    return res.redirect('/');
}

module.exports = {
    getHomePage,
    getDetailPage,
    createNewUser,
    deleteUser,
    getEditPage,
    postUpdateUser
}