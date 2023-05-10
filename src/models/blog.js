import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    author: {type: String, required: true},
    text: {type: String, required: true}
});

const postSchema = new Schema({
    title: {type: String, required: true},
    subtitle: {type: String},
    content: {type: String, required: true},
    reviews: [reviewSchema]
});


export default mongoose.model('Blog', postSchema);