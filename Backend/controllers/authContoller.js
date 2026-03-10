const User = require("../model/registration");
const bycrpt = require('bcrypt')

const createuser = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        const userexist = await User.findOne({ where: { email: email } });
        if (userexist) {
            return res.status(400).json({ message: 'user already registered using this email' })
        }
        const hashedpassword = await bycrpt.hash(password, 10)
        const user = await User.create({ firstname, lastname, email, password: hashedpassword });
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const loginuser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(400).json({ message: 'user is not registered' })
        }
        const ispasswordmatch = await bycrpt.compare(password, user.password);
        if (!ispasswordmatch) {
            return res.status(400).json({ message: 'password is not correct' })
        }
        res.status(200).json({ message: 'login successfully', user })
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}
module.exports = { createuser, loginuser };