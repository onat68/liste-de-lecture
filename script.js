// #region Global Vars //
const xhr = new XMLHttpRequest();

// const loggedUser = prompt('enter username (no caps)')
const loggedUser = 'onat'

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
        this.overviewElement.innerText = filmData['overview']

        this.imgElement = document.createElement('div');
        this.imgElement.classList.add('film-poster-div');
        this.imgElement.setAttribute('style', `background: url(https://image.tmdb.org/t/p/w92/${filmData['poster_path']})`)

        this.cardElement = document.createElement('div');
        this.cardElement.classList.add('result-card')
        this.cardElement.id = filmData._id; // changé de original_title à id pour permettre la suppression de la DB

        this.selectButton = document.createElement('button')
        this.selectButton.classList.add('select-button')
        this.selectButton.innerText = 'OK'


        // !!! probablement à virer ///
        this.data = {
            title: filmData['original_title'],
            releaseDate: filmData['release_date'],
            img: filmData['poster_path'],
            note: filmData.overview,
            date : new Date()
        }

        // "that" est toujours = Card 
        let that = this;

        this.selectButton.onclick = function () {
            that.resultToDataBase();
            that.resultToTimeline();

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

    resultToDataBase() {
        xhr.open("POST", "http://localhost:3000/api/films");
        xhr.setRequestHeader("Content-Type", "application/json");
        const body = JSON.stringify(this.data);
        xhr.onload = () => {
            if (xhr.readyState == 4 && xhr.status == 201) {
                console.log(JSON.parse(xhr.responseText));
            } else {
                console.log(`Error: ${xhr.status}`);
            }
        };
        xhr.send(body);
    }
}

// #endregion //

// #region Loading Sequence //

/// !!! gros chantier ///

// afficher la liste de lecture en ajoutant les encarts de chaque film
function displayData(data, target, fromDB) {
    data.films.forEach(film => {
        if(fromDB){
            film.original_title = film.title
            film.release_date = film.releaseDate
            film.overview = film.note
            film.poster_path = film.img
        }
        let filmComponent = new Card(film, target);
        filmComponent.appendElement();
        if(fromDB){
            filmComponent.selectButton.remove()
        }
    });
}

// séquence de chargement en ouverture de la page (et peux être plus tard pour passer d'une page/vue à une autre ?)
function loadTimeline() {
    xhr.open("GET", `http://localhost:3000/api/films`);
    xhr.send();
    xhr.responseType = "json";
    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // console.log(films)
            const data = xhr.response;
            displayData(data, timelineDiv, true)
        } else {
            console.log(`Error: ${xhr.status}`);
        }
    };
}

loadTimeline();

// #endregion

// #region Search & Add Items

function searchFilm() {

    let toSearch = addInputField.value

    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURI(toSearch)}`;
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
            // fonction d'affichage des résultats de recherche
            function displaySearchResults(films, target) {
                searchResultsDiv.innerHTML = "" 
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

addInputField.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        addButton.click();
    }
});


// enter dans le champs = clic sur le bouton d'envoi

// ---------------Requête delete film----------------

// function deleteId(type, id){ // type : films

//     xhr.open("DELETE", `http://localhost:3000/api/${type}/${id}`, true);
//     xhr.onload = function () {
//         var film = JSON.parse(xhr.responseText);
//         if (xhr.readyState == 4 && xhr.status == "200") {
//             console.table(film);
//         } else {
//             console.error(film);
//         }
//     }
//     xhr.send(null);
// }
// --------------------------------------------
