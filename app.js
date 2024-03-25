const http = require('http');
const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/login', (req, res, next) => {
    res.send('<form onsubmit=\'localStorage.setItem("username",document.getElementById("username").value)\' action="/login" method="POST"><input id="username" type="text" name="username"><button type="submit">submit</button></form>');
});


app.post("/login", (req, res, next) => {
    res.redirect("/showmsg");
});

app.get('/showmsg', (req, res, next) => {
    fs.readFile('message.txt', (err, data)=>{
        if(err){
            console.log(err)
            data = 'No chat exists'
        }
        res.send(`<p>${data}</p><form action="/showmsg" onsubmit=\'document.getElementById("username").value=localStorage.getItem("username")\' method="POST"><input id="msg" name="msg" type="text"><input name="username" type="hidden" id="username"><button type="submit">Submit</button></form>`); 
    })
    
});


app.post('/showmsg', (req, res, next) => {
    console.log(req.body);
    var result = req.body.username + ':'+ req.body.msg + ' ';
    console.log(result);
    fs.writeFile('message.txt', result,{flag: 'a'} ,(err) => {
        if (err) {
            console.log(err);
            res.send('<h1>Error saving the file</h1>');
        } else {
            console.log('Saved data');
            res.redirect('/showmsg');
        }
    });
});

app.listen(3000);
