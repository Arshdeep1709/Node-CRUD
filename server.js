const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./database');

const app = express();
const port = 3700;

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html")
})

app.post("/submit", function(req,res){
     console.log(req.body)
     let name = req.body.name
     let email = req.body.email
     let contact = req.body.contact

     connection.connect(function(err){
        if(err) throw err
        let sql = "INSERT INTO form(name, email, contact) VALUES(?,?,?)"; 
        connection.query(sql,[name, email,contact], function(err, result){
            if(err) throw err
            res.send("Successfully submitted to database !")
        })
    })
    
})


app.listen(port, ()=> console.log("Connected"))
