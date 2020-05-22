const express = require('express');
const { Movie, validate } = require('../models/movie');
const { Genre } = require('../models/genre');
const router = express.Router();


router.use(express.json());

router.get("/", async (req, res) => {
    const allMovies = await Movie.find().sort({ title: 1 });
    res.send(allMovies);
    console.log("Movie list has been sent!");
});

router.post("/", async (req, res) => {
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

    const result = await newMovie.save();
    console.log("Succesfully Created!");
    res.send(result);
});

router.put("/:id", async (req, res) => {
    let newMovie = await Movie.findById(req.params.id);

    if (!newMovie) {
        res.status(400).send("Movie with given ID was not found.")
    }
    const movieObj = new Movie({
        title: "1",
        genreId: "1",
        numberInStock: 0,
        dailyRentalRate: 0
    });

    if (req.body.title) {
        movieObj.title = req.body.title;
    }
    else {
        movieObj.title = newMovie.title;
    }

    if (req.body.genreId) {
        movieObj.genreId = req.body.genreId;
    }
    else {
        movieObj.genreId = String(newMovie.genre._id);
    }

    if (req.body.numberInStock) {
        movieObj.numberInStock = req.body.numberInStock;
    }
    else {
        movieObj.numberInStock = newMovie.numberInStock;
    }

    if (req.body.dailyRentalRate) {
        movieObj.dailyRentalRate = req.body.dailyRentalRate;
    }
    else {
        movieObj.dailyRentalRate = newMovie.dailyRentalRate;
    }


    movieObj.genre = await Genre.findById(req.body.genreId);
    movieObj._id = newMovie._id;
    newMovie = movieObj;

    const { error } = validate(newMovie);
    if (error) {
        res.status(400).send(error.details[0].message);
    }
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    newMovie = await newMovie.save();
    console.log("Succesfully Updated!");
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