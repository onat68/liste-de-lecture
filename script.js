

const timelineDiv = document.querySelector('.timeline')
// const listDiv = document.querySelector('.list')


// questions de nommage : 
// 'real-name' trop ambigu => 'directorName';
// 'name' => 'title';
class FilmCard {
    constructor(filmData) {

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
        timelineDiv.appendChild(this.cardElement);
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
async function displayData(films) {
    films.films.forEach(film => {
        let filmComponent = new FilmCard(film);
        filmComponent.appendElement();
    });
}

async function loadTimeline() {
    let films = await getData('onat');
    console.log(films)
    displayData(films);
}

loadTimeline();

