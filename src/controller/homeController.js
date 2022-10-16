import pool from '../configs/connectDB';
import multer from 'multer';
import path from 'path';

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

let getUploadFilePage = async (req, res) => {
    return res.render('uploadFile.ejs')
}

let handleUploadFile = async (req, res) => {
    if (req.fileValidationError) {

        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }

    // Display uploaded image for user validation
    res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    // });
}

module.exports = {
    getHomePage,
    getDetailPage,
    createNewUser,
    deleteUser,
    getEditPage,
    postUpdateUser,
    getUploadFilePage,
    handleUploadFile
}