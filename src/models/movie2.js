const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');

const movieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: Number,
    vote_count: Number,
    video: Boolean,
    vote_average: Number,
    title: String,
    popularity: Number,
    poster_path: String,
    original_language: String,
    original_title: String,
    backdrop_path: String,
    adult: Boolean,
    overview: String,
    release_date: Date
});
movieSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Movie', movieSchema);