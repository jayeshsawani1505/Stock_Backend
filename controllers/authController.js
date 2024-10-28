const authService = require('../services/authService');

const userLogin = async (req, res) => {
    try {
        const { email, password_hash } = req.body;
        const loginData = {
            email,
            password_hash
        };

        const userLogin = await authService.userLogin(loginData);
        res.status(200).json({ message: 'Login successful', Data: userLogin });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const modifyPassword = async (req, res) => {
    try {
        const { email, password_hash, newpassword } = req.body;
        const modifyData = {
            email,
            password_hash,
            newpassword
        };

        const modifiedPasswordData = await authService.modifyPassword(modifyData);
        res.status(200).json({ message: "Modify Password Successfully", data: modifiedPasswordData });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create new user API
const createUserHandler = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        const newUser = await authService.createUserService({ email, password, role });
        res.status(201).json({ message: 'User created successfully', data: newUser });
    } catch (error) {
        console.error('Error in createUserHandler:', error); // Log the error
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    userLogin, modifyPassword, createUserHandler
};