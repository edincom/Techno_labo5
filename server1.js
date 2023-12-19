var mysql = require("mysql")
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'tache',
});
connection.connect(function(error) {if (error) console.log(error);});


let express = require('express');
let app =express();   // instancier le serveur
app.use(express.urlencoded({extended:false}));

app.listen(3000, function(){
    console.log("Server is running on port 3000")
});


app.get('/', (request, response) => {
    connection.query("SELECT * from new_table;", function(error, result){
        if(error) console.log(error);
        const tacheValues = result.map(item => item.tache)
        console.log(tacheValues)
        const idValues = result.map(item => item.idnew_table)
        console.log(idValues)
        response.render('home1.ejs', {taches:tacheValues, ids:idValues})
    })
})

app.get('/add', (request, response) => {
    response.render('tacheAdd.ejs')
})

app.post('/', (request,response) =>{
    let tachex = {"tache":request.body.tache}
    connection.query("INSERT INTO new_table SET ? ", tachex, function(error, result){
        if(error) console.log(error);
        response.redirect('/');
    })
})

app.get('/update/:i', (request, response) => {
    let i = request.params.i;
    connection.query("select * FROM new_table WHERE idnew_table = ?;", i, function(error, result) {
        if (error) {
            console.error(error);
            response.status(500).send("Internal Server Error");
            return;
        }

        if (result.length === 0) {
            console.log(`No data found for idnew_table: ${i}`);
            response.status(404).send("Not Found");
            return;
        }

        response.render('tacheUpdate.ejs', { "idnew_table": result[0].idnew_table, "tache": result[0].tache});
    });
});

app.post('/update', (request,response) => {
    let i = request.body.idnew_table;
    let tachex = {"tache": request.body.tache};
    connection.query("UPDATE new_table SET tache = ? WHERE idnew_table = ?",[tachex.tache,i], function(error,result) {
        if(error) console.log(error)
        response.redirect('/')
    })
})


app.get('/delete/:i', (request, response) => {
    let i = request.params.i;
    console.log(i);
    connection.query("DELETE FROM new_table WHERE idnew_table = ?;", i, function(error, result) {
        if (error) console.log(error);
        response.redirect('/');
    })
})


app.use(express.static('public'));         // nous donne accès au fichier.css, ou plus précisément tout le dossier public

