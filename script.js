// #region Global Vars //

const loggedUser = prompt('enter username (no caps)')

const timelineDiv = document.querySelector('.timeline')
// const listDiv = document.querySelector('.list')
const searchResultsDiv = document.querySelector('.search-results')

const srWrapper = document.querySelector('.sr-wrapper')

const cancelButton = document.querySelector('.cancel-button');

const addInputField = document.getElementById('add-input-field');

const addButton = document.getElementById('add-button')


cancelButton.onclick = function () {
    srWrapper.classList.toggle('sr-anim-in', false)
    srWrapper.classList.toggle('sr-anim-out', true)
    setTimeout(function () {
        srWrapper.classList.toggle('sr-inactive', true)
        srWrapper.classList.toggle('sr-active', false)
        srWrapper.classList.toggle('sr-anim-out', false)

    }, 1000
    )
}

// #endregion //

// #region classes //
class Card {
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


        // "that" est toujours 
        let that = this;

        this.selectButton.onclick = function () {
            that.resultToTimeline()
        }
    }

    // insertion des résultats de recherche dans le div
    appendElement() {
        this.textWrapper.appendChild(this.nameElement);
        this.textWrapper.appendChild(this.releaseDateElement);
        this.textWrapper.appendChild(this.overviewElement)

        this.cardElement.appendChild(this.imgElement)
        this.cardElement.appendChild(this.textWrapper)
        this.cardElement.appendChild(this.selectButton)

        this.target.appendChild(this.cardElement);
    }

    // ajout du choix user dans la timeline, disparition animée de la vue "search results" et plus tard POST vers DB
    resultToTimeline() {
        // gestion des animations CSS avec un switch de classe
        srWrapper.classList.toggle('sr-anim-in', false)
        srWrapper.classList.toggle('sr-anim-out', true)
        this.selectButton.remove()
        this.cardElement.remove()
        timelineDiv.appendChild(this.cardElement);

        // faire défiler la timeline sur le dernier élement ajouté
        this.cardElement.scrollIntoView();
        setTimeout(function () {
            // idem pour la gestion de display: none;
            srWrapper.classList.toggle('sr-inactive', true)
            srWrapper.classList.toggle('sr-active', false)
            srWrapper.classList.toggle('sr-anim-out', false)

        }, 1000
        )
    }
}

// #endregion //

// #region Loading Sequence //

// afficher la liste de lecture en ajoutant les encarts de chaque film
function displayData(data, target) {
    data.films.forEach(film => {
        let filmComponent = new Card(film, target);
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

// #endregion

// #region Search & Add Items

function searchFilm() {

    let toSearch = addInputField.value

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
            // fonction d'affichage des résultats de recherche
            function displaySearchResults(films, target) {
                films.results.forEach(film => {
                    let filmComponent = new Card(film, target);
                    filmComponent.appendElement();
                });
            }
            displaySearchResults(data, searchResultsDiv)
            srWrapper.classList.toggle('sr-anim-in', true)
            srWrapper.classList.toggle('sr-inactive', false)
            srWrapper.classList.toggle('sr-active', true)
        })
        .catch(err => console.error('error:' + err));
}

addButton.addEventListener('click', () => {
    searchFilm()
})

// enter dans le champs = clic sur le bouton d'envoi
addInputField.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        addButton.click();
    }
});
