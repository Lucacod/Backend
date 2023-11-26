const validatePost = (req, res, next) => {
    const errors = []

    const { title, category, cover, price, rate, author } = req.body;

    if (typeof title !== 'string') {
        errors.push('Title must be a string')
    }

    if (typeof category !== 'string') {
        errors.push('Category must be a string')
    }

    if (typeof cover !== 'string') {
        errors.push('Cover must be a string')
    }

    if (typeof price !== 'number') {
        errors.push('Price must be a number')
    }

    if (typeof rate !== 'number') {
        errors.push('Rate must be a number')
    }

    if (typeof author !== 'string') {
        errors.push('author must be a string')
    }

    if (errors.length > 0) {
        res.status(400).send({ errors } )
    } else {
        next()
    }
}

module.exports = validatePost