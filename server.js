const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const connection = require('./database');

const app = express();
const port = 3700;

app.use(bodyParser.urlencoded({ extended: false }));


app.set('view engine', 'ejs') // here we will set our router to display data

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html")
})

app.post("/submit", function(req,res){
    //  console.log(req.body)
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
app.get("/fetch-data", (req,res)=>{

    connection.connect(function(err){
        if(err) throw err
        let sql = "select * from form";
        connection.query(sql,function(err, result){
            if(err) throw err
            // console.log(result)
            res.render(__dirname+'/fetch-data',{data:result})
            
        })
    })


}) // here we will be fetching our data by get method




app.get("/delete", (req,res)=>{

    connection.connect(function(err){
        if(err) throw err
        let sql = "delete from form where id=?";

        let id = req.query.id;
        connection.query(sql, [id], function(err, result){
            if(err) throw err
            res.redirect('/fetch-data')
            
        })
    })

})



app.listen(port, ()=> console.log("Connected"))
