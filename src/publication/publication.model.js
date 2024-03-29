import { Schema, model } from "mongoose"

const publicationSchema = Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    mainText: {
        type: String,
        required: true
    },
    user: {
        type: Schema.ObjectId,
        ref: "user",
        required: true
    }
})

export default model('publication', publicationSchema)