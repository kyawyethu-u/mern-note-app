const express = require("express")
const router = express.Router()
const {body} = require("express-validator")

const notesController = require("../controllers/note")

const authMiddleware = require("../middlewares/is-auth")


//GET /notes
router.get("/notes",notesController.getNotes)

//POST /create
router.post("/create",authMiddleware,[
    body("title").trim().
        isLength({min: 3}).withMessage("Title is too short").
        isLength({max: 30}).withMessage("Title is too long"),
    body("content").trim().
        isLength({min: 5}).withMessage("Title is too short"),
],notesController.createNotes)

//GET /notes/:id
router.get("/notes/:id",notesController.getNote)

//DELETE /delete/:id
router.delete("/delete/:id",authMiddleware,notesController.deleteNote)

//GET /edit/:id
router.get("/edit/:id",authMiddleware,notesController.getOldNote)

//PUT /edit
router.put("/edit",authMiddleware,notesController.updateNote)

module.exports = router;