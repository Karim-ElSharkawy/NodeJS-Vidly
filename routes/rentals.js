const express = require('express');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const { Rental, validate } = require('../models/rental');
const router = express.Router();

router.use(express.json());

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

    const result = await newRental.save();

    movie.numberInStock--;
    movie.save();

    console.log("Succesfully Created!");
    res.send(result);
});


module.exports = router;