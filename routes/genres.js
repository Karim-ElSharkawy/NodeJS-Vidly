const express = require('express');
const { Genre, validate } = require('../models/genre');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();


router.use(express.json());

router.get("/", async (req, res) => {
    const allGenres = await Genre.find().sort({ name: 1 });
    res.send(allGenres);
    console.log("Genre list has been sent!");
});

router.post("/", auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }
    const newGenre = new Genre({
        name: req.body.name
    });

    const result = await newGenre.save();
    console.log("Succesfully Created!");
    res.send(result);
});

router.put("/:id", [auth, admin], async (req, res) => {
    let newGenre = await Genre.findById(req.params.id);

    if (!newGenre) {
        res.status(400).send("Genre with given ID was not found.")
    }

    const { error } = validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }
    newGenre.name = req.body.name;

    newGenre = await newGenre.save();
    console.log("Succesfully Updated!");
    res.send(newGenre);
});

router.delete("/:id", [auth, admin], async (req, res) => {

    const newGenre = await Genre.findByIdAndRemove(req.params.id);
    if (!newGenre) {
        res.status(400).send("Genre with given ID was not found.")
    }

    console.log("Succesfully Deleted!");
    res.send(newGenre);
});

router.get("/:id", async (req, res) => {
    const newGenre = await Genre.findById(req.params.id);
    if (!newGenre) {
        res.status(400).send("Genre with given ID was not found.")
    }

    console.log("Succesfully Sent!");
    res.send(newGenre);
});


module.exports = router;