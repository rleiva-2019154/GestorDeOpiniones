import mongoose from "mongoose";

const publicationSchema = mongoose.Schema({
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
    }
})

export default mongoose.model('publication', publicationSchema)