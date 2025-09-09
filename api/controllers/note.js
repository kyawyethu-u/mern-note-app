const {validationResult} = require("express-validator");
//models
const Note = require("../models/note")

//utils
const {unlink} = require("../utils/unlink")

exports.getNotes = (req,res,next)=>{
    const currentPage = req.query.page || 1 ;
    const perPage = 6;
    let totalNotes;
    let totalPages;
    Note.find().countDocuments().then(counts =>{
        totalNotes = counts;
        totalPages = Math.ceil(totalNotes / perPage);
        return  Note.find().sort({createdAt : -1}).skip((currentPage -1) * perPage).limit(perPage);
    }).then((notes)=>{
        return res.status(200).json({notes,totalNotes,totalPages});
    }).catch(err=>{
         console.log(err);
        return res.status(404).json({
            message: "Something went wrong!"
        })
    })
}

exports.createNotes = (req,res,next) =>{
    const {title,content} = req.body;
    const cover_image = req.file;
    
     const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(404).json({
            message: "Validation failed",
            errorMessages: errors.array()
        })   
    }
    Note.create({
        title,
        content,
        cover_image: cover_image ? cover_image.path : "",
        creator: req.userId
    }).then(_=>{
        return res.status(201).json({
        message: "Note created",
    })
    }).catch(err=>{
         console.log(err);
        return res.status(404).json({
            message: "Something went wrong!"
        })
    })
}

exports.getNote= (req,res,next) =>{
    const {id} = req.params;
    Note.findById(id).populate("creator","username").then((note)=>{
       return res.status(200).json(note)
    }).catch((err)=>{
        console.log(err);
        res.status(404).json({
            message: "Something went wrong.",
        })
    })
}

exports.deleteNote = (req,res,next) =>{
    const {id} = req.params;
    Note.findById(id).then((note)=>{
        if(note.creator.toString() !== req.userId){
            return res.status(401).json("Auth failed!")
        }
        if(note.cover_image){
            unlink(note.cover_image);
        }
        return Note.findByIdAndDelete(id).then(_=>{
           return res.status(204).json({
            message: "Note deleted"
        })
    })
    }).catch((err)=>{
         console.log(err);
        res.status(404).json({
            message: "Something went wrong"
        })
    })
}

exports.getOldNote =(req,res,next) =>{
    const {id} = req.params;
    Note.findById(id).then((note)=>{
        if(note.creator.toString() !== req.userId){
            return res.status(401).json("Auth failed")
        }
        return res.status(200).json(note);
    }).catch((err)=>{
         console.log(err);
        res.status(404).json({
            message: "Something went wrong!"
        })})
}

exports.updateNote=(req,res,next) =>{
    const {note_id,title,content} = req.body;
    const cover_image = req.file;
    Note.findById(note_id).then((note)=>{
        if(note.creator.toString() !== req.userId){
            return res.status(401).json("Auth failed!")
        }
        note.title = title;
        note.content = content;
        if(cover_image){
            if(note.cover_image){
                unlink(note.cover_image);
            }
            note.cover_image = cover_image.path;
        }
       return note.save();
    }).then(_=>{
       return res.status(200).json({
        message: "Note updated!"
       })
    })
    .catch((err)=>{
         console.log(err);
        res.status(404).json({
            message: "Something went wrong!",
        })
    })
}