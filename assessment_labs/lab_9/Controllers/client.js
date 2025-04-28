const express = require('express');
const router = express.Router();
const client = require('../Models/client');

router.get('/:id', (req, res) => {
    const id = req.params.id;

    client.find({clienteId : id}).then(result => {
        if (result != null) {
            console.log(result);
            return res.status(200).send(result);
        } else {
            return res.status(400).send("Not Found")
        }
    });
});

module.exports = router; 
