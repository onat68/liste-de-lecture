const loggedUser = "onat"

const timelineDiv = document.querySelector('.timeline')
// const listDiv = document.querySelector('.list')
const searchResultsDiv = document.querySelector('.search-results')

// questions de nommage : 
// 'real-name' trop ambigu => 'directorName';
// 'name' => 'title';
class FilmCard {
    constructor(filmData, target) {
        // élément parent cible (on peut faire ça mieux ?)
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
    // ajouter le composant complet dans le HTML
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

        this.textWrapper = document.createElement('div')
        this.textWrapper.classList.add('text-wrapper');

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
        this.imgElement.setAttribute('style', `background: url(${filmData['poster_path']})`)

        this.cardElement = document.createElement('div');
        this.cardElement.classList.add('result-card')
        this.cardElement.id = filmData['original_title'];

        this.selectButton = document.createElement('button')
        this.selectButton.classList.add('select-button')
        this.selectButton.innerText = 'OK'
    }

    appendElement() {
        this.textWrapper.appendChild(this.nameElement);
        this.textWrapper.appendChild(this.releaseDateElement);
        this.textWrapper.appendChild(this.overviewElement)
        
        this.cardElement.appendChild(this.imgElement)
        this.cardElement.appendChild(this.textWrapper)
        this.cardElement.appendChild(this.selectButton)

        this.target.appendChild(this.cardElement);
    }
}

// afficher la liste de lecture en ajoutant les encarts de chaque film
function displayData(data, target) {
    data.films.forEach(film => {
        let filmComponent = new FilmCard(film, target);
        filmComponent.appendElement();
    });
}

// séquence de chargement en ouverture de la page (et peux être plus tard pour passer d'une page/vue à une autre ?)
function loadTimeline() {
    fetch(`users-profile/${loggedUser}/films.json`)
        .then(response => response.json())
        .then(data => {
            displayData(data, timelineDiv);
        })
        .catch(err => {
            throw err
        })
}

loadTimeline();

let submit = document.getElementById('add-button')
submit.addEventListener('click', () => {
    function searchFilm() {
        
        let toSearch = document.getElementById('add-input-field').value
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
            .then(data => {
                console.log("aaaa",data)
                displaySearchResults(data, searchResultsDiv)
            })
            .catch(err => console.error('error:' + err));
    }
    searchFilm()
    // fonction d'affichage des résultats de recherche
    function displaySearchResults(films, target) {
        films.results.forEach(film => {
            let filmComponent = new SearchResultCard(film, target);
            filmComponent.appendElement();
        });
    }

    let wrapper = document.querySelector('.search-results-wrapper') 
    wrapper.setAttribute('style', 'display: flex;animation: scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;')
    
})

