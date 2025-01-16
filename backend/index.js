import express from 'express'
import cookieParser from 'cookie-parser';
import DBConnection from "./database/db_connection.js";
import cors from 'cors'
import authRoutes from './routes/auth.js'


const app = express();
const PORT = process.env.PORT || 8000;


//Database connection
DBConnection();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));


app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
