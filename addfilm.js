const fs = require("fs");
let user = "louis";

class Film {
  constructor(name, release, realisator, note, img) {
    this.name = name;
    this.releaseDate = release;
    this.realName = realisator;
    this.note = note;
    this.img = img;
    this.date = new Date();
  }
}

const addNewFilm = (name, release, realisator, note, img) => {
  let newFilm = new Film(name, release, realisator, note, img);

  fs.readFile(`users-profile/${user}/films.json`, function read(err, data) {
    if (err) {
      throw err;
    }
    let content = JSON.parse(data);
    content.films.push(newFilm);
    data = JSON.stringify(content);
    console.log(data);
    fs.writeFile(`users-profile/${user}/films.json`, data, (err) => {
      if (err) throw err;
    });
  });
};

addNewFilm(
  "Entretien avec un vampire",
  "1976",
  "Neil Jordan",
  "Lestat :(",
  "https://media.senscritique.com/media/000014089088/source_big/Entretien_avec_un_vampire.jpg"
);
