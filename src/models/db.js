import mongoose from "mongoose";
// mongoose.Promise = global.Promise;
export default {
    connect() {
        mongoose.connect('mongodb://localhost/post', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db = mongoose.connection;
        db.on("error", console.error.bind(console, "connection error: "));
        db.once("open", function () {
            console.log("Connected successfully");
        });
    }
}

// import Blog from '../models/blog.js';