
var express = require('express');
var app = express();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'game.c2a970tk0l08.ap-southeast-1.rds.amazonaws.com',
    user: 'ab12yz89',
    password: 'yz89ab12',
    database: 'Game'

});

connection.connect(function (err) {

    if (err) {
        console.log('Error Connecting', err.stack);
        return;
    }
    console.log('Connected as id', connection.threadId);
});

app.get('/user/add', function (req, res) {
    var Username = req.query.Username;
    var Password = req.query.Password;
    var Score = req.query.Score;




    var ID = [[Username, Password,Score]];
    AddUserID(ID, function (err, result) {
        res.end(result);
    });

});
app.get('/user/id',function(req,res){

    ShowUserID(function(err,result){
        res.end(result);
    })
})

var server = app.listen(8081, function () {
    console.log('Server Running');

});

function AddUserID(ID, callback) {
    var sql = 'INSERT INTO Game1(Username,Password,Score) values ?';


    connection.query(sql, [ID], function (err) {
        var res = '[{"success" : "true"}]';
        if (err) {

            res = '{["success" : "false"]}';
            throw err;
        }

        callback(null, res);

    });
}
    function ShowUserID(callback) {
        var sql = 'SELECT * FROM Game1 ORDER BY Score DESC';


        connection.query(sql, function (err,rows,fields) {
            if (err) throw err;

        json = JSON.stringify(rows);

        callback(null,json);
    });
    }