
// ===============================
// Middleware Logging & Bearer Auth Example
// ===============================

const express = require('express');
const app = express();
const PORT = 3000;

// -------------------------------
// 1. Logging Middleware
// -------------------------------
app.use((req, res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.url}`);
  next();
});

// -------------------------------
// 2. Bearer Token Authentication Middleware
// -------------------------------
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  // Check header presence
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or incorrect' });
  }

  const token = authHeader.split(' ')[1]; // Extract token

  if (token === 'mysecrettoken') {
    next(); // Token valid
  } else {
    return res.status(403).json({ message: 'Invalid token' });
  }
}

// -------------------------------
// 3. Public Route
// -------------------------------
app.get('/public', (req, res) => {
  res.status(200).send('This is a public route. No authentication required.');
});

// -------------------------------
// 4. Protected Route
// -------------------------------
app.get('/protected', authenticateToken, (req, res) => {
  res.status(200).send('You have accessed a protected route with a valid Bearer token!');
});

// -------------------------------
// 5. Start Server
// -------------------------------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
