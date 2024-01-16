import User from "../db/models/userModel.js";
import bcrypt from "bcrypt";
export async function register(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Invalid request body." });
    }
    console.log("username:", username, "password", password);
    if (username.length < 5 || username.length > 20) {
      return res
        .status(400)
        .json({ error: "Username must be between 3 and 20 characters." });
    }

    // Check password length
    if (password.length < 8 || password.length > 25) {
      return res
        .status(400)
        .json({ error: "Password must be between 8 and 100 characters." });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "username already taken" });
    }
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "user Registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server Error" });
  }
}

export async function login(req, res) {
  console.log("trying to login");
}
