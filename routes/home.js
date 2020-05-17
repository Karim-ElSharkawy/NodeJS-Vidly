const express = require('express');
const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
    res.send("Hello World!");
});

module.exports = router;