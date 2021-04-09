const express = require("express");
const server = express();
const morgan = require("morgan");

const actionsRouter = require("./actions/actions-router.js");
const projectsRouter = require("./projects/projects-router.js");

server.use(express.json());
server.use(morgan("dev"));
server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);

server.get("/", (req, res) => {
    res.send("API Test");
});

// server.use((err, req, res, next) => {
//     res.status(500).json({
//         message: err.message,
//         stack: err.stack,
//         custom: "something broke",
//     });
// });

module.exports = server;
