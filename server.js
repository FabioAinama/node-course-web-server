const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

// Utilisation des partials/layouts
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// Middleware
app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + ' \n', (err) => {
        if(err){
            console.log(err)
        }
    });
    next();
});

// Middleware de maintenance
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

// Rendre un partie du site/répertoire accessible de manière statique
app.use(express.static(__dirname + '/public'));

// Fonction pour avoir l'année actuelle
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

// Fonction qui permet de capitalize
hbs.registerHelper('screamIt', (text) => {
   return text.toUpperCase();
});

//Routes
app.get('/', (req, res) => {
    //res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Bienvenue :)'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Request failed'
    })
});
//Fin Routes

// Lancement du serveur sur le port 8080
app.listen(8080, () => {
    console.log('Serveur Lancé sur le port 8080.')
});