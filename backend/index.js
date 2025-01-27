import express from 'express';
import cookieParser from 'cookie-parser';
import DBConnection from './database/db_connection.js';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import recipeRoutes from './routes/recipe.js';
import likeRoutes from './routes/like.js';
import contactRoutes from './routes/comment.js';
import commentRoutes from './routes/comment.js';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 8000;

// Database connection
DBConnection();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'https://rasoi-diaries.onrender.com',
    credentials: true,
}));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/recipe', recipeRoutes);
app.use('/api/recipeLike', likeRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/rating', commentRoutes);

// Serve React static files in production
if (process.env.NODE_ENV === 'production') {
    // Serve static files from React's build folder
    app.use(express.static(path.join(__dirname, 'client', 'build')));

    // Send the React app's index.html for any unknown routes
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
