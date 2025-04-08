const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const todoRoutes = require('./routes/todos');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/todos', todoRoutes);

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to mongoDB");
}).catch(err => console.error(err));

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port http://localhost:5000/`);
});