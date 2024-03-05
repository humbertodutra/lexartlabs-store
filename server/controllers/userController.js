const userService = require('../service/userService');

const registerUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ message: 'Email and password are required.' });
		}

		const existingUser = await userService.findUserByEmail(email);
		if (existingUser) {
			return res.status(409).json({ message: 'User with this email already exists.' });
		}
		const newUser = await userService.createUser(req.body);
		res.status(201).json(newUser);
	} catch (error) {
		res.status(400).json({ message: 'Error registering user.', error: error.message });
	}
};

const loginUser = async (req, res) => {
	try {
		if (!req.body.email || !req.body.password) {
			return res.status(400).json({ message: 'Email and password are required' });
		}

		const login = await userService.loginUser(req.body);
		res.status(200).json(login);
	} catch (error) {
		res.status(400).json({ message: 'Invalid email or password' });
	}
};

module.exports = {
	registerUser,
	loginUser
};
