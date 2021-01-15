const express = require("express");

const router = express.Router();

const Actions = require("./actions-model");

const { validateActionId, validateAction } = require("../middleware/middleware");

router.get("/", (req, res, next) => {
    Actions.get(req.params.id)
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(next);
});

router.get("/:id", validateActionId, (req, res) => {
    res.status(200).json(req.action);
});

router.post("/", validateAction, (req, res, next) => {
    Actions.insert(req.body)
        .then(action => {
            res.status(201).json(action);
        })
        .catch(next);
});

router.put("/:id", validateActionId, validateAction, (req, res, next) => {
    Actions.update(req.params.id, req.body)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(next);
});

router.delete("/:id", validateActionId, (req, res, next) => {
    Actions.remove(req.params.id)
        .then(() => {
            res.status(200).json({ message: "the action has been deleted" });
        })
        .catch(next);
});

router.use((err, req, res, next) => {
    res.status(500).json({
        info: "something went wrong inside the actions router",
        message: err.message,
        stack: err.stack
    });
});

module.exports = router;