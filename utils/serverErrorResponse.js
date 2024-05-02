const serverErrorResponse = (error, res) => {
    console.log(error.message)

    res.status(500).json({
        status: 500,
        ok: false,
        message: error.message
    })
}

module.exports = serverErrorResponse