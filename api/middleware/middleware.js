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

const checkProductId = async (req, res, next) => {
    const project = await Projects.get(req.body.project_id);
    if (project) {
        next();
    } else {
        res.status(404).json({
            message: `project id not found`,
        });
    }
};

const validateAction = (req, res, next) => {
    if (!req.body.description || !req.body.notes || !req.body.project_id) {
        res.status(400).json({ error: "missing a field" });
    } else {
        next();
    }
};

module.exports = { checkActionId, checkProductId, validateAction };
