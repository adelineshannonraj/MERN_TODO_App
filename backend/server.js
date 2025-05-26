const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/tasks'); 

dotenv.config();

const app = express();

// ✅ MIDDLEWARE
app.use(cors());
app.use(express.json()); // THIS IS REQUIRED FOR JSON BODIES

// ✅ ROUTES
app.use('/api/tasks', taskRoutes);

// ✅ DB + Server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  app.listen(process.env.PORT || 5000, () =>
    console.log(`Server running on port ${process.env.PORT || 5000}`)
  );
}).catch(err => console.error('MongoDB connection error:', err));
