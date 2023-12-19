let express = require('express');

let app =express();   // instancier le serveur

app.listen(3000, function(){
    console.log("Server is running on port 3000")
});


app.get('/indes', (req, res) =>{
    // response.send("Bonjour " + request.query.name);
    console.log(req.body.q);
    res.send("Okay"); 
});


bodyParser = require('body-parser')

app.use(express.static('public')); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));