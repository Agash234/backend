const User = require('../model/user');
const { encryptData, decryptData } = require('../lib/index');
const jwt = require('jsonwebtoken');
const privatekey= process.env.PRIVATE_KEY;
const refreshkey=process.env.REFRESH_KEY;

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const encryptedPassword = encryptData(password);
        console.log(encryptedPassword)

        user = new User({
            username,
            email,
            password: encryptedPassword,
        });

        await user.save();
        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error');
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const decryptedPassword = decryptData(user.password);
        console.log(decryptedPassword)
        if (decryptedPassword !== password) {
            return res.status(400).json({ msg: 'Password incorrect' });
        }

        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, privatekey, {
            expiresIn: '2min',
        });
        const refreshToken=jwt.sign(payload,refreshkey,{
            expiresIn:"5min"
        });
        const expiresIn = Date.now()+ 10* 60 * 1000;

        res.json({ token, user,refreshToken });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};