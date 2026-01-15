const userMapper = user => {
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        is_email_verified: user.is_email_verified,
        phone: user.phone,
        address: user.address,
        role: user.role   
    }
}

const orderMapper = order => {
    return {
        id: order._id,
        status: order.status,
        total_price: order.total_price,
        date: order.date,
        is_seen_by_admin: order.is_seen_by_admin,
        category: {

        }
    }
}

const categoryMapper = category => {
    return {
        id: category._id,
        name: category.name,
        price: category.price,
        description: category.description
    }
}

module.exports = { userMapper, orderMapper, categoryMapper }