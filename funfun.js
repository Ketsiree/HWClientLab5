var express = require('express')
   app = express()
   bodyParser = require('body-parser');
   var session = require('express-session')

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.static(__dirname + '/public'));

app.set('views', './views')
app.set('view engine', 'ejs')

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 },
   resave : false, saveUninitialized: false }))
   // resave => Forces the session to be saved back to the session store, even if the session was never modified 
   // saveUninitialized => the cookie will not be set on a response with an uninitialized session

app.post('/admin', urlencodedParser, function(req, res){

    var result = parseInt(req.body.p);
    var result2 = req.body.m + " ";

    if(result == 240311){

        res.send(`<html><h1 style="align:center;">Hello: ${result2}</h1>
        <a href='/logout'>logout</a></body></html>`);
    }
    else{

        res.send(`<html><body><h1>Please Login first : </h1>
        
        <a href ='/'>Login</a>
        </body></html>`);
    }
});

app.get('/', function(req, res){
    res.send('./public/index.html')
 })
 

 app.get('/logout', (req,res) => {
    req.session.destroy((err) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
 });


 app.get('/admin', function(req, res){
    res.render('/admin')
 })
 
 
 app.listen(8000)

