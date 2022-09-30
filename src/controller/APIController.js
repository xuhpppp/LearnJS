import pool from '../configs/connectDB';

let getAllUsers = async (req, res) => {
    let results = await new Promise(function(resolve, reject) {
        // simple query
        pool.query(
            'SELECT * FROM `users`',
            function(err, results, fields) {
                resolve(results);
            }
        );
    });

    return res.status(200).json({
        message: 'oke',
        data: results
    });
}

let createNewUser = async (req, res) => {
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.address) {
        return res.status(200).json({
            message: 'missing params'
        });
    } else {
        await pool.execute(
            'insert into `users`(firstName, lastName, email, address) values (?, ?, ?, ?)',
            [req.body.firstName, req.body.lastName, req.body.email, req.body.address]
        );

        return res.status(200).json({
            message: 'oke'
        });
    }
}

let editUser = async (req, res) => {
    if (!req.body.userId || !req.body.firstName || !req.body.lastName || !req.body.email || !req.body.address) {
        return res.status(200).json({
            message: 'missing params'
        });
    } else {
        await pool.execute(
            'update `users` set firstName = ?, lastName = ?, email = ?, address = ? where id = ?',
            [req.body.firstName, req.body.lastName, req.body.email, req.body.address, req.body.userId]
        );

        return res.status(200).json({
            message: 'oke'
        });
    }
}

let deleteUser = async (req, res) => {
    await pool.execute(
        'delete from `users` where id = (?)',
        [req.params.userId]
    );

    return res.status(200).json({
        message: 'oke'
    });
}

module.exports = {
    getAllUsers, createNewUser, editUser, deleteUser
}