const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

const genres = [
    { id: 1, name: "Action" },
    { id: 2, name: "Adventure" },
    { id: 3, name: "Comedy" },
]

app.get("/api/genres", (req, res) => {
    res.send(genres);
    console.log("Genre list has been sent!");
});

app.post("/api/genres", (req, res) => {
    const newGenre = { id: genres.length + 1, name: req.body.name };
    genres.push(newGenre);
    console.log("Succesfully Created!");
    res.send(newGenre);
});

app.put("/api/genres/:id", (req, res) => {
    const genre = genres.find(c => c.id == req.params.id);
    genre.name = req.body.name;
    console.log("Succesfully Updated!");
    res.send(genre);
});

app.delete("/api/genres/:id", (req, res) => {
    const genre = genres.find(c => c.id == req.params.id);
    const indexNumber = genres.indexOf(genre);
    genres.splice(indexNumber, 1);
    console.log("Succesfully Deleted!");
    res.send(genre);
});

app.get("/api/genres/:id", (req, res) => {
    const genre = genres.find(c => c.id == req.params.id);
    console.log("Succesfully Sent!");
    res.send(genre);
});
const port = process.env.port || 3000;
app.listen(port, () => console.log(`Ready to connect on port ${port}`));