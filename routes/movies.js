const express = require('express');
const { Movie, validate } = require('../models/movie');
const { Genre } = require('../models/genre');
const auth = require('../middleware/auth');
const router = express.Router();


router.use(express.json());

router.get("/", async (req, res) => {
    const allMovies = await Movie.find().sort({ title: 1 });
    res.send(allMovies);
    console.log("Movie list has been sent!");
});

router.post("/", auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }

    const embeddedGenre = await Genre.findById(req.body.genreId);
    if (!embeddedGenre) return res.status(400).send('Invalid Genre ID');

    const newMovie = new Movie({
        title: req.body.title,
        genre: {
            _id: embeddedGenre._id,
            name: embeddedGenre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    await newMovie.save();
    console.log("Succesfully Created!");
    res.send(newMovie);
});


router.delete("/:id", async (req, res) => {

    const newMovie = await Movie.findByIdAndRemove(req.params.id);
    if (!newMovie) {
        res.status(400).send("Movie with given ID was not found.")
    }

    console.log("Succesfully Deleted!");
    res.send(newMovie);
});

router.get("/:id", async (req, res) => {
    const newMovie = await Movie.findById(req.params.id);
    if (!newMovie) {
        res.status(400).send("Movie with given ID was not found.")
    }

    console.log("Succesfully Sent!");
    res.send(newMovie);
});


module.exports = router;