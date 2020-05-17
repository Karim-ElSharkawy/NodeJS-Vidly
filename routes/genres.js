const express = require('express');
const router = express.Router();
const Joi = require('joi');

router.use(express.json());

const genres = [
    { id: 1, name: "Action" },
    { id: 2, name: "Adventure" },
    { id: 3, name: "Comedy" },
]

router.get("/", (req, res) => {
    res.send(genres);
    console.log("Genre list has been sent!");
});

router.post("/", (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }

    const newGenre = { id: genres.length + 1, name: req.body.name };
    genres.push(newGenre);
    console.log("Succesfully Created!");
    res.send(newGenre);
});

router.put("/:id", (req, res) => {
    const genre = genres.find(c => c.id == req.params.id);
    if (!genre) {
        res.status(400).send("Genre with given ID was not found.")
    }

    const { error } = validateGenre(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }
    genre.name = req.body.name;
    console.log("Succesfully Updated!");
    res.send(genre);
});

router.delete("/:id", (req, res) => {
    const genre = genres.find(c => c.id == req.params.id);
    if (!genre) {
        res.status(400).send("Genre with given ID was not found.")
    }

    const indexNumber = genres.indexOf(genre);
    genres.splice(indexNumber, 1);
    console.log("Succesfully Deleted!");
    res.send(genre);
});

router.get("/:id", (req, res) => {
    const genre = genres.find(c => c.id == req.params.id);
    if (!genre) {
        res.status(400).send("Genre with given ID was not found.")
    }

    console.log("Succesfully Sent!");
    res.send(genre);
});

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    }

    const result = Joi.validate(genre, schema);
    return result;
}

module.exports = router;