let databaseLouis = './users-profile/louis/films.json';

let databaseOnat = './users-profile/onat/films.json';

const timelineDiv = document.querySelector('.timeline')
// const listDiv = document.querySelector('.list')


// questions de nommage : 
// kebab-case, bof.. camelCase c'est mieux sinon faut key['value'] au lieu de key.value;
// 'real-name' trop ambigu => 'directorName';
// 'name' => 'title';
class FilmCard {
    constructor(filmData) {



        this.nameElement = () => {
            let filmName = document.createElement('h3');
            filmName.classList.add('film-name-h3');
            filmName.innerText = filmData.name;
            return filmName;
        }
        this.releaseDateElement = () => {
            let filmReleaseDate = document.createElement('p');
            filmReleaseDate.classList.add('release-date-p');
            filmReleaseDate.innerText = filmData['release-date-p'];
            return filmReleaseDate;
        }
        this.realNameElement = () => {
            let filmRealName = document.createElement('p');
            filmRealName.classList.add('real-name-p');
            filmRealName.innerText = filmData['real-name']
            return filmRealName;
        }
        this.imgElement = () => {
            let filmImg = document.createElement('div');
            filmImg.classList.add('film-poster-div');
            filmImg.setAttribute('style', `background: url(${filmData.img})`)
            return filmImg;
        }
        this.noteElement = () => {
            let filmNote = document.createElement('p');
            filmNote.classList.add('film-note-p');
            return filmNote;
        }
        this.addDateElement = () => {
            let filmAddDate = document.createElement('p');
            filmAddDate.classList.add('film-AddDate-p');
            return filmAddDate;
        }
        this.filmCard = () => {
            document.createElement('div');
            this.filmCard.id = filmData.name;
            this.filmCard.classList.add('film-card-div')
            this.filmCard.appendChild(this.nameElement)
            this.filmCard.appendChild(this.releaseDateElement)
            this.filmCard.appendChild(this.realNameElement)
            this.filmCard.appendChild(this.imgElement)
            this.filmCard.appendChild(this.noteElement)
            this.filmCard.appendChild(this.addDateElement)
        }
    }

    appendElement() {
        timelineDiv.appendChild(this.filmCard);

    }
}

async function getData(loggedUser) {
    let url = () => {
        if (loggedUser == 'Louis') {
            return databaseLouis;
        } else if (loggedUser == 'Onat') {
            return databaseOnat;
        }
    }
    let films = fetch(url)
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
async function displayData(films) {
    films.forEach(film => {
        let filmComponent = new FilmCard(film);
        filmComponent.appendElement();
    });
}

async function loadTimeline() {
    let films = await getData('Louis');
    console.log(films)
    displayData(films);
}

loadTimeline();

