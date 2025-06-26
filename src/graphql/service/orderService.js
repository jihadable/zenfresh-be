const Order = require("../../model/order");

class OrderService {
    constructor(){
        this._model = Order
    }

    async addOrder({ user, category }){
        const order = await this._model.create({ user, category, status: "Pending confirmation" })

        return order
    }

    async getOrderById(id){
        const order = await this._model.findById(id)

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
        await this.getOrderById(id)
        const order = await this._model.findByIdAndUpdate(id, { status, total_price }, { new: true })

        return order
    }

    async deleteOrderById(id){
        await this.getOrderById(id)
        await this._model.deleteOne({ _id: id })
    }
}

const orderService = new OrderService()

module.exports = orderService