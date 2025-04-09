const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require("morgan");
const todoRoutes = require('./routes/todos');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use('/todos', todoRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to mongoDB");
}).catch(err => console.error(err));

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port http://localhost:5000/`);
});