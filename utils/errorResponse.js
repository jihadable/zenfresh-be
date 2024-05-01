const errorResponse = (error, res) => {
    console.log(error.message)

    res.status(500).json({
        status: 500,
        message: error.message
    })
}

module.exports = errorResponse