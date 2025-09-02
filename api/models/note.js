const {model,Schema} = require("mongoose")
const { defaultClientConditions } = require("vite")

const noteSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100
    },
    content: {
        type: String,
        required: true,
        minLength: 5
    },
    cover_image: {
        type: String,
    },
    creator: {
        type: String,
        default: "Anonymous"
    },
},
{
    timestamps: true
}
)

const noteModel = model("Note",noteSchema)
module.exports = noteModel;