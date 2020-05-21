const express = require('express');
const { Customer, validate } = require('../models/customer');
const router = express.Router();

router.use(express.json());

router.get("/", async (req, res) => {
    const allCustomers = await Customer.find().sort({ name: 1 });
    res.send(allCustomers);
    console.log("Customer list has been sent!");
});

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }
    const newCustomer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });

    const result = await newCustomer.save();
    console.log("Succesfully Created!");
    res.send(result);
});

router.put("/:id", async (req, res) => {
    let newCustomer = await Customer.findById(req.params.id);

    if (!newCustomer) {
        res.status(400).send("Customer with given ID was not found.")
    }

    const { error } = validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }

    newCustomer.name = req.body.name;
    newCustomer.phone = req.body.phone;
    newCustomer.isGold = req.body.isGold;

    newCustomer = await newCustomer.save();
    console.log("Succesfully Updated!");
    res.send(newCustomer);
});

router.delete("/:id", async (req, res) => {

    const newCustomer = await Customer.findByIdAndRemove(req.params.id);
    if (!newCustomer) {
        res.status(400).send("Customer with given ID was not found.")
    }

    console.log("Succesfully Deleted!");
    res.send(newCustomer);
});

router.get("/:id", async (req, res) => {
    const newCustomer = await Customer.findById(req.params.id);
    if (!newCustomer) {
        res.status(400).send("Customer with given ID was not found.")
    }

    console.log("Succesfully Sent!");
    res.send(newCustomer);
});

module.exports = router;