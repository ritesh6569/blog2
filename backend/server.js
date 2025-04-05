import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'https://blog2-green-nine.vercel.app',
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT"], // or your frontend domain
  credentials: true
}));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the MERN Blog API');
});

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
