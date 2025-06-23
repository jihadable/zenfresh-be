const getCategories = () => {
    return [
        {
            name: "Regular",
            price: 6000,
            description: "2 hari pengerjaan"
        },
        {
            name: "Express",
            price: 8000,
            description: "1 hari pengerjaan"
        },
        {
            name: "Premium",
            price: 12000,
            description: "Pengerjaan kurang dari 1 hari"
        }
    ]
}

module.exports = getCategories