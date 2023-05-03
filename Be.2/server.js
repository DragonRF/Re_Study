const express = require('express')
const app = express()

app.set('view engine','ejs')
app.set('views','./src/views')

app.get('/admin/login',showFormLogin)
app.get('/admin/home',showHomePage)
app.get('/admin/about',showAboutPage)

app.listen(3000,'localhost',() =>{
    console.log('Server is listen on port 3000')
})

function showFormLogin(req,res){
    res.render('login')
}

function showHomePage(req,res){
    res.render('home')
}

function showAboutPage(req,res){
    res.render('about')
}