const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  releaseDate: { type: String, required: false },
  authorName: { type: String, required: false },
  note: { type: String, required: false },
  img: { type: String, required: false },
  date: { type: String, required: false },
  type: { type: String, required: true },
  externalId: { type: String, required: false }
});

const Album = mongoose.model("Album", albumSchema);

module.exports = Album