var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 5000;
var nav = [{
    Link: '/',
    Text: 'Home'
}, {
    Link: '/Shop',
    Text: 'Shop'
}, {
    Link: '/',
    Text: 'Our Story'
}, {
    Link: '/',
    Text: 'Login / Register'
}, {
    Link: '/',
    Text: 'My Cart'
}];
var homeRouter = require('./src/routes/homeRoutes.js')(nav);
var shopRouter = require('./src/routes/bookRoutes.js')(nav);
var adminRouter = require('./src/routes/adminRoutes.js')(nav);
app.use(express.static('public'));
// app.use(express.static('src/views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.set('views', './src/views');

// you only need the two things below if you are using handlebars
// var handlebars = require('express-handlebars')
// app.engine('.hbs', handlebars({
//     extname: '.hbs'
// }));

// change .hbs to jade, or ejs if you'd rather use jade or ejs and vice versa
app.set('view engine', 'ejs');
app.use('/', homeRouter);
app.use('/Shop', shopRouter);
app.use('/Admin', adminRouter);

app.get('/', function(req, res) {
    res.render('index', {
        title: 'hello from render',
        nav: [{
            Link: '/Books',
            Text: 'Books'
        }, {
            Link: '/Authors',
            Text: 'Authors'
        }]
    });
});
app.get('/books', function(req, res) {
    res.send('hello books');
});
app.listen(port, function(err) {
    console.log('running on port ' + port);
});