const mongoose = require('mongoose')


const PostsSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    category: {
        type: String,
        default: "General"
    },
    cover: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiQc9dZn33Wnk-j0sXZ19f8NiMZpJys7nTlA&usqp=CAU"
    },
    price: {
        type: Number,
        default: 0,
    },
    rate: {
        type: Number,
    },
    author: {
        type: String,
    }
}, { timestamps: true, strict: true })


module.exports = mongoose.model('postModel', PostsSchema, 'posts')