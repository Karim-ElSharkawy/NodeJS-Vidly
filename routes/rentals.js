const express = require('express');
const Fawn = require('fawn');
const mongoose = require("mongoose");
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const { Rental, validate } = require('../models/rental');
const router = express.Router();

router.use(express.json());

Fawn.init(mongoose);

router.get("/", async (req, res) => {
    const allRentals = await Rental.find().sort('-dateOut');
    res.send(allRentals);
    console.log("Rental list has been sent!");
});

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send("Invalid Customer.")

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send("Invalid Customer.")

    if (movie.numberInStock === 0) { return res.status(400).send("Movie not in stock.") }

    const newRental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });
    try {
        new Fawn.Task()
            .save('rentals', newRental)
            .update('movies', { _id: movie._id }, {
                $inc: { numberInStock: -1 }
            })
            .run();

        console.log("Succesfully Created!");
        res.send(newRental);

    } catch (err) {
        res.status(500).send("Something Failed!");
    }

});


module.exports = router;