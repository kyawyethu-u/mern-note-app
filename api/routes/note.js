const express = require("express")
const router = express.Router()
const {body} = require("express-validator")

const notesController = require("../controllers/note")


//GET /notes
router.get("/notes",notesController.getNotes)

//POST /create
router.post("/create",[
    body("title").trim().
        isLength({min: 3}).withMessage("Title is too short").
        isLength({max: 30}).withMessage("Title is too long"),
    body("content").trim().
        isLength({min: 5}).withMessage("Title is too short"),
],notesController.createNotes)

//GET /notes/:id
router.get("/notes/:id",notesController.getNote)

//DELETE /delete/:id
router.delete("/delete/:id",notesController.deleteNote)

//GET /edit/:id
router.get("/edit/:id",notesController.getOldNote)

//POST /edit
router.put("/edit",notesController.updateNote)

module.exports = router;