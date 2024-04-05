const { registerUserService, loginUserService } = require('../services/user-service');

const registerUser = async (req, res, next) => {
    try {
        const { email, fullname, password } = req.body;
        const result = await registerUserService(email, fullname, password);
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await loginUserService(email, password);
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
};

module.exports = {
    registerUser,
    loginUser,
};
