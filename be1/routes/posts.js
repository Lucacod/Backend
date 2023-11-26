const express = require('express')
const PostModel = require('../models/post')
const validatePost = require('../middlewares/validatePost')
const posts = express.Router()

posts.get('/posts', async (req, res) => {
   try {
       const posts = await PostModel.find()

       res.status(200)
           .send({
               statusCode: 200,
               posts
           })
   } catch (e) {
       res.status(500).send({
           statusCode: 500,
           message: "Errore interno del server"
       })
   }
})

posts.get('/posts/bytitle', async (req, res) => {
    const { title } = req.query;
    try {
        const postByTitle = await PostModel.find({
            title: {
                $regex: title,
                $options: 'i'
            }
        })

        res.status(200).send(postByTitle)
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Errore interno del server"
        })
    }
})

posts.get('/posts/bydate/:date', async (req, res) => {
    const { date } = req.params

    try {
        const getPostByDate = await PostModel.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            {
                                $eq: [
                                    {$dayOfMonth: '$createdAt' },
                                    {$dayOfMonth: new Date(date)}
                                ]
                            },
                            {
                                $eq: [
                                    {$month: '$createdAt' },
                                    {$month: new Date(date)}
                                ]
                            },
                            {
                                $eq: [
                                    {$year: '$createdAt' },
                                    {$year: new Date(date)}
                                ]
                            }
                        ]
                    }
                }
            }
        ])

        res.status(200).send(getPostByDate)
    } catch (e) {

    }
})

posts.get('/posts/byid/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostModel.findById(id)
        if (!post) {
            return res.status(404).send({
                statusCode: 404,
                message: "post not found"
            })
        }

        res.status(200).send({
            statusCode: 200,
            post
        })
    } catch (e) {

    }
})

posts.post('/posts/create', validatePost, async (req, res) => {

    const newPost = new PostModel({
        title: req.body.title,
        category: req.body.category,
        cover: req.body.cover,
        price: Number(req.body.price),
        rate: Number(req.body.rate),
        author: req.body.author
    })

    try {
        const post = await newPost.save()

        res.status(201).send({
            statusCode: 201,
            message: "Post saved successfully",
            payload: post
        })
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Errore interno del server"
        })
    }
})

posts.patch('/posts/update/:postId', async (req, res) => {
    const { postId } = req.params;

    const postExist = await PostModel.findById(postId)

    if (!postExist) {
        return res.status(404).send({
            statusCode: 404,
            message: "This post does not exist!"
        })
    }

    try {
        const dataToUpdate = req.body;
        const options= { new: true };
        const result = await PostModel.findByIdAndUpdate(postId, dataToUpdate, options)

        res.status(200).send({
            statusCode: 200,
            message: "Post edited successfully",
            result
        })
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Errore interno del server"
        })
    }
})

posts.delete('/posts/delete/:postId', async (req, res) => {
    const { postId } = req.params;

    try {
        const post = await PostModel.findByIdAndDelete(postId)
        if (!post) {
            return res.status(404).send({
                statusCode: 404,
                message: "Post not found or already deleted!"
            })
        }

        res.status(200).send({
            statusCode: 200,
            message: "Post deleted successfully"
        })

    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Errore interno del server"
        })
    }
})

module.exports = posts