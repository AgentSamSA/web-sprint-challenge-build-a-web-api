const express = require('express');
const actionsRouter = require("./actions/actions-router");
// const projectsRouter = require("./projects/projects-router");

const server = express();

server.use(express.json());

server.use("/api/actions", actionsRouter);
// server.use("/api/projects", projectsRouter);

server.get("/", (req, res) => {
    res.status(200).json({ api: "API is up and running" });
});

module.exports = server;
