const services = require("../services/auth");

exports.signUp = async (req , res) => {
    try {
        const payload = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            roles: req.body.roles
        }
        const result = await services.signUp(payload);
        res.status(200).json({data : result});
    } catch (error) {
        console.log(error)
        res.status(400).json({error: "Can't sign up!!!"});
    }
}

exports.signIn = async (req , res) => {
    try {
        const payload = {
            email: req.body.email,
            password: req.body.password
        }
        const result = await services.signIn(payload);
        return res.status(200).json({data : result});
    } catch (error) {
        console.log(error)
        return res.status(400).json({error: "Can't sign in!!!"});
    }
}