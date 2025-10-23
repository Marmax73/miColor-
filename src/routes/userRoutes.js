import express from 'express';
import { registerUser } from '../controllers/userController.js';

const router = express.Router();

// Security middleware
router.use((req, res, next) => {
  // Block ATK bridge attempts
  if (req.headers['atk.bridge'] || req.body.atkBridge) {
    return res.status(403).json({
      success: false,
      message: 'Forbidden request'
    });
  }
  
  // Security headers
  res.set({
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Content-Security-Policy': "default-src 'self'"
  });
  
  next();
});

// Middleware for JSON parsing
router.use(express.json());

// Route for user registration
router.post('/register', registerUser);

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    message: 'Something broke!'
  });
});

export default router;
