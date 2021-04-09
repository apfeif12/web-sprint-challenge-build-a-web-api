const express = require("express");
const Actions = require("./actions-model.js");
const Posts = require("../projects/projects-model.js");
const {
    checkActionId,
    checkProductId,
    validateAction,
} = require("../middleware/middleware.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const getActions = await Actions.get();
        res.status(200).json(getActions);
    } catch (error) {
        next(error);
    }
}); // returns an array of actions (or an empty array) as the body of the _response_.

router.get("/:id", checkActionId, (req, res) => {
    res.status(200).json(req.action);
}); // returns an action with the given `id` as the body of the _response_.

router.post("/", validateAction, async (req, res, next) => {
    try {
        const postAction = await Actions.insert(req.body);
        res.status(201).json(postAction);
    } catch (error) {
        next(error);
    }
}); //returns the newly created action as the body of the _response_.

module.exports = router;
