const express = require("express");
const Projects = require("./projects-model.js");
const {
    checkProjectId,
    validateProject,
} = require("../middleware/middleware.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const getProjects = await Projects.get();
        res.status(200).json(getProjects);
    } catch (error) {
        next(error);
    }
}); // returns an array of projects (or an empty array) as the body of the _response_.

router.get("/:id", checkProjectId, (req, res) => {
    res.status(200).json(req.project);
}); // returns an project with the given `id` as the body of the _response_.

router.post("/", validateProject, async (req, res, next) => {
    try {
        const postProject = await Projects.insert(req.body);
        res.status(201).json(postProject);
    } catch (error) {
        next(error);
    }
}); //returns the newly created project as the body of the _response_.

router.put("/:id", validateProject, checkProjectId, async (req, res, next) => {
    try {
        await Projects.update(req.params.id, req.body);
        const putProject = await Projects.get(req.params.id);
        res.status(201).json(putProject);
    } catch (error) {
        next(error);
    }
}); //returns the updated project as the body of the _response_.

router.delete("/:id", checkProjectId, async (req, res, next) => {
  try {
      const deleteProject = await Projects.remove(req.params.id);
      res.status(200).json(deleteProject);
  } catch (error) {
      next(error);
  }
}); //returns no _response_ body.

router.get("/:id/actions", checkProjectId, async (req, res, next) => {
  try {
      const getProjectActions = await Projects.getProjectActions(req.params.id);
      res.status(200).json(getProjectActions);
  } catch (error) {
      next(error);
  }
}); // returns an array of projects actions


module.exports = router;
