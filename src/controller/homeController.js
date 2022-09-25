import connection from '../configs/connectDB';

let getHomePage = (req, res) => {
    let data = [];

    let getDB = new Promise(function(resolve, reject) {
        // simple query
        connection.query(
            'SELECT * FROM `users`',
            function(err, results, fields) {
                resolve(results);
            }
        );
    });

    const renderHomePage = async () => {
        let results = await getDB;

        return res.render('index.ejs', {dataUser: JSON.stringify(results)});
    }

    renderHomePage();
}

module.exports = {
    getHomePage
}