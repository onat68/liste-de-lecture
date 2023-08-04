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
    .then(film => {
        res.status(200).json({ film })
    })
    .catch(error => res.status(400).json({ error }))
})

// app.get('/api/films?toSearch', (req, res, next) => {
//     const url = `https://api.themoviedb.org/3/search/movie?query=${escape(toSearch)}`;
//     const options = {
//         method: 'GET',
//         headers: {
//             accept: 'application/json',
//             Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5M2ViMWFhM2EzNDZkNTg5MWFkZDFjMWQ4MzM2ZGQ2NyIsInN1YiI6IjY0YzkwNDhiODlmNzQ5MDBhZTBiZmI5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WY3acLejoDB0otuZHhtAFelDy8ONHz9zJs_3pr1DHSk'
//         }
//     };

//     fetch(url, options)
//         .then(res => res.json())
//         .then(data => {
//             console.log(data)
//             res.status(200).json( {data} )
    
//         })
//         .catch(err => console.error('error:' + err));
// })

const url = `https://api.themoviedb.org/3/search/movie?query=salut}`;
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5M2ViMWFhM2EzNDZkNTg5MWFkZDFjMWQ4MzM2ZGQ2NyIsInN1YiI6IjY0YzkwNDhiODlmNzQ5MDBhZTBiZmI5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WY3acLejoDB0otuZHhtAFelDy8ONHz9zJs_3pr1DHSk'
    }
};

fetch(url, options)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        res.status(200).json( {data} )

    })
    .catch(err => console.error('error:' + err));

module.exports = app;


// function searchFilm() {

//     let toSearch = addInputField.value

//     const url = `https://api.themoviedb.org/3/search/movie?query=${escape(toSearch)}`;
//     const options = {
//         method: 'GET',
//         headers: {
//             accept: 'application/json',
//             Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5M2ViMWFhM2EzNDZkNTg5MWFkZDFjMWQ4MzM2ZGQ2NyIsInN1YiI6IjY0YzkwNDhiODlmNzQ5MDBhZTBiZmI5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WY3acLejoDB0otuZHhtAFelDy8ONHz9zJs_3pr1DHSk'
//         }
//     };


//     fetch(url, options)
//         .then(res => res.json())
//         .then(data => {
//             // fonction d'affichage des résultats de recherche
    
//         })
//         .catch(err => console.error('error:' + err));
// }
