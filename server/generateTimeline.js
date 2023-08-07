function generateTimeline(films) {
  let index = films.length;

  while (index != 0) {
    let randomIndex = Math.floor(Math.random() * index);
    index--;
    [films[index], films[randomIndex]] = [films[randomIndex], films[index]];
  }
  console.log(films);
  return films;
}

// export {generateTimeline}

module.exports = generateTimeline;
