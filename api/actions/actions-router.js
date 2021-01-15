const express = require("express");

const router = express.Router();

const Actions = require("./actions-model");

router.get("/", (req, res, next) => {
    Actions.get(req.params.id)
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(next);
});

router.get("/:id", (req, res, next) => {
    Actions.get(req.params.id)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(next);
});

router.post("/", (req, res, next) => {
    Actions.insert(req.body)
})

module.exports = router;