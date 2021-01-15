const Actions = require("../actions/actions-model");
const Projects = require("../projects/projects-model");

async function validateActionId(req, res, next) {
    try {
        const action = await Actions.get(req.params.id);
        if (action) {
            req.action = action;
            next();
        } else {
            res.status(404).json({ message: "action with that id not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "error retreiving action data" });
    }
}

function validateAction(req, res, next) {
    const projectId = req.body.projectId;
    const description = req.body.description;

    if (!req.body) {
        res.status(400).json({ message: "missing action data" });
    } else if (!projectId || !description || !req.body.notes) {
        res.status(400).json({ message: "project id, description, and notes required" });
    } else if (projectId !== Projects.get(projectId)) {
        res.status(404).json({ message: "project with that id not found" });
    } else if (!description.length > 128) {
        res.status(400).json({ message: "description length too long (max 128 chars.)" });
    } else {
        next();
    }
}

async function validateProjectId(req, res, next) {
    try {
        const project = await Projects.get(req.params.id);
        if (project) {
            req.project = project;
            next()
        } else {
            res.status(404).json({ message: "project with that id not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "error retreiving project data" });
    }
}

function validateProject(req, res, next) {
    if (!req.body) {
        res.status(400).json({ message: "missing project data" });
    } else if (!req.body.name || !req.body.description) {
        res.status(400).json({ message: "name and description required" });
    } else {
        next();
    }
}

module.exports = { validateActionId, validateAction, validateProjectId, validateProject };