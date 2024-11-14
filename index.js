const express = require("express");
const app = express();
const PORT = process.env.PORT || 8800;
const cors = require("cors");
require("dotenv").config();
const path = require('path');

app.use(
    cors({
        origin: [/^http:\/\/localhost:\d+$/], 
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    })
);

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.json());

const connectDB = require("./config/database");

const userRoutes = require('./Routes/userRoute');
const studentRoutes = require('./Routes/studentRoute');
const facultyRoutes = require('./Routes/facultyRoutes');
app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello from crm server" });
});
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server start http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to the database:", err.message);
        process.exit(1);
    });

    app.use('/api/users', userRoutes);
    app.use('/api/students', studentRoutes);
    app.use('/api/faculty', facultyRoutes);

