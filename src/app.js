require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const connectDB = require('./Config/db');
const gigRoutes = require('./routes/gigRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

connectDB();

app.use(express.json());  
app.use(morgan('dev'));
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Gig Tracker API is running' });
});

// gigs routes
app.use('/api/gigs', gigRoutes);


app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


