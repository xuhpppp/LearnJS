import connection from '../configs/connectDB';

let getHomePage = (req, res) => {
    let data = [];

    // simple query
    connection.query(
        'SELECT * FROM `users`',
        function(err, results, fields) {

            data = results;
            console.log(data.length);
        }
    );

    
    
    return res.render('index.ejs', {dataUser: JSON.stringify(data)});
}

module.exports = {
    getHomePage
}