const express = require("express");
const Actions = require("./actions-model.js");
const {
    checkActionId,
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

router.put("/:id", validateAction, checkActionId, async (req, res, next) => {
    try {
        await Actions.update(req.params.id, req.body);
        const putAction = await Actions.get(req.params.id);
        res.status(201).json(putAction);
    } catch (error) {
        next(error);
    }
}); //returns the updated action as the body of the _response_.

router.delete("/:id", checkActionId, async (req, res, next) => {
    try {
        const deleteAction = await Actions.remove(req.params.id);
        res.status(200).json(deleteAction);
    } catch (error) {
        next(error);
    }
}); //returns no _response_ body.

module.exports = router;
