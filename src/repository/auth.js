const model = require("../models/auth");

exports.signUp = async (payload) => {
    return await model.create(payload);
}

exports.signIn = async (payload) => {
    return await model.findOne({email: payload.email});
}