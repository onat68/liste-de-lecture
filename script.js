

const timelineDiv = document.querySelector('.timeline')
// const listDiv = document.querySelector('.list')


// questions de nommage : 
// 'real-name' trop ambigu => 'directorName';
// 'name' => 'title';
class FilmCard {
    constructor(filmData) {

        let filmName = document.createElement('h3');
        filmName.classList.add('film-name-h3');
        filmName.innerText = filmData.name;
        this.nameElement = filmName;


        let filmReleaseDate = document.createElement('p');
        filmReleaseDate.classList.add('release-date-p');
        filmReleaseDate.innerText = filmData.releaseDate;

        this.releaseDateElement = filmReleaseDate


        let filmRealName = document.createElement('p');
        filmRealName.classList.add('real-name-p');
        filmRealName.innerText = filmData.realName
        this.realNameElement = filmRealName

        let filmImg = document.createElement('div');
        filmImg.classList.add('film-poster-div');
        filmImg.setAttribute('style', `background: url(${filmData.img})`)

        this.imgElement = filmImg

        let filmNote = document.createElement('p');
        filmNote.classList.add('film-note-p');
        filmNote.innerText = filmData.note
        this.noteElement = filmNote

        let filmAddDate = document.createElement('p');
        filmAddDate.classList.add('film-AddDate-p');
        filmAddDate.innerText = filmData.date
        this.addDateElement = filmAddDate;


        let filmDiv = document.createElement('div');
        filmDiv.id = filmData.name;
        filmDiv.classList.add('film-div')
        this.filmCardElement = filmDiv
    }

    appendElement() {
        this.filmCardElement.appendChild(this.nameElement);
        this.filmCardElement.appendChild(this.releaseDateElement);
        this.filmCardElement.appendChild(this.realNameElement)
        this.filmCardElement.appendChild(this.imgElement)
        this.filmCardElement.appendChild(this.noteElement)
        this.filmCardElement.appendChild(this.addDateElement)
        timelineDiv.appendChild(this.filmCardElement);
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

