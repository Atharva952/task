import userModel from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const genrateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export const createUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({
        message: "createndtials are empty",
      });
    }

    const existingUser = await userModel.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        message: "user already exists",
      });
    }

    if (password !== confirmPassword && password.length < 8) {
      return res.status(400).json({
        message: "password should be same or more then 8 letters",
      });
    }
    const salt = Number(process.env.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = genrateToken(newUser._id, newUser.role);

    return res.status(201).json({
      data: {
        newUser,
        token,
      },
      message: "user created successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "api error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "createndtials are empty",
      });
    }

    const user = await userModel.findOne({ username });

    if (password.length < 8) {
      return res.status(400).json({
        message: "password should be same or more then 8 letters",
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(400).json({
        message: "password invaild",
      });
    }

    const token = genrateToken(user._id, user.role);

    return res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
      token,
      message: "loged in successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "api error",
    });
  }
};
