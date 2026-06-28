const express = require('express');
const  mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());


mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/inventory')
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 

//importing the routes in the main server file to make them accessible to the application
const inventoryRoutes = require('./routes/inventoryroutes');
app.use('/api', inventoryRoutes);
