// Import the firebase-admin package
const express = require('express');
const admin = require("firebase-admin");
const cors=require('cors')
const port = 3000;
// Import the service account credentials
const serviceAccount = require("./ServiceSecurityKey.json");

// Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Create Express app
const app = express();

app.use(cors({
  origin: 'http://localhost:5173' // Replace this with your client's origin
}));
// API endpoint to delete user by UID
app.delete('/api/users/:uid', async (req, res) => {
  const uid = req.params.uid;
  try {
    await admin.auth().deleteUser(uid);
    res.status(200).send('User deleted successfully');
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Internal server error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

