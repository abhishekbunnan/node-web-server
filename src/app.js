const express = require('express');
const port = process.env.PORT || 3000;
const path = require('path');
const app = express();
const hbs = require('hbs');

const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));
const views = path.join(__dirname, '../templates/views');
const partials = path.join(__dirname, '../templates/partials');
app.set('view engine', 'hbs');
app.set('views', views);
hbs.registerPartials(partials);

const geocode = require('./utiles/geocode');
const forCast = require('./utiles/forcast');

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'abhi',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help app',
        name: 'what help',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about app',
        name: 'what about',
    });
});

app.get('/help/*', (req, res) => {
    res.render('page-notFound', {
        title: '404',
        name: 'help page not found',
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'provide search'
        });
    }
    res.send({
        products1: []
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'provide address'
        });
    }
    geocode(req.query.address, (error, {lat, long} = {}) => {
        if (error){
            return res.send(error);
        }
        forCast(lat, long, (error, responce) => {
            if (error){
                return res.send(error);
            }
            console.log(responce);
            res.send({
                responce,
            });
        });
    });
    
});

app.get('*', (req, res) => {
    res.render('page-notFound', {
        title: '404',
        name: 'page not found',
    });
});


// app.get('', (req, res) => {
//     res.send('<h1>hello express</h1>');
// });

// app.get('/help', (req, res) => {
//     res.send({
//         'name': 'abhi',
//         'age': 27
//     });
// });

// app.get('/about', (req, res) => {
//     res.send('<h1>about page</h1>');
// });

// app.get('/weather', (req, res) => {
//     res.send({
//         'temp': 27,
//         'loc': 'bng'
//     });
// });

app.listen(port, () => {
    console.log('server is up on port' + port);
});