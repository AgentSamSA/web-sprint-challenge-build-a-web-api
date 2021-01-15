const express = require("express");

const router = express.Router();

const Projects = require("./projects-model");

const { validateProjectId, validateProject } = require("../middleware/middleware");

router.get("/", (req, res, next) => {
    Projects.get(req.params.id)
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(next);
});

router.get("/:id", validateProjectId, (req, res) => {
    res.status(200).json(req.action);
});

router.post("/", validateProject, (req, res, next) => {
    Projects.insert(req.body)
        .then(action => {
            res.status(201).json(action);
        })
        .catch(next);
});

router.put("/:id", validateProjectId, validateProject, (req, res, next) => {
    Projects.update(req.params.id, req.body)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(next);
});

router.delete("/:id", validateProjectId, (req, res, next) => {
    Projects.remove(req.params.id)
        .then(() => {
            res.status(200).json({ message: "the project has been deleted" });
        })
        .catch(next);
});

router.use((err, req, res, next) => {
    res.status(500).json({
        info: "something went wrong inside the projects router",
        message: err.message,
        stack: err.stack
    });
});

module.exports = router;