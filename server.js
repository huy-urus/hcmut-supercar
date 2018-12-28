var express = require('express');
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended:false});

var path = require('path');
var app = express();

var nodemailer = require('nodemailer');
var hdb = require('nodemailer-express-handlebars')

let poolConfig = 'smtps://web.nodejs.py@gmail.com:khongcogi1@smtp.gmail.com/?pool=true';

var transporter = nodemailer.createTransport(poolConfig);

app.listen(process.env.PORT || 8080);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.render('home');
})

app.get('/lamborghini', function(req, res){
    res.render('lamborghini');
})

app.get('/bugatti', function(req, res){
    res.render('bugatti');
})

app.get('/wmotors', function(req, res){
    res.render('wmotors');
})

app.get('/contact', function(req, res){
    res.render('contact');
})

app.post('/contact', urlencodedParser, function(req, res){
    var mailOptions = {
        from: 'admin_Supercar',
        to: 'ngochuy.78py@gmail.com', //'61303805@hcmut.edu.vn',
        subject: 'Comment in Supercar',
        text: req.body.name + '\n' + req.body.mail + '\n' + req.body.comments
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        }
      });
      res.redirect('/');
})