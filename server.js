const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Static Frontend Assets from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// API Endpoint for Contact Form Submission
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, error: "All fields are required." });
    }

    console.log(`[SECURE TELEMETRY RECEIVED]:`);
    console.log(`From: ${name} (${email})`);
    console.log(`Message: ${message}`);

    res.status(200).json({ 
        success: true, 
        status: "TRANSMISSION_SUCCESSFUL",
        timestamp: new Date().toISOString()
    });
});

// Fallback Route to serve index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`[CORE RUNNING] Premium Cyber-Server established on port ${PORT}`);
    console.log(`[URL] Navigate to: http://localhost:${PORT}`);
});