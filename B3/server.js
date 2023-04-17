const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer();

app.set('view engine','ejs');
app.set('views','./src/views')

app.get('/', (req, res) => {
    res.render("login.ejs");
});

app.post('/user/login', upload.none(), (req, res) => {
    if (req.body.username === 'long' && req.body.password === '123456') {

        res.render("success");
    } else {
        res.render("error");
    }
});

app.listen(3000,() =>{
    console.log('App is listening on port 3000')
})