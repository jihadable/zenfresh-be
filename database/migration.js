const mongoose = require('mongoose')
const seeder = require('./seeder')
require("dotenv").config()

const deleteAllCollections = async () => {
    const collections = await mongoose.connection.db.listCollections().toArray()
    
    for (const collection of collections) {
        await mongoose.connection.db.collection(collection.name).drop()
    }
}

const migration = async () => {
    try {
        await deleteAllCollections()
        await seeder()

        console.log("Migration success.")
    } catch (error) {
        console.log("Migration failed.\n" + error)
    }
}

mongoose.connect(process.env.MONGO_URI, { dbName: "zenfresh" })
    .then(() => migration())
    .catch(error => {
        console.log("Connection error:\n" + error)
    })