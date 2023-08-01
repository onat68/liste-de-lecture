const fetch = require('node-fetch');

toSearch = "la soupe aux choux"

const url = `https://api.themoviedb.org/3/search/movie?query=${escape(toSearch)}`;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5M2ViMWFhM2EzNDZkNTg5MWFkZDFjMWQ4MzM2ZGQ2NyIsInN1YiI6IjY0YzkwNDhiODlmNzQ5MDBhZTBiZmI5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WY3acLejoDB0otuZHhtAFelDy8ONHz9zJs_3pr1DHSk'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => {})
  .catch(err => console.error('error:' + err));