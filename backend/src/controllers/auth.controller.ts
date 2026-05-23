import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'pmbidmatrix-jwt-secret', { expiresIn: '1d' });

    res.status(201).json({ success: true, token, user: { id: user.id, name: user.name, role: user.role } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    
    user.lastLogin = new Date();
    await user.save();

    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'pmbidmatrix-jwt-secret', { expiresIn: '1d' });

    res.json({ success: true, token, user: { id: user.id, name: user.name, role: user.role } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMe = async (req: any, res: Response) => {
  res.json({ success: true, user: req.user });
};
