const User = require('../database/users.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUserService = async (email, fullname, password) => {
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('user already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            email,
            fullname,
            password: hashedPassword,
        });
        const result = await user.save();
        const response = {
            email: result.email,
            fullname: result.fullname,
        }
        return response;
    } catch (e) {
        throw new Error(e);
    }
};

const loginUserService = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (user == null) {
            return res.status(401).json({ message: 'User not registered' });
        }
        const payload = {
            fullname: user.fullname,
            email: user.email
        }
        if (await bcrypt.compare(password, user.password)) {
            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: 90000
            });
            return { accessToken: accessToken };
        } else {
            return res.status(401).json({ message: 'Invalid Password' });
        }
    } catch (e) {
        throw new Error(e);
    }
};

module.exports = {
    registerUserService,
    loginUserService,
};
