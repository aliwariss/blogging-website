const authRepo = require("../repository/auth");
const Boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp = async (payload) => {
    try {
        const passwordHash = await bcrypt.hash(payload.password,5);
        const createPayload = {
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            password: passwordHash,
            roles: payload.roles || "User"
        }
        const addingUser = await authRepo.signUp(createPayload);
        const tokenBody = {
            id: addingUser._id,
            roles: addingUser.roles
        }
        const secretKey = "topSecret";
        return {
            token: jwt.sign(tokenBody, secretKey, {expiresIn:"99y"}),
            addingUser
        };
    } catch (error) {
        throw Boom.badRequest(error);
    }
}

exports.signIn = async (payload) => {
    try {
        if(payload.email && payload.password){
            const findUser = await authRepo.signIn(payload);
            if(findUser){
                const verifyPassword = await bcrypt.compare(payload.password, findUser.password);
                if(verifyPassword)
                {
                    return {
                findUser
            };
        }
            }
        }
    } catch (error) {
        throw Boom.badRequest(error);
    }
}