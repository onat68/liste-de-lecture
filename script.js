// #region Global Vars //
const xhr = new XMLHttpRequest();

// const loggedUser = prompt('enter username (no caps)')
const loggedUser = "onat";

const timelineDiv = document.querySelector(".timeline");
// const listDiv = document.querySelector('.list')
const searchResultsDiv = document.querySelector(".search-results");

const srWrapper = document.querySelector(".sr-wrapper");

const cancelButton = document.querySelector(".cancel-button");

const addInputField = document.getElementById("add-input-field");

const addButton = document.getElementById("add-button");

cancelButton.onclick = function () {
  srWrapper.classList.toggle("sr-anim-in", false);
  srWrapper.classList.toggle("sr-anim-out", true);
  setTimeout(function () {
    srWrapper.classList.toggle("sr-inactive", true);
    srWrapper.classList.toggle("sr-active", false);
    srWrapper.classList.toggle("sr-anim-out", false);
  }, 1000);
};

// #endregion //

// #region classes //
class Card {
  constructor(title, releaseDate, note, img, target) {
    this.target = target;

    this.textWrapper = document.createElement("div");
    this.textWrapper.classList.add("text-wrapper");

    this.nameElement = document.createElement("h3");
    this.nameElement.classList.add("film-name-h3");
    this.nameElement.innerText = title

    this.releaseDateElement = document.createElement("p");
    this.releaseDateElement.classList.add("release-date-p");
    this.releaseDateElement.innerText = releaseDate

    this.overviewElement = document.createElement("p");
    this.overviewElement.classList.add("overview-p");
    this.overviewElement.innerText = note

    this.imgElement = document.createElement("div");
    this.imgElement.classList.add("film-poster-div");
    this.imgElement.url = img
    this.imgElement.setAttribute(
      "style",
      `background: url(${img})`
    );

    this.cardElement = document.createElement("div");
    this.cardElement.classList.add("result-card");
    // this.cardElement.id = filmData._id; // changé de original_title à id pour permettre la suppression de la DB

    this.selectButton = document.createElement("button");
    this.selectButton.classList.add("select-button");
    this.selectButton.innerText = "OK";

    // !!! probablement à virer ///
    this.data = {
      title: this.nameElement.innerText,
      releaseDate: this.releaseDateElement.innerText,
      img: this.imgElement.url,
      note: this.overviewElement.innerText,
      date: new Date(),
    };

    // "that" est toujours = Card
    let that = this;

    this.selectButton.onclick = function () {
      that.resultToDataBase();
      that.resultToTimeline();
    };
  }

  // insertion des résultats de recherche dans le div
  appendElement() {
    this.textWrapper.appendChild(this.nameElement);
    this.textWrapper.appendChild(this.releaseDateElement);
    this.textWrapper.appendChild(this.overviewElement);

    this.cardElement.appendChild(this.imgElement);
    this.cardElement.appendChild(this.textWrapper);
    this.cardElement.appendChild(this.selectButton);

    this.target.appendChild(this.cardElement);
  }

  // ajout du choix user dans la timeline, disparition animée de la vue "search results" et plus tard POST vers DB
  resultToTimeline() {
    // gestion des animations CSS avec un switch de classe
    srWrapper.classList.toggle("sr-anim-in", false);
    srWrapper.classList.toggle("sr-anim-out", true);
    this.selectButton.remove();
    this.cardElement.remove();
    timelineDiv.appendChild(this.cardElement);

    // faire défiler la timeline sur le dernier élement ajouté
    this.cardElement.scrollIntoView();
    setTimeout(function () {
      // idem pour la gestion de display: none;
      srWrapper.classList.toggle("sr-inactive", true);
      srWrapper.classList.toggle("sr-active", false);
      srWrapper.classList.toggle("sr-anim-out", false);
    }, 1000);
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


function displayData(data, target) {
  data.films.forEach((element) => {

    let timelineComponent = new Card(element.title, element.releaseDate, element.note, element.img, target);
    timelineComponent.appendElement();
    timelineComponent.selectButton.remove();
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
      displayData(data, timelineDiv);
    } else {
      console.log(`Error: ${xhr.status}`);
    }
  };
}

loadTimeline();

// #endregion

// #region Search & Add Items

function searchFilm() {
  let toSearch = addInputField.value;

  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURI(
    toSearch
  )}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5M2ViMWFhM2EzNDZkNTg5MWFkZDFjMWQ4MzM2ZGQ2NyIsInN1YiI6IjY0YzkwNDhiODlmNzQ5MDBhZTBiZmI5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WY3acLejoDB0otuZHhtAFelDy8ONHz9zJs_3pr1DHSk",
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {

      function displaySearchResultsFilms(films, target) {
        searchResultsDiv.innerHTML = "";
        films.results.forEach((film) => {
          title = film.original_title
          releaseDate = film.release_date
          note = film.overview
          img = `https://image.tmdb.org/t/p/w92/${film["poster_path"]}`
          let filmComponent = new Card(title, releaseDate, note, img, target);
          filmComponent.appendElement();
        });
      }
      displaySearchResultsFilms(data, searchResultsDiv);
      srWrapper.scrollTop = 0
      srWrapper.classList.toggle("sr-anim-in", true);
      srWrapper.classList.toggle("sr-inactive", false);
      srWrapper.classList.toggle("sr-active", true);
    })
    .catch((err) => console.error("error:" + err));
}

function searchBook() {
  let toSearch = addInputField.value;

  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURI(toSearch)}&key=AIzaSyATExARtYho9ib0B_uCuN_vmS7jbA7CoBg`;
  
  fetch(url)
    .then((res) => res.json())
    .then((data) => {

      function displaySearchResultsBooks(books, target) {
        searchResultsDiv.innerHTML = "";
        books.items.forEach((book) => {
          title = book.volumeInfo.title
          releaseDate = book.volumeInfo.publishedDate
          note = book.volumeInfo.description
          book.volumeInfo.imageLinks != undefined ? img = book.volumeInfo.imageLinks.thumbnail : img = 'none'
          let bookComponent = new Card(title, releaseDate, note, img, target);
          bookComponent.appendElement();
        });
      }
      displaySearchResultsBooks(data, searchResultsDiv);
      srWrapper.classList.toggle("sr-anim-in", true);
      srWrapper.classList.toggle("sr-inactive", false);
      srWrapper.classList.toggle("sr-active", true);
    })
    .catch((err) => console.error('error:'+ err));
}

addButton.addEventListener("click", () => {
  searchBook(); 
});

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



