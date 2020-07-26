const express = require('express');
const app = express();

const moviesRouter= require('./routes/moviesRouter');
const actorsRouter = require('./routes/actorsRouter');
const genresRouter = require('./routes/genresRouter');

const session= require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const recordameMW = require ('./middlewares/recordameMW');

// Template Engine 
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
//post
app.use(express.urlencoded({ extended: false }));
//session y cookie//
app.use(session({secret:'secreto',resave: false,
saveUninitialized: true,}));
app.use(cookieParser()); 
//otrosMilddle//  
//app.use(recordameMW);

app.listen(3000, function(){
    console.log('Running on 3000');
});

app.use('/movies', moviesRouter);
app.use('/actors', actorsRouter);
app.use('/genres', genresRouter);




