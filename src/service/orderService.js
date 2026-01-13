const Order = require("../model/order");

class OrderService {
    constructor(){
        this._model = Order
    }

    async addOrder({ user, category }){
        const order = await this._model.create({ user, category })

        return order
    }

    async getOrderById(id){
        const order = await this._model.findById(id)

        if (!order){
            throw new Error("Pemesanan tidak ditemukan")
        }

        return order
    }

    async getOrdersByUser(user){
        const orders = await this._model.find({ user })

        return orders
    }

    async getOrders(){
        const orders = await this._model.find()

        return orders
    }

    async updateOrderById(id, { status, total_price }){
        const order = await this._model.findByIdAndUpdate(id, { status, total_price }, { new: true })

        if (!order){
            throw new Error("Pemesanan tidak ditemukan")
        }

        return order
    }

    async deleteOrderById(id){
        const order = await this._model.deleteOne({ _id: id })

        if (order.deletedCount == 0){
            throw new Error("Pemesanan tidak ditemukan")
        }
    }

    async getUnseenOrders(){
        const orders = await this._model.find({ is_seen_by_admin: false })

        return orders
    }

    async markAllSeen(){
        await this._model.updateMany({}, { is_seen_by_admin: true })

        return true
    }
}

const orderService = new OrderService()

module.exports = orderService