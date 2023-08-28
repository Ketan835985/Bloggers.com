/* eslint-disable no-undef */
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const validation = require('validator');
const bcrypt = require('bcrypt');

const userCreate = async (req, res) => {
    try {
        const { fname, lname, email, phone, password, title } = req.body;
        if (!fname || !lname || !email || !phone || !password || !title) {
            return res.status(400).json({ status: false, message: "All fields are required" })
        }
        if (!validation.isEmail(email)) {
            return res.status(400).json({ status: false, message: "Email is not valid" })
        }
        const emailPhoneCheck = await userModel.findOne({ $or: [{ email }, { phone }] });
        if (emailPhoneCheck) {
            return res.status(400).json({ status: false, message: "Email or Phone already exists" })
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await userModel.create({ fname, lname, email, phone, password: hashedPassword, title });
        res.status(201).json({ status: true, data: user, message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}


const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ status: false, message: "All fields are required" })
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ status: false, message: "Invalid Password" })
        }
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });
        res.setHeader("token", token);
        res.status(200).json({ status: true, data: { token, userId: user._id } });
    }
    catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}

module.exports = {
    userCreate,
    userLogin
}
