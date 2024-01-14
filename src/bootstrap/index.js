const mongoose = require("mongoose");
exports.bootstrap = async()=> {
    try {
        mongoose.connect("mongodb://127.0.0.1/bolgging-Website")
        console.log(`DB connected!!!`)
    } catch (error) {
        console.log(error);
    }
}