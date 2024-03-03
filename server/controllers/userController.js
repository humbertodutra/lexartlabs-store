const userService = require('../service/userService');

const registerUser = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error registering user', error });
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
}

module.exports = {
  registerUser,
  loginUser,
};
