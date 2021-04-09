const Actions = require("../actions/actions-model.js");
const Projects = require("../projects/projects-model.js");

const checkActionId = async (req, res, next) => {
    try {
        const action = await Actions.get(req.params.id);
        if (!action) {
            res.status(404).json(`No action with id: ${req.params.id}`);
        } else {
            req.action = action;
            next();
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const checkProjectId = async (req, res, next) => {
    try {
        const project = await Projects.get(req.params.id);
        if (!project) {
            res.status(404).json(`No project with id: ${req.params.id}`);
        } else {
            req.project = project;
            next();
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const validateAction = (req, res, next) => {
    if (!req.body.description || !req.body.notes || !req.body.project_id) {
        res.status(400).json({ error: "missing a field" });
    } else {
        next();
    }
};

const validateProject = (req, res, next) => {
    if (!req.body.description || !req.body.name || !req.body.completed) {
        res.status(400).json({ error: "missing a field" });
    } else {
        next();
    }
};

module.exports = {
    checkActionId,
    checkProjectId,
    validateAction,
    validateProject,
};
