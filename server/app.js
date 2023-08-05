const express = require('express');
const mongoose = require('mongoose');
const Film = require('./models/film');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect('mongodb+srv://onatrigault:lestat@clusterlater.ekjrhqs.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json()); // ????

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.post('/api/films', (req, res, next) => {
    delete req.body._id;
    const film = new Film({
        ...req.body
    });
    film.save()
        .then(() => {
            res.status(201).json({ film })
        })
        .catch(error => res.status(400).json({ error }))

});

app.get('/api/films', (req, res, next) => {
    Film.find()
    .then(films => res.status(200).json({ films }))
    .catch(error => res.status(400).json({ error }))
})

module.exports = app;
