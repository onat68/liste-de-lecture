

const timelineDiv = document.querySelector('.timeline')
// const listDiv = document.querySelector('.list')
const searchResultsDiv = document.querySelector('.search-results')

// questions de nommage : 
// 'real-name' trop ambigu => 'directorName';
// 'name' => 'title';
class FilmCard {
    constructor(filmData, target) {
        this.target = target;

        this.nameElement = document.createElement('h3');
        this.nameElement.classList.add('film-name-h3');
        this.nameElement.innerText = filmData.name;

        this.releaseDateElement = document.createElement('p');
        this.releaseDateElement.classList.add('release-date-p');
        this.releaseDateElement.innerText = filmData.releaseDate;

        this.realNameElement = document.createElement('p');
        this.realNameElement.classList.add('real-name-p');
        this.realNameElement.innerText = filmData.realName

        this.imgElement = document.createElement('div');
        this.imgElement.classList.add('film-poster-div');
        this.imgElement.setAttribute('style', `background: url(${filmData.img})`)

        this.noteElement = document.createElement('p');
        this.noteElement.classList.add('film-note-p');
        this.noteElement.innerText = filmData.note


        this.dateElement = document.createElement('p');
        this.dateElement.classList.add('film-date-p');
        this.dateElement.innerText = filmData.date

        this.cardElement = document.createElement('div');
        this.cardElement.classList.add('film-div')
        this.cardElement.id = filmData.name;
    }

    appendElement() {
        this.cardElement.appendChild(this.nameElement);
        this.cardElement.appendChild(this.releaseDateElement);
        this.cardElement.appendChild(this.realNameElement)
        this.cardElement.appendChild(this.imgElement)
        this.cardElement.appendChild(this.noteElement)
        this.cardElement.appendChild(this.dateElement)
        this.target.appendChild(this.cardElement);
    }
}

class SearchResultCard {
    constructor(filmData, target) {
        this.target = target;

        this.nameElement = document.createElement('h3');
        this.nameElement.classList.add('film-name-h3');
        this.nameElement.innerText = filmData['original_title'];

        this.releaseDateElement = document.createElement('p');
        this.releaseDateElement.classList.add('release-date-p');
        this.releaseDateElement.innerText = filmData['release_date'];

        this.overviewElement = document.createElement('p');
        this.overviewElement.classList.add('overview-p');
        this.overviewElement.innerText = filmData.overview

        this.imgElement = document.createElement('div');
        this.imgElement.classList.add('film-poster-div');
        this.imgElement.setAttribute('style', `background: url(${filmData['poster-path']})`)

        this.cardElement = document.createElement('div');
        this.cardElement.classList.add('film-div')
        this.cardElement.id = filmData.name;
    }

    appendElement() {
        this.cardElement.appendChild(this.nameElement);
        this.cardElement.appendChild(this.releaseDateElement);
        this.cardElement.appendChild(this.imgElement)
        this.cardElement.appendChild(this.overviewElement)
        this.target.appendChild(this.cardElement);
    }
}

async function getData(loggedUser) {
    let films = fetch(`users-profile/${loggedUser}/films.json`)
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch(err => {
            throw err
        })
    return films
}

// il faut s'assurer que les données du JSON sont triées par date ou qq chose, soit en amont soit ici idk
async function displayData(films, target) {
    films.films.forEach(film => {
        let filmComponent = new FilmCard(film, target);
        filmComponent.appendElement();
    });
}

async function loadTimeline() {
    let films = await getData('onat');
    console.log(films)
    displayData(films, timelineDiv);
}

loadTimeline();

let submit = document.getElementById('add-button')
submit.addEventListener('click', async () => {
    console.log('click!')
    async function searchFilm() {

        let toSearch = "entretien avec un vampire"
        const url = `https://api.themoviedb.org/3/search/movie?query=${escape(toSearch)}`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5M2ViMWFhM2EzNDZkNTg5MWFkZDFjMWQ4MzM2ZGQ2NyIsInN1YiI6IjY0YzkwNDhiODlmNzQ5MDBhZTBiZmI5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WY3acLejoDB0otuZHhtAFelDy8ONHz9zJs_3pr1DHSk'
            }
        };

        let films = fetch(url, options)
            .then(res => res.json())
            .then(data => {
                return data
            })
            .catch(err => console.error('error:' + err));
        return films;
    }
    async function displaySearchResults(films, target) {
        films.results.forEach(film => {
            let filmComponent = new SearchResultCard(film, target);
            filmComponent.appendElement();
        });
    }
    let films = await searchFilm();
    console.log(films)
    displaySearchResults(films, searchResultsDiv);
})

