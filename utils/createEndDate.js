const getEndDate = () => {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }
    const today = new Date()
    const endDate = today.toLocaleDateString("id-ID", options)

    return endDate
}

module.exports = getEndDate